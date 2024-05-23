import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GalleryModule } from './gallery/gallery.module';
import { PasswordModule } from './password/password.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { PartnersModule } from './partners/partners.module';
import { CountersModule } from './counters/counters.module';
import { PostsModule } from './posts/posts.module';
import { StackModule } from './stack/stack.module';
import { SpecializationModule } from './specialization/specialization.module';
import { SpecializationStackModule } from './specialization-stack/specialization-stack.module';
import { DocumentsModule } from './documents/documents.module';
import { ContactsModule } from './contacts/contacts.module';
import { HrApplicationModule } from './hr_application/hr_application.module';
import { PartnerApplicationModule } from './partner_application/partner_application.module';
import { CandidatesModule } from './candidates/candidates.module';
import { CandidateLanguagesModule } from './candidate_languages/candidate_languages.module';
import { CandidateStackModule } from './candidate_stack/candidate_stack.module';
import { CandidateGraduateModule } from './candidate_graduate/candidate_graduate.module';
import { CandidateCourcesModule } from './candidate_cources/candidate_cources.module';
import { BazaExperienceModule } from './baza_experience/baza_experience.module';
import { CardsModule } from './cards/cards.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        // host: configService.get('DB_HOST'),
        // port: configService.get('DB_PORT'),
        // username: configService.get('DB_USER'),
        // password: configService.get('DB_PASSWORD'),
        // database: configService.get('DB_NAME'),
        synchronize: false,
        logging: false,
        url: configService.get('DATABASE_URL'),
        entities: [__dirname + '/**/*.entity{.js,.ts}'],
      }),
    }),
    UserModule,
    AuthModule,
    GalleryModule,
    PasswordModule,
    CloudinaryModule,
    TestimonialsModule,
    PartnersModule,
    CountersModule,
    PostsModule,
    StackModule,
    SpecializationModule,
    SpecializationStackModule,
    DocumentsModule,
    ContactsModule,
    HrApplicationModule,
    PartnerApplicationModule,
    CandidatesModule,
    CandidateLanguagesModule,
    CandidateStackModule,
    CandidateGraduateModule,
    CandidateCourcesModule,
    BazaExperienceModule,
    CardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
