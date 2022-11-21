import { Controller, Get } from '@nestjs/common';
import { LoginUseCase } from '../useCases/Login/login.usecase';

@Controller('/auth')
export class AuthCoreController {
  constructor(private readonly loginUseCase: LoginUseCase) {}
  @Get()
  async runtest() {
    await this.loginUseCase.execute({
      email: 'test@test.com',
      password: 'newpass',
    });
  }
}
