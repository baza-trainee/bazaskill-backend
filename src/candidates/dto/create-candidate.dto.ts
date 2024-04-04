import { Stack } from 'src/stack/entities/stack.entity';
import { IsArray, IsNumber, IsString } from "class-validator";

export class CreateCandidateDto {
    @IsString()
    name_ua: string

    @IsString()
    surname_ua: string

    @IsString()
    name: string

    @IsString()
    surname: string

    @IsString()
    country: string

    @IsString()
    city: string

    @IsString()
    phone: string

    @IsString()
    email: string

    @IsString()
    linkedin: string

    @IsString()
    discord: string

    @IsString()
    telegram: string

    @IsArray()
    candidate_language: Array<{ language: string, level: string }>

    @IsString()
    work_format: string

    @IsString()
    sallary_form: string

    @IsString()
    sallary_to: string

    @IsString()
    specialization: string

    @IsString()
    cv: string

    @IsArray()
    stack: Array<string>

    @IsArray()
    graduate: Array<{
        unversity: string,
        graduate_sertificate: string,
        graduate_start: string,
        graduate_end: string,
        unversity_grade: string,
        unversity_specialization: string
    }>

    @IsArray()
    cources: Array<{
        cources_name: string,
        cources_sertificate: string,
        cources_specializaton: string
        cources_start: string,
        cources_end: string
    }>

    @IsArray()
    baza_experience: Array<{
        role: string,
        project_name: string,
        project_duration: string
    }>

}
