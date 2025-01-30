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
import { NamesService } from './names.service';
import { ApiBody, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';

// @ApiTags('names')
@Controller('api/v1/names')
export class NamesController {
  constructor(private namesService: NamesService) {}

  @Post()
  @ApiBody({
    description: 'Agregando un nombre',
    examples: {
      example1: {
        value: {
          name: 'Juan',
        },
      },
      example2: {
        value: {
          name: 'Fernando',
        },
      },
    },
  })
  @ApiOperation({
    description:
      'Crear un nuevo nombre. Retorna True si se inserta correctamente.',
  })
  createName(@Body() data: { name: string }) {
    return this.namesService.createName(data.name);
  }

  @Get()
  @ApiQuery({
    name: 'start',
    type: 'string',
    required: false,
    description: 'Nombre por el que empieza el query',
  })
  @ApiOperation({
    description: 'Devuelve todos los nombres.',
  })
  getNames(@Query('start') start: string) {
    console.log(start);
    return this.namesService.getNames(start);
  }

  @Put('/:name/:newName')
  @ApiParam({
    name: 'name',
    type: 'string',
    description: 'Nombre original',
  })
  @ApiParam({
    name: 'newName',
    type: 'string',
    description: 'Nombre nuevo',
  })
  @ApiOperation({
    description:
      'Actualiza el nombre del primer parametro por el nombre del segundo parametro. Retorna True si se actualiza correctamente.',
  })
  updateName(@Param('name') name: string, @Param('newName') newName: string) {
    return this.namesService.updateName(name, newName);
  }

  @Delete('clear')
  @ApiOperation({
    description: 'Elimina todos los nombres.',
  })
  clearNames() {
    return this.namesService.clearNames();
  }

  @Delete('/:name')
  @ApiParam({
    name: 'name',
    type: 'string',
    description: 'Nombre a eliminar',
  })
  @ApiOperation({
    description: 'Elimina el nombre del parametro. Retorna True si lo elimina.',
  })
  deleteName(@Param('name') name: string) {
    return this.namesService.deleteName(name);
  }
}
