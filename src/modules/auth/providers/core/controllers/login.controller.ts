import { Exception, HttpCode } from '@common/core';
import { Controller, Get } from '@nestjs/common';
import { LoginUseCase } from '../useCases/Login/login.usecase';

@Controller('/auth')
export class AuthCoreController {
  constructor(private readonly loginUseCase: LoginUseCase) {}
  @Get()
  async executeImpl() {
    const result = await this.loginUseCase.execute({
      email: 'test@test.com',
      password: 'newpass',
    });

    if (result.isFail()) {
      const error = result.value;
      throw new Exception({
        code: HttpCode.BAD_REQUEST,
        error,
      });
    }
  }
}
