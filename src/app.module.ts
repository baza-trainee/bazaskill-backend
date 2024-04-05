import { Module } from '@nestjs/common';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GalleryModule } from './gallery/gallery.module';
import { PasswordModule } from './password/password.module';
import { MailingModule } from './mailing/mailing.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
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
// import { CandidateCourcesModule } from './candidate_cources/candidate_cources.module';
// import { BazaExperienceModule } from './baza_experience/baza_experience.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        logging: true,
        entities: [__dirname + '/**/*.entity{.js,.ts}'],
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'swagger-static'),
      serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/swagger',
    }),
    MailerModule.forRoot({
      transport: 'smtps://user@domain.com:pass@smtp.domain.com',
      template: {
        dir: process.cwd() + '/templates/',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    UserModule,
    AuthModule,
    GalleryModule,
    PasswordModule,
    MailingModule,
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
    // CandidateCourcesModule,
    // BazaExperienceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
