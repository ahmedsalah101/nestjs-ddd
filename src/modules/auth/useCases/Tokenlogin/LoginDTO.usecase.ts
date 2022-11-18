
import { UseCase } from 'src/common/core/UseCase';
import { BasicCreditRepo } from '../../repos/baiscCreditRepo';
import { JwtAuthService } from '../../services/authorization/jwt/jwtAuth.service';
import { CryptoServices } from '../../services/crypto/crypto.service';
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
