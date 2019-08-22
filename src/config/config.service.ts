import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import { Logger } from '@nestjs/common';

export interface EnvConfig {
  [key: string]: string;
}
@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor() {
    dotenv.config();
    this.envConfig = this.validateInput(process.env);
    if (this.NODE_ENV === 'development') {
      Logger.debug(this.envConfig);
    }
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test', 'provision'])
        .default('development'),
        WX_APP_ID: Joi.string().required(),
        WX_APP_SC: Joi.string().required(),
        WX_TEMPLATE_ID: Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
      {
        allowUnknown: true,
        stripUnknown: true,
      },
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get NODE_ENV(): string {
    return this.envConfig.NODE_ENV;
  }

  get DEBUG(): boolean {
    return this.envConfig.NODE_ENV !== 'production';
  }

  get WX_APP_ID(): string {
    return this.envConfig.WX_APP_ID;
  }

  get WX_APP_SC(): string {
    return this.envConfig.WX_APP_SC;
  }

  get WX_TEMPLATE_ID(): string {
    return this.envConfig.WX_TEMPLATE_ID;
  }
}
