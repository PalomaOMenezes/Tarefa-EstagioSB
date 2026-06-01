import { AuthService } from "./auth.service";
import { LoginDto } from "./dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
        acessoToken: string;
    }>;
}
