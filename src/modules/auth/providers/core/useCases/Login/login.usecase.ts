import { CryptoServices } from '@auth/crypto';
import { CoreCredentialsRepo } from '@auth/repo';
import { UseCase } from '@common/core';
import { LoginDTO } from './login.dto';

import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginUseCase implements UseCase<LoginDTO, void> {
  constructor(
    private readonly cryptoServices: CryptoServices,
    private readonly coreCredentialsRepo: CoreCredentialsRepo,
  ) {}
  async execute(reqDTO: LoginDTO): Promise<void> {
    const s = await this.cryptoServices.hash('sss');
    console.log(s);
    const credentials = await this.coreCredentialsRepo.getCreditByEmail(
      reqDTO.email,
    );
    if (!credentials) throw Error('test');
    const isMatching = await this.cryptoServices.verify(
      credentials.hashedPassword,
      reqDTO.password,
    );
    if (!isMatching) throw Error('test');
  }
}
