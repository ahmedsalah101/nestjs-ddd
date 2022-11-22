import { CryptoServices } from '@auth/crypto';
import { CoreCredentialsRepo } from '@auth/repo';
import { LoginDTO } from './login.dto';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { EitherFailOrVal, Result, resValue, UseCase } from '@common/core';
import { LoginError } from './login.error';

type Response = EitherFailOrVal<LoginError.CredentialsTakenError, Result<void>>;

@Injectable()
export class LoginUseCase implements UseCase<LoginDTO, Promise<Response>> {
  constructor(
    private readonly cryptoServices: CryptoServices,
    private readonly coreCredentialsRepo: CoreCredentialsRepo,
    private publisher: EventPublisher,
  ) {}
  async execute(reqDTO: LoginDTO): Promise<Response> {
    // const s = await this.cryptoServices.hash('sss');
    // console.log(s);
    // const credentials = await this.coreCredentialsRepo.getCreditByEmail(
    //   reqDTO.email,
    // );
    // if (!credentials) throw Error('test');
    // const isMatching = await this.cryptoServices.verify(
    //   credentials.hashedPassword,
    //   reqDTO.password,
    // );
    // if (!isMatching) throw Error('test');
    // const cred = this.publisher.mergeObjectContext(new CoreCredentials());
    //cred.dispatch()
    //cred.commit()
    const val = await this.coreCredentialsRepo.save({
      userId: 's',
      email: 'q',
      hashedPassword: 'qqd',
    });
    // if (true) {
    //   return resFailure(LoginError.CredentialsTakenError.create('credId'));
    // }

    return resValue(Result.ok());
    //this.eventBus.publish(new TestEvent('wq'));
    //const cred = this.publisher.mergeObjectContext(new CoreCredentials());
    //cred.print();
    //cred.commit();
  }
}
