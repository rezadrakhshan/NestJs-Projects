import { Controller,Post,Body,UsePipes,ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";


@Controller("auth")
export class AuthController{
	constructor(private readonly authService:AuthService){}

	@Post('register')
	@UsePipes(new ValidationPipe())
	async register(@Body() data:RegisterDto){}
}
