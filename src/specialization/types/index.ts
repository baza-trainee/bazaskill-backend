export class ISpecializationStack {
  id: number;
  specialization_stack_id: number;
  title: string;
}

export class ISpecializationWithStack {
  id: number;
  title: number;
  stack: [ISpecializationStack];
}
