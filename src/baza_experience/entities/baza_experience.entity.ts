import { Candidate } from 'src/candidates/entities/candidate.entity';
import { Specialization } from "src/specialization/entities/specialization.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('baza_experience')
export class BazaExperience {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Specialization)
    @JoinColumn()
    specialization_id: Specialization

    @Column()
    project_name: string

    @Column()
    project_duration: number

    @ManyToOne(()=> Candidate, (candidate)=>candidate.baza_experience)
    @JoinColumn({name: 'candidate_id'})
    candidate_id: Candidate
}
