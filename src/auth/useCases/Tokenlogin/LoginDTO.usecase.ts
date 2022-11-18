import { BasicCreditRepo } from 'src/auth/repos/baiscCreditRepo';
import { JwtAuthService } from 'src/auth/services/auth/jwt/jwtAuth.service';
import { CryptoServices } from 'src/auth/services/crypto/crypto.service';
import { UseCase } from 'src/common/core/UseCase';
import { LoginReqDTO, LoginResDTO } from './Login.dto';
import { TokenLoginUseCase } from './Login.usecase';

export class TokenLoginDTOUseCase
  extends TokenLoginUseCase
  implements UseCase<LoginReqDTO, LoginResDTO>
{
  constructor(
    basicCreditRepo: BasicCreditRepo,
    cryptoServices: CryptoServices,
    private readonly jwtAuthService: JwtAuthService,
  ) {
    super(basicCreditRepo, cryptoServices);
  }
  async execute(reqDTO: LoginReqDTO): Promise<LoginResDTO> {
    const credentials = await this.getCredit(reqDTO);
    if (!credentials) return;
    return this.jwtAuthService.genTokens({
      userId: credentials.userId,
    });
  }
}
