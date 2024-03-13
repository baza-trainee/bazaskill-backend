import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contacts } from './entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contacts)
    private readonly contactsRepository: Repository<Contacts>,
  ) {}

  async create(createContactDto: CreateContactDto) {
    const contacts = await this.contactsRepository.save(createContactDto);
    return { message: 'contacts successfully added', contacts };
  }

  findAll() {
    return this.contactsRepository.find();
  }

  findOne(id: number) {
    return this.contactsRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    const contact = await this.contactsRepository.findOne({
      where: { id },
    });
    if (!contact) throw new NotFoundException('This contact not found');
    const updatedContact = await this.contactsRepository.update(
      id,
      updateContactDto,
    );
    return { message: 'contacts was successfully updated', updatedContact };
  }

  async remove(id: number) {
    const contact = await this.contactsRepository.findOne({
      where: { id },
    });
    if (!contact) throw new NotFoundException('This contact not found');

    await this.contactsRepository.delete(id);

    return { status: 'ok', message: 'contacts was successfully deleted' };
  }
}
