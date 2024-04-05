import { Candidate } from 'src/candidates/entities/candidate.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('candidate_graduate')
export class CandidateGraduate {
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

    @ManyToOne(()=> Candidate, (candidate)=> candidate.gradaute, {onDelete: "CASCADE"})
    @JoinColumn({name: 'candidate_id'})
    candidate_id: Candidate
}
