import { HttpException } from '@nestjs/common'
import { WsException } from '@nestjs/websockets'

import type { ErrorEnum } from '../../constants/error-code.constant'

export class SocketException extends WsException {
  private errorCode: number

  constructor(message: string)
  constructor(error: ErrorEnum)
  constructor(...args: any) {
    const error = args[0]
    if (typeof error === 'string') {
      super(
        HttpException.createBody({
          code: 0,
          message: error,
        }),
      )
      this.errorCode = 0
      return
    }

    const [code, message] = error.split(':')
    super(
      HttpException.createBody({
        code,
        message,
      }),
    )

    this.errorCode = Number(code)
  }

  getErrorCode(): number {
    return this.errorCode
  }
}
