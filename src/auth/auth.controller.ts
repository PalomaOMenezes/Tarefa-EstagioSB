import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}
        
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login (@Body() dto: LoginDto){
        return this.authService.autenticar(dto.email, dto.senha);
    }   
}