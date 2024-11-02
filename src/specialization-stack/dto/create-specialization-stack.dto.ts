import { Specialization } from 'src/specialization/entities/specialization.entity';
import { Stack } from 'src/stack/entities/stack.entity';

export class CreateSpecializationStackDto {
  stack_id: Stack;

  specialization_id: Specialization;
}
