import { Module } from '@nestjs/common';
import { Core } from './providers';
import { AuthRepoModule } from './providers/core/repos/DI.authRepo.module';
import { CryptoModule } from './services/crypto/DI.crypto.module';
@Module({
  imports: [CryptoModule, AuthRepoModule],
  controllers: [Core.RegisterController],
  providers: [Core.RegisterUseCase],
})
export class AuthModule {}
