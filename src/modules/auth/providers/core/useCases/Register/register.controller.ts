import { Exception, HttpCode } from '@common/core';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterDTO } from './register.dto';
import { RegisterUseCase } from './register.usecase';

@Controller('/reg')
export class RegisterController {
  constructor(private readonly registerUseCase: RegisterUseCase) {}
  @Post()
  async executeImpl(@Body() registerDTO: RegisterDTO) {
    const registerResult = await this.registerUseCase.execute(registerDTO);
    if (registerResult.isFail()) {
      throw new Exception({
        error: registerResult.value,
        code: HttpCode.BAD_REQUEST,
      });
    } else return 'User Created Successfully';
  }
}
