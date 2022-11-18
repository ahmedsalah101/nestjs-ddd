
import { UseCase } from 'src/common/core/UseCase';
import { AuthCookie } from '../../domain';
import { BasicCreditRepo } from '../../repos/baiscCreditRepo';
import { JwtAuthService } from '../../services/authorization/jwt/jwtAuth.service';
import { CryptoServices } from '../../services/crypto/crypto.service';
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
