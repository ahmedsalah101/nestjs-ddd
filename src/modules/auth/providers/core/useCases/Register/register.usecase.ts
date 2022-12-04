import { CryptoServices } from '@auth/crypto';
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
import { Password } from '../../domain/password';
import { HashedPassword } from '../../domain/hashedPassword';
import { InvalidCredError } from '../../domain/core.cred.error';
import { CoreCredentialsRepo } from '../../repos';

@Injectable()
export class RegisterUseCase
  implements UseCase<RegisterDTO, Promise<Response>>
{
  constructor(private readonly coreCredentialsRepo: CoreCredentialsRepo) {}

  private parseDTO(registerDTO: RegisterDTO): DTOParseResult {
    const { email, password, firstName } = registerDTO;
    const emailParseResult = Email.parse(email);
    if (emailParseResult.isFail()) return resFail(emailParseResult.value);

    const passwordResult = Password.parse(password);
    if (passwordResult.isFail()) return resFail(passwordResult.value);

    const userProfileResult = UserProfile.create({ firstName });
    if (userProfileResult.isFail()) return resFail(userProfileResult.value);

    return resValue({
      email: emailParseResult.value,
      password: passwordResult.value,
      profile: userProfileResult.value,
    });
  }

  private async credExist(email: Email): Promise<CredExistResult> {
    const cred: CoreCredentials =
      await this.coreCredentialsRepo.getCreditByEmail(email);
    const credTaken = !!cred;
    if (credTaken)
      return resFail(
        new RegisterError.CredentialsTakenError({
          errMessage: `Invalid Email ${cred.email.toString()}`,
        }),
      );
    return resValue(true);
  }

  private async crearteCredentials(
    validatedDTO: ValidatedDTO,
  ): Promise<CreateCredResult> {
    const { email, password, profile } = validatedDTO;
    const hashedPassword = await HashedPassword.genFrom(password);
    const newCredResult = CoreCredentials.create({
      email,
      hashedPassword,
      profile,
    });
    if (newCredResult.isVal()) return resValue(newCredResult.value);
  }
  //using void means u don't need to return value (resValue)
  async execute(reqDTO: RegisterDTO): Promise<Response> {
    const parseResult = this.parseDTO(reqDTO);
    if (parseResult.isFail()) return resFail(parseResult.value);

    try {
      const credExistResult = await this.credExist(parseResult.value.email);
      if (credExistResult.isFail()) return resFail(credExistResult.value);

      const createCredResult = await this.crearteCredentials(parseResult.value);
      if (createCredResult.isFail()) return resFail(createCredResult.value);

      console.log('PASSED !');

      /*guranteed to be CoreCredentials since the above-mentioned if
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
  ValidatedDTOError | RegisterError.CredentialsTakenError,
  CoreCredentials
>;

type CreateCredResult = EitherFailOrVal<InvalidCredError, CoreCredentials>;
type DTOParseResult = EitherFailOrVal<ValidatedDTOError, ValidatedDTO>;
type CredExistResult = EitherFailOrVal<
  RegisterError.CredentialsTakenError,
  boolean
>;

type ValidatedDTOError =
  | RegisterError.InvalidEmailError
  | RegisterError.InvalidPasswordError;

interface ValidatedDTO {
  email: Email;
  password: Password;
  profile: UserProfile;
}
