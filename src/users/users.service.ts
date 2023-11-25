import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user-dto';
import { CreateUserDto } from './dto/create-user-dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'SATTAR',
      email: 'sasorganicagro@gmail.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'ABDUS SATTAR',
      email: 'asorganicagro@gmail.com',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'KARIM',
      email: 'organicagro@gmail.com',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'RAKHY',
      email: 'anicagro@gmail.com',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'SARA',
      email: 'sara@gmail.com',
      role: 'INTERN',
    },
    {
      id: 6,
      name: 'RIMI SEN',
      email: 'rimisen@gmail.com',
      role: 'ENGINEER',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const usersRoleArr = this.users.filter((user) => user.role === role);
      if (usersRoleArr.length === 0) {
        throw new NotFoundException('role not found');
      }

      return usersRoleArr;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updatedUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user) {
        return { ...user, ...updatedUserDto };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
