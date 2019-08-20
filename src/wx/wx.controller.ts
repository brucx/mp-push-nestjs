import { Controller, Post, Body, Get, Query, Logger } from '@nestjs/common';

@Controller('wx')
export class WxController {
  
  /**
   * 回显
   * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1472017492_58YV5
   * @param query 
   */
  @Get()
  echo(@Query() query) {
    Logger.verbose(query)
    // 懒得验签了
    return query.echostr
  }

  /**
   * 接收普通消息
   * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140453
   * @param body 
   */
  @Post()
  message(@Body() body) {
    Logger.verbose(body)
  }  
}
