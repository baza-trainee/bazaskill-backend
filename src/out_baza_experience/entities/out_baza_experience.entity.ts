import { Candidate } from 'src/candidates/entities/candidate.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("out_baza_experience")
export class OutBazaExperience {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    company_name: string

    @Column()
    company_specialization: string

    @Column()
    work_start: string

    @Column()
    work_end: string

    @ManyToOne(()=> Candidate, (candidate)=>candidate.out_baza_experience, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'candidate_id'})
    candidate_id: Candidate
}
