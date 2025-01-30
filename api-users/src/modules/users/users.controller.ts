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
import { ApiBody, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('api/v1/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  @ApiOperation({ description: 'Crear un usuario' })
  @ApiBody({
    description:
      'Crear un usuario, mediante un UserDto. Devuelve true si se realiza con exito.',
    type: UserDto,
    examples: {
      example1: {
        value: {
          id: 1,
          name: 'Juan',
          email: 'pruebas@correo.com',
          birthDate: '2026-05-01',
        },
      },
    },
  })
  createUser(@Body() user: UserDto) {
    return this.userService.createUser(user);
  }

  @Put()
  @ApiOperation({
    description:
      'Actualiza un usuario en el caso de que ya exista, en caso contrario, se creara un nuevo usuario. Devuelve true si se realiza con exito.',
  })
  @ApiBody({
    description: 'Edita un usuario usando un UserDto.',
    type: UserDto,
    examples: {
      example1: {
        value: {
          id: 2,
          name: 'Miguel',
          email: 'pruebas@correo.com',
          birthDate: '2026-05-01',
        },
      },
    },
  })
  updateUser(@Body() user: UserDto) {
    return this.userService.updateUser(user);
  }

  @Get()
  @ApiQuery({
    name: 'start',
    required: false,
    type: Date,
    description:
      'Si se proporciona, devolvera todos los usuarios con la fecha de nacimiento mayor o igual a esta fecha.',
  })
  @ApiQuery({
    name: 'end',
    required: false,
    type: Date,
    description:
      'Si se proporciona, devolvera todos los usuarios con la fecha de nacimiento menor o igual a esta fecha.',
  })
  @ApiOperation({
    description:
      'Devuelve los usuarios donde su fecha de nacimiento esten entre start y end. Si no se proporcionan, se devolveran todos los usuarios.',
  })
  getUsers(
    @Query('start', ParseDatePipe) start: Date,
    @Query('end', ParseDatePipe) end: Date,
  ) {
    return this.userService.getUsers(start, end);
  }

  @Delete('/:idUser')
  @ApiParam({
    name: 'idUser',
    type: Number,
    description: 'Id del usuario a eliminar.',
  })
  @ApiOperation({
    description:
      'Elimina un usuario en el caso de que exista el id. Devuelve true si se realiza con exito.',
  })
  deleteUser(@Param('idUser') idUser: number) {
    return this.userService.deleteUser(idUser);
  }
}
