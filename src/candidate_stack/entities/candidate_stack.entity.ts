import { Candidate } from 'src/candidates/entities/candidate.entity';
import { Stack } from 'src/stack/entities/stack.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('candidate_stack')
export class CandidateStack {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Candidate, (candidate)=>candidate.stack)
    @JoinColumn({name: 'candidate_id'})
    candidate_id: Candidate

    @ManyToOne(()=> Stack, (stack)=>stack.stack_candidate_id)
    @JoinColumn({name: 'stack_id'})
    stack_id: Stack

}
