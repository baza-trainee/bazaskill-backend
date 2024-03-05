import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    document_id: string,
    document_url: string,
    createDocumentDto: CreateDocumentDto,
  ) {
    return await this.documentRepository.save({
      ...createDocumentDto,
      document_id,
      document_url,
    });
  }

  async findAll() {
    return this.documentRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    const document = await this.documentRepository.findOne({
      where: { id },
    });
    if (!document) throw new NotFoundException('Document not found');
    return document;
  }

  async update(
    id: number,
    updateDocumentDto: UpdateDocumentDto,
    document_id: string,
    document_url: string,
  ) {
    const pdf = await this.documentRepository.findOne({
      where: {
        id,
      },
    });
    if (!pdf) throw new NotFoundException('This pdf document not found');
    await this.documentRepository.update(id, {
      ...updateDocumentDto,
      document_id,
      document_url,
    });
    return { message: 'document successefuly updated', pdf };
  }

  async remove(id: number) {
    const pdf = await this.documentRepository.findOne({
      where: {
        id,
      },
    });
    if (!pdf) throw new NotFoundException('This pdf document not found');
    await this.documentRepository.delete(id);
    return { message: 'document successefuly deleted', pdf };
  }
}
