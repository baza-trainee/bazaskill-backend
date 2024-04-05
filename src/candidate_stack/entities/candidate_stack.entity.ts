import { Candidate } from 'src/candidates/entities/candidate.entity';
import { Stack } from 'src/stack/entities/stack.entity';
import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('candidate_stack')
export class CandidateStack {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Candidate, (candidate)=>candidate.stack, {onDelete: "CASCADE"})
    @JoinColumn({name: 'candidate_id'})
    candidate_id: Candidate

    @ManyToOne(()=> Stack) 
    @JoinColumn()
    stack: Stack 
}
