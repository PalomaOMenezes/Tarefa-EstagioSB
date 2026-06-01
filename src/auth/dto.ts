import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto{
    @IsEmail({},{message: 'Forneça um email valido para login'})
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'a senha é obrigatória' })
    senha: string
}