import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LogInUserDto } from './dto/login-user.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async login(@Body() loginUserDto: LogInUserDto) {
    try {
      const user = await this.usersService.login(loginUserDto);
    } catch (error) {
      return {
        success: false,
        message: 'Login Failed',
        error: error.message,
      };
    }
  }
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);
      return { success: true, data: user };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create user',
        error: error.message,
      };
    }
  }

  @Get()
  async findAll() {
    try {
      const findAllUser = await this.usersService.findAll();
      return { success: true, data: findAllUser };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to find All user',
        error: error.message,
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.usersService.findOne(+id);
      if (!user) {
        return { success: false, message: 'User not found' };
      }
      return { success: true, data: user };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch user',
        error: error.message,
      };
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user = await this.usersService.update(+id, updateUserDto);
      if (!user) {
        return { success: false, message: 'User not found' };
      }
      return { success: true, data: user };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update user',
        error: error.message,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const user = await this.usersService.remove(+id);
      return { success: true, data: user };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete user',
        error: error.message,
      };
    }
  }
  @Delete()
  async removeAll() {
    try {
      const removeAll = await this.usersService.removeAll();
      return { success: true, data: removeAll };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create user',
        error: error.message,
      };
    }
  }
}
