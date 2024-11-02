import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Partners' })
export class Partner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image_url: string;

  @Column()
  partner_url: string;

  @Column()
  public_cloudinary_id: string;
}
