import {
  Controller,
  Post,
  Put,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDto } from './dto/contact.dto';

@Controller('contact-us')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async contactUs(@Body() data: ContactDto) {
    return this.contactService.contactUs(data);
  }
}
