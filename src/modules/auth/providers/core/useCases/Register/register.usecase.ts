import { Injectable } from '@nestjs/common';
import {
  AppError,
  EitherFailOrVal,
  resFail,
  resValue,
  UseCase,
} from '@common/core';
import { RegisterError } from './register.error';
import { RegisterDTO } from './register.dto';
import { CoreCredentials } from '../../domain/core.credentials';
import { Email } from '../../domain/Email';
import { UserProfile } from 'src/modules/auth/domain/profile';
import {
  InvalidCredError,
  InvalidHashedPasswordError,
} from '../../domain/core.cred.error';
import { CoreCredentialsRepo } from '../../repos';
import { InvalidUserProfileError } from 'src/modules/auth/domain/profile.error';

@Injectable()
export class RegisterUseCase
  implements UseCase<RegisterDTO, Promise<Response>>
{
  constructor(private readonly coreCredentialsRepo: CoreCredentialsRepo) {}

  private async credExist(email: string): Promise<CredExistResult> {
    const emailResult = Email.parse(email);
    if (emailResult.isFail()) return resFail(emailResult.value);
    const cred = await this.coreCredentialsRepo.getCreditByEmail(
      emailResult.value,
    );
    const credTaken = !!cred;
    /*check for null is forced before using cred object*/
    if (credTaken)
      return resFail(
        new RegisterError.CredentialsTakenError({
          errMessage: `Invalid Email ${cred.email.toString()}`,
        }),
      );
    return resValue(true);
  }

  private async crearteCredentials(
    registerDTO: RegisterDTO,
  ): Promise<CreateCredResult> {
    const { email, password, firstName } = registerDTO;
    const userProfileResult = UserProfile.create({ firstName });
    if (userProfileResult.isFail()) return resFail(userProfileResult.value);
    const newCredResult = await CoreCredentials.create({
      email,
      password,
      profile: userProfileResult.value,
    });
    if (newCredResult.isVal()) return resValue(newCredResult.value);
    return resFail(newCredResult.value);
  }
  //using void means u don't need to return value (resValue)
  async execute(reqDTO: RegisterDTO): Promise<Response> {
    try {
      const credExistResult = await this.credExist(reqDTO.email);
      if (credExistResult.isFail()) return resFail(credExistResult.value);

      const createCredResult = await this.crearteCredentials(reqDTO);
      if (createCredResult.isFail()) return resFail(createCredResult.value);

      console.log('PASSED !');

      /*guranteed to be CoreCredentials since the above-mentioned 'if'
          checks of createCredResult is an instance of Fail<InvalidCredError,CoreCredentials>
          if if true (isFail()===true) then return resFail()
          now any usage of createCredResult.value will not be instance of Fail
          and since the allowed values are Fail<InvalidCredError,CoreCredentials>
          and Val<InvalidCredError,CoreCredentials>
          then the createCredResult is guaranteed to be 
          an instance of Val<InvalidCredError,CoreCredentials>
          which its value is CoreCredentials
      */
      await this.coreCredentialsRepo.save(createCredResult.value);
      return resValue(createCredResult.value);
    } catch (e) {
      console.log(e);
      resFail(new AppError.InteralError({ err: e }));
    }
  }
}

type Response = EitherFailOrVal<
  | RegisterError.InvalidEmailError
  | RegisterError.InvalidPasswordError
  | InvalidCredError
  | InvalidUserProfileError
  | InvalidHashedPasswordError
  | RegisterError.CredentialsTakenError,
  CoreCredentials
>;

type CreateCredResult = EitherFailOrVal<
  | InvalidCredError
  | InvalidUserProfileError
  | InvalidHashedPasswordError
  | RegisterError.InvalidEmailError
  | RegisterError.InvalidPasswordError,
  CoreCredentials
>;
type CredExistResult = EitherFailOrVal<
  RegisterError.InvalidEmailError | RegisterError.CredentialsTakenError,
  boolean
>;
