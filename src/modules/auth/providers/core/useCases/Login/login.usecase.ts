import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/common/core/UseCase';
import { CoreCredentialsRepo } from 'src/modules/auth/repos/core-credentials.repo';
import { CryptoServices } from 'src/modules/auth/services/crypto/crypto.service';
import { LoginDTO } from './login.dto';

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
