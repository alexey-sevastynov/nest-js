import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Document } from "mongoose";
import * as bcrypt from "bcryptjs";
import { User } from "../../resources/user/user-schema";

interface JwtPayload {
    sub: string; // Mongo _id
    email: string;
}

@Injectable()
export class PasswordResetService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectModel(User.name) private readonly userModel: Model<User & Document>,
    ) {}

    async generateResetToken(email: string) {
        const user = await this.userModel.findOne({ email });
        if (!user) throw new NotFoundException("User not found");

        const token = this.jwtService.sign({ sub: user._id, email: user.email }, { expiresIn: "15m" });

        return { token, userId: user._id as string };
    }

    verifyResetToken(token: string): JwtPayload {
        try {
            return this.jwtService.verify(token);
        } catch {
            throw new UnauthorizedException("Invalid or expired token");
        }
    }

    async resetPassword(token: string, newPassword: string) {
        try {
            const payload = this.verifyResetToken(token);
            const user = await this.userModel.findById(payload.sub);

            if (!user) {
                return { success: false, notificationMessage: "User not found" };
            }

            user.password = await bcrypt.hash(newPassword, 10);
            await user.save();

            return { success: true, notificationMessage: "Password updated successfully!" };
        } catch {
            return { success: false, notificationMessage: "Failed to reset password" };
        }
    }
}
