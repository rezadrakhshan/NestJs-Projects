import { Controller } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contact-us')
export class ContactController {
  constructor(private contactService: ContactService) {}
}
