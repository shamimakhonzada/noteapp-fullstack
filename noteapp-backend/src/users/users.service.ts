import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { HashService } from 'src/utils/hash.service';
import { LogInUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private hashService: HashService,
  ) {}

  async login(loginUserDto: LogInUserDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: loginUserDto.email,
      },
    });

    if (!user) {
      return {
        message: 'User not found',
      };
    }
    const valideUser = await this.hashService.comparePassword(
      loginUserDto.password,
      user.password,
    );

    if(valideUser){
      
    }
    return {
      status: true,
      message: 'Login Successfull',
    };
  }
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await this.hashService.hashPassword(
      createUserDto.password,
    );
    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
    return user;
  }

  async findAll() {
    return await this.prisma.user.findMany({});
  }

  async findOne(id: number) {
    return await this.prisma.user.findFirst({ where: { id: id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const data: any = { ...updateUserDto };

    if (updateUserDto.password) {
      data.password = await this.hashService.hashPassword(
        updateUserDto.password,
      );
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data,
    });

    return updatedUser;
  }

  async remove(id: number) {
    return await this.prisma.user.delete({ where: { id: id } });
  }
  async removeAll() {
    return await this.prisma.user.deleteMany({});
  }
}
