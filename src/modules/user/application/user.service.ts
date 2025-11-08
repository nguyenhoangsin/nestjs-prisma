import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaSelectObject } from '@common/types/common.type';
import { UserRepository } from '@modules/user/infrastructure/user.repository';
import { CreateUserInput, UpdateUserInput, User } from '@modules/user/presentation/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOne(id: string, select: PrismaSelectObject): Promise<User> {
    const user = await this.userRepository.findOne(id, select);

    // if (!user) {
    //   throw new NotFoundException({
    //     statusCode: 404,
    //     code: 'NOT_FOUND',
    //     message: `User with ID ${id} not found`,
    //   });
    // }

    return user as unknown as User;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async create(input: CreateUserInput): Promise<User> {
    return this.userRepository.create(input);
  }

  async update(id: string, input: UpdateUserInput): Promise<User> {
    // const existingUser = await this.userRepository.findOne(id);

    // if (!existingUser) {
    //   throw new NotFoundException(`User with ID ${id} not found`);
    // }

    return this.userRepository.update(id, input);
  }

  async remove(id: string): Promise<User> {
    // const existingUser = await this.userRepository.findOne(id);

    // if (!existingUser) {
    //   throw new NotFoundException(`User with ID ${id} not found`);
    // }

    return this.userRepository.softDelete(id);
  }
}
