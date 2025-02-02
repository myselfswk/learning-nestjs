import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignupDto, LoginDto } from './dto/auth.dto';
import { User } from '../schemas/user.schema';

@Injectable()
export class AuthenticationsService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService
    ) { }

    async signup(signupDto: SignupDto): Promise<{ token: string }> {
        const { email, password } = signupDto;

        // Check if user already exists
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new ConflictException('User already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await this.userModel.create({
            ...signupDto,
            password: hashedPassword,
        });

        // Generate JWT token
        const token = this.generateJwtToken(newUser.id);

        return { token };
    }

    async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { email, password } = loginDto;

        // Find user
        const user = await this.userModel.findOne({ email }).select('+password');
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user?.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Generate JWT token
        const token = this.generateJwtToken(user.id);

        return { token };
    }

    private generateJwtToken(userId: string): string {
        return this.jwtService.sign({ userId });
    }
}
