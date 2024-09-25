import { EmailTypeEnum } from "../enums/email-type.enum";
import { ApiError } from "../errors/api-error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
import { ISignIn, IUser } from "../interfaces/user.interfsce";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
   public async signUp(dto: IUser): Promise<{user: IUser, tokens: ITokenPair}> {
      await this.isEmailExistOrThrow(dto.email);
      const password = await passwordService.hashPassword(dto.password)
      const user = await userRepository.create({...dto, password});

      const tokens = tokenService.generatTokens({userId: user._id, role: user.role})
      await tokenRepository.create({...tokens, _userId: user._id});

      await emailService.sendMail(EmailTypeEnum.WELCOME,'vasul.fr@gmail.com', {
         name: user.name
      }
      )

      return {user, tokens};
   }

   public async signIn(dto:ISignIn): Promise<{user: IUser; tokens: ITokenPair}> {
      const user = await userRepository.getByEmail(dto.email);
      if (!user) {
         throw new ApiError('User not found', 404);
      }

      const isPasswordCorrect = await passwordService.comparePassword(
         dto.password,
         user.password
      )
      if (!isPasswordCorrect) {
         throw new ApiError('Invalid credential', 401);
      }

      const tokens = tokenService.generatTokens({
         userId: user._id,
         role: user.role,
      })
      await tokenRepository.create({...tokens, _userId: user._id})

      return {user, tokens}
   }

   public async refresh(refreshToken: string, payload: ITokenPayload): Promise<ITokenPair>{
      await tokenRepository.deleteOneByParams({refreshToken});
      const tokens = tokenService.generatTokens({userId: payload.userId, role: payload.role});
      await tokenRepository.create({...tokens, _userId: payload.userId})
      return tokens;
   }

   public async logout(jwtPayload: ITokenPayload, tokenId: string): Promise<void> {
      const user = await userRepository.getById(jwtPayload.userId);
      await tokenRepository.deleteOneByParams({_id: tokenId});
      await emailService.sendMail(EmailTypeEnum.LOGOUT, 'vasul.fr@gmail.com', {
         name: user.name,
      })
   }

   public async logoutAll(jwtPayload: ITokenPayload): Promise<void> {
      const user = await userRepository.getById(jwtPayload.userId);
      await tokenRepository.deleteManyByParams({_userId: jwtPayload.userId});
      await emailService.sendMail(EmailTypeEnum.LOGOUT, 'vasul.fr@gmail.com', {
         name: user.name,
      })

   }

   private async isEmailExistOrThrow(email: string): Promise<void> {
      const user = await userRepository.getByEmail(email);
      if (user) {
        throw new ApiError("Email already exists", 409);
      }
    }
}

export const authService = new AuthService();