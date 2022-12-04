import { CryptoServices } from '@auth/crypto';
import { CoreCredentialsRepo } from '@auth/repo';
import { LoginDTO } from './login.dto';
import { Injectable } from '@nestjs/common';
import { EitherFailOrVal, Result, resValue, UseCase } from '@common/core';
import { LoginError } from './login.error';
import { CoreCredentials } from '../../domain/core.credentials';

type Response = EitherFailOrVal<LoginError.InvalidCredentialsError, void>;

@Injectable()
export class LoginUseCase implements UseCase<LoginDTO, Promise<Response>> {
  constructor(
    private readonly cryptoServices: CryptoServices,
    private readonly coreCredentialsRepo: CoreCredentialsRepo,
  ) {}

  async execute(reqDTO: LoginDTO): Promise<Response> {
    try {
      const cred = await this.coreCredentialsRepo.getCreditByEmail(
        reqDTO.email,
      );
    } catch (e) {}
    return;
  }
}
