import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user-dto';
import { ParseDatePipe } from 'src/pipes/parse-date/parse-date.pipe';

@Controller('api/v1/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  createUser(@Body() user: UserDto) {
    return this.userService.createUser(user);
  }

  @Put()
  updateUser(@Body() user: UserDto) {
    return this.userService.updateUser(user);
  }

  @Get()
  getUsers(
    @Query('start', ParseDatePipe) start: Date,
    @Query('end', ParseDatePipe) end: Date,
  ) {
    return this.userService.getUsers(start, end);
  }

  @Delete('/:idUser')
  deleteUser(@Param('idUser') idUser: number) {
    return this.userService.deleteUser(idUser);
  }
}
