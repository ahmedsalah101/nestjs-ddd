import { Module } from '@nestjs/common';
import { Core } from './providers';
import { AuthRepoModule } from './repos/auth-repo.DI.module';
import { CryptoModule } from './services/crypto/crypto.DI.module';

@Module({
  imports: [AuthRepoModule, CryptoModule],
  controllers: [Core.AuthCoreController],
  providers: [Core.LoginUseCase],
})
export class AuthModule {}
