import { Module } from '@nestjs/common';
import { UserController } from '@modules/user/presentation/user.controller';
import { UserResolver } from '@modules/user/presentation/user.resolver';
import { UserService } from '@modules/user/application/user.service';
import { UserRepository } from '@modules/user/infrastructure/user.repository';

@Module({
  controllers: [UserController],
  providers: [UserResolver, UserService, UserRepository],
})
export class UserModule {}
