import { Module } from '@nestjs/common';
import { Core } from './providers';
import { AuthRepoModule } from './providers/core/repos/auth.repo.DI.module';
import { CryptoModule } from './services/crypto/crypto.DI.module';
@Module({
  imports: [CryptoModule, AuthRepoModule],
  controllers: [Core.RegisterController],
  providers: [Core.RegisterUseCase],
})
export class AuthModule {}
