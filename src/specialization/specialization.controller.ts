// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Specialization } from 'src/specialization/entities/specialization.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  // UseGuards,
} from '@nestjs/common';
import { SpecializationService } from './specialization.service';
import { CreateSpecializationDto } from './dto/create-specialization.dto';
import { UpdateSpecializationDto } from './dto/update-specialization.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ISpecializationWithStack } from './types';
import { NotFoundResponse } from '../types';

@ApiTags('Specializations')
@Controller('specialization')
export class SpecializationController {
  constructor(private readonly specializationService: SpecializationService) {}
  @ApiResponse({
    status: 201,
    description: 'Create specialization',
    type: Specialization,
  })
  @ApiBody({
    type: CreateSpecializationDto,
  })
  @Post()
  // @UseGuards(JwtAuthGuard)
  create(@Body() createSpecializationDto: CreateSpecializationDto) {
    return this.specializationService.create(createSpecializationDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Get specialization',
    type: [Specialization],
  })
  @Get()
  findAll() {
    return this.specializationService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Get specialization with stack',
    type: [ISpecializationWithStack],
  })
  @ApiResponse({
    status: 404,
    description: 'not found',
    type: NotFoundResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'internal server error',
  })
  @Get('stack')
  findAllWithStack() {
    return this.specializationService.findAllWithStack();
  }

  @ApiResponse({
    status: 200,
    description: 'Get specialization',
    type: Specialization,
  })
  @ApiResponse({
    status: 404,
    description: 'not found',
    type: NotFoundResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'internal server error',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specializationService.findOne(+id);
  }

  @ApiResponse({
    status: 201,
    description: 'Update specialization',
    type: Specialization,
  })
  @ApiResponse({
    status: 404,
    description: 'not found',
    type: NotFoundResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'internal server error',
  })
  @ApiBody({
    type: UpdateSpecializationDto,
  })
  @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateSpecializationDto: UpdateSpecializationDto,
  ) {
    return this.specializationService.update(+id, updateSpecializationDto);
  }

  @ApiResponse({ status: 200, description: 'delete specialization' })
  @ApiResponse({
    status: 404,
    description: 'not found',
    type: NotFoundResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'internal server error',
  })
  @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.specializationService.remove(+id);
  }
}
