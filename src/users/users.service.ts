import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { PaginationResult } from 'src/common/interfaces/pagination.interface';
import { paginate } from 'src/common/helpers/pagination.helper';

@Injectable()
export class UsersService {
  // userModel is a class name by which we create new user
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }
  async create(createUserDto: CreateUserDto) {
    const user = await this.userModel.findOne({ email: createUserDto.email }).exec();
    if (user) return new HttpException('User Already Exist', 400);
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }

  async findAll(paginationDto: PaginationDto): Promise<PaginationResult<User>> {
    const { page, limit } = paginationDto;
    const result = await paginate(this.userModel, { isDeleted: false }, page, limit);

    if (!result?.data?.length) throw new NotFoundException('No users found');

    return result;
  }

  async findOne(id: string) {
    const user = await this.userModel.findOne({ _id: id, isDeleted: false }).exec();
    if (!user) return new NotFoundException('No users found');
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findOne({ _id: id, isDeleted: false }).exec();
    if (!user) return new NotFoundException('No users found');
    return await this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
  }

  async remove(id: string) {
    const user = await this.userModel.findOne({ _id: id, isDeleted: false }).exec();
    if (!user) return new NotFoundException('No users found');
    return this.userModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true }).exec();
  }
}