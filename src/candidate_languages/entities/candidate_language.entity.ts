import { Candidate } from "src/candidates/entities/candidate.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('candidate_languages')
export class CandidateLanguage {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    language: string

    @Column()
    level: string

    @ManyToOne(()=> Candidate, (candidate)=> candidate.candidate_language)
    @JoinColumn({name: 'candidate_id'})
    candidate_id: number
}
