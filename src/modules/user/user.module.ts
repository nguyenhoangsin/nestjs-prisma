import { Module } from '@nestjs/common';
import { UserController } from '@modules/user/presentation/user.controller';
import { UserResolver } from '@modules/user/presentation/user.resolver';
import { UserService } from '@modules/user/application/user.service';

@Module({
  controllers: [UserController],
  providers: [UserResolver, UserService],
})
export class UserModule {}
