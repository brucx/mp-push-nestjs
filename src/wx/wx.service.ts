import { Injectable, HttpService, Logger } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import * as querystring from 'querystring';
import { ConfigService } from '../config/config.service';

interface Token {
  access_token: string;
  expires_in?: number;
  expires_at?: Date;
}

interface SendTemplateOpts {
  touser: string;
  template_id: string;
  url?: string;
  miniprogram?: MiniProgramPage;
  data: TemplateData;
}

interface MiniProgramPage {
  appid: string;
  pagepath?: string;
}

interface TemplateData {
  first?: TemplateDataItem;
  keyword1?: TemplateDataItem;
  keyword2?: TemplateDataItem;
  keyword3?: TemplateDataItem;
  keyword4?: TemplateDataItem;
  keyword5?: TemplateDataItem;
  keyword6?: TemplateDataItem;
  remark?: TemplateDataItem;
}

interface TemplateDataItem {
  value: string;
  color?: string;
}

@Injectable()
export class WxService {
  private token: Token;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * 获取公众号的 Access Token，使用缓存
   */
  async getAccessToken(): Promise<string> {
    if (!this.token || this.token.expires_at < new Date()) {
      const {token, expires_in} = await this.getAccessTokenFromServer();
      this.token = {
        access_token: token,
        expires_at: new Date(+new Date() + expires_in * 1000),
      };
    }
    return this.token.access_token;
  }

  /**
   * 直接从微信服务器获取 Token
   * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140183
   */
  async getAccessTokenFromServer(): Promise<{ token: string; expires_in: number }> {
    type AccessTokenResponse = AxiosResponse<
      Token & {
        errcode: string;
        errmsg: string;
      }
    >;
    const getAccessTokenUrl = 'https://api.weixin.qq.com/cgi-bin/token';
    const queryString = querystring.stringify({
      appid: this.configService.WX_APP_ID,
      secret: this.configService.WX_APP_SC,
      grant_type: 'client_credential',
    });
    const resp: AccessTokenResponse = await this.httpService
      .get(`${getAccessTokenUrl}?${queryString}`)
      .toPromise();
    if (resp.data.errcode) {
      Logger.error(`获取AccessToken失败：${JSON.stringify(resp.data)}`);
      throw new Error(`获取公众号AccessToken失败`);
    }
    return { token: resp.data.access_token, expires_in: resp.data.expires_in };
  }

  /**
   * 发送模板消息
   */
  async send(opts: SendTemplateOpts): Promise<string> {
    const accessToken: string = await this.getAccessToken();
    const sendTemplateUrl = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${accessToken}`;
    const resp: AxiosResponse<{
      errcode: string;
      errmsg: string;
    }> = await this.httpService.post(sendTemplateUrl, opts).toPromise();
    if (resp.data.errcode) {
      Logger.error(`发送模板消息失败：${JSON.stringify(resp.data)}`);
      throw new Error(`发送模板消息失败`);
    }
    return resp.data.errmsg;
  }

}
