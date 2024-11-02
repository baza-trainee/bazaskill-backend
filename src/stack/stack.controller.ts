import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StackService } from './stack.service';
import { CreateStackDto } from './dto/create-stack.dto';
import { UpdateStackDto } from './dto/update-stack.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('stack')
export class StackController {
  constructor(private readonly stackService: StackService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createStackDto: CreateStackDto) {
    return this.stackService.create(createStackDto);
  }

  @Get()
  findAll() {
    return this.stackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stackService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateStackDto: UpdateStackDto) {
    return this.stackService.update(+id, updateStackDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.stackService.remove(+id);
  }
}
