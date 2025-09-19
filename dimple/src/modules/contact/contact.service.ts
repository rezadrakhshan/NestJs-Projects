import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from 'src/database/entity/contact.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

async contactUs(data: Partial<Contact>) {
    const contact = this.contactRepository.create(data);
    const savedContact = await this.contactRepository.save(contact);
    return {
        message: 'Contact information submitted successfully.',
        contact: savedContact,
    };
}
}
