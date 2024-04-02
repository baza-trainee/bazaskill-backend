import { Candidate } from "src/candidates/entities/candidate.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('candidate')
export class CandidateCource {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    university: string

    @Column()
    university_specialization: string;

    @Column()
    university_grade: string

    @Column()
    graduate_start: string

    @Column()
    graduate_end: string

    @Column()
    graduate_sertificate: string

    @ManyToOne(()=> Candidate, (candidate)=> candidate.cources)
    @JoinColumn({name: 'candidate_id'})
    candidate_id: Candidate
}
