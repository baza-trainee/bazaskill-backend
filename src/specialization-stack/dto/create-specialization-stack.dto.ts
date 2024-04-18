import { ApiProperty } from '@nestjs/swagger';
import { Specialization } from 'src/specialization/entities/specialization.entity';
import { Stack } from 'src/stack/entities/stack.entity';

export class CreateSpecializationStackDto {
  @ApiProperty()
  stack_id: Stack;

  @ApiProperty()
  specialization_id: Specialization;
}
