import { AuthCookie, Cookie } from 'src/auth/domain';
import { BasicCreditRepo } from 'src/auth/repos/baiscCreditRepo';
import { UserRepo } from 'src/auth/repos/userRepo';
import { JwtAuthService } from 'src/auth/services/auth/jwt/jwtAuth.service';
import { CryptoServices } from 'src/auth/services/crypto/crypto.service';
import { UseCase } from 'src/common/core/UseCase';
import { LoginReqDTO } from './Login.dto';
import { TokenLoginUseCase } from './Login.usecase';

export class TokenLoginCookieUseCase
  extends TokenLoginUseCase
  implements UseCase<LoginReqDTO, AuthCookie[]>
{
  constructor(
    basicCreditRepo: BasicCreditRepo,
    cryptoServices: CryptoServices,
    readonly jwtAuthService: JwtAuthService,
  ) {
    super(basicCreditRepo, cryptoServices);
  }
  async execute(reqDTO: LoginReqDTO): Promise<AuthCookie[]> {
    const credentials = await this.getCredit(reqDTO);
    if (!credentials) return;
    return this.jwtAuthService.genAuthCookies({
      userId: credentials.userId,
    });
  }
}
