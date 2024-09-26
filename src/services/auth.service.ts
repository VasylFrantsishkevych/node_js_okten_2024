import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { EmailTypeEnum } from "../enums/email-type.enum";
import { ApiError } from "../errors/api-error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
import { IResetPasswordSend, IResetPasswordSet, ISignIn, IUser, IVerifyEmail } from "../interfaces/user.interfsce";
import { actionTokenRepository } from "../repositories/action-token.repository";
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

      const token = tokenService.generateActionTokens(
         {userId: user._id, role: user.role},
         ActionTokenTypeEnum.VERIFY_EMAIL
      );

      await actionTokenRepository.create({
         token,
         type: ActionTokenTypeEnum.VERIFY_EMAIL,
         _userId: user._id
      });

      await emailService.sendMail(EmailTypeEnum.WELCOME, user.email, {
         name: user.name,
         actionToken: token,
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
      await emailService.sendMail(EmailTypeEnum.LOGOUT, user.email, {
         name: user.name,
      })
   }

   public async logoutAll(jwtPayload: ITokenPayload): Promise<void> {
      const user = await userRepository.getById(jwtPayload.userId);
      await tokenRepository.deleteManyByParams({_userId: jwtPayload.userId});
      await emailService.sendMail(EmailTypeEnum.LOGOUT, user.email, {
         name: user.name,
      })

   }

   public async forgotPasswordSendEmail(dto: IResetPasswordSend): Promise<void> {
      const user = await userRepository.getByEmail(dto.email);
      if (!user) {
         throw new ApiError('User not found', 404);
      }

      const token = tokenService.generateActionTokens(
         {userId: user._id, role: user.role},
         ActionTokenTypeEnum.FORGOT_PASSWORD
      );
      await actionTokenRepository.create({
         token,
         type: ActionTokenTypeEnum.FORGOT_PASSWORD,
         _userId: user._id
      });

      await emailService.sendMail(EmailTypeEnum.FORGOT_PASSWORD, user.email, {
         name: user.name,
         email: user.email,
         actionToken: token,
      })
   }

   public async forgotPasswordSet(dto: IResetPasswordSet, JwtPayload: ITokenPayload): Promise<void> {
      const password = await passwordService.hashPassword(dto.password)
      await userRepository.updateById(JwtPayload.userId, {password});

      await actionTokenRepository.deleteManyByParams({
         _userId: JwtPayload.userId,
         type: ActionTokenTypeEnum.FORGOT_PASSWORD,
      })

      await tokenRepository.deleteManyByParams({_userId: JwtPayload.userId})
   }

   public async veryfyEmail(dto: IVerifyEmail, JwtPayload: ITokenPayload): Promise<void> {
      await userRepository.updateById(JwtPayload.userId, {isVerified: dto.isVerified});
   }

   private async isEmailExistOrThrow(email: string): Promise<void> {
      const user = await userRepository.getByEmail(email);
      if (user) {
        throw new ApiError("Email already exists", 409);
      }
    }
}

export const authService = new AuthService();