import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Counters' })
export class Counter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  liveProject: number;

  @Column()
  members: number;

  @Column()
  employed: number;

  @Column()
  technologies: number;

  @Column()
  libraries: number;
}
