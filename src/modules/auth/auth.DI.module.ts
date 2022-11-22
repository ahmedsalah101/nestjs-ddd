import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  Test2EventHandler,
  TestEventHandler,
} from './domain/handlers/testEventHandler';
import { Core } from './providers';
import { AuthRepoModule } from './repos/auth-repo.DI.module';
import { CryptoModule } from './services/crypto/crypto.DI.module';

@Module({
  imports: [AuthRepoModule, CryptoModule, CqrsModule],
  controllers: [Core.AuthCoreController],
  providers: [Core.LoginUseCase, TestEventHandler, Test2EventHandler],
})
export class AuthModule {}
