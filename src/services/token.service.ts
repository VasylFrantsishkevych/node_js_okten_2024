import * as jsonwebtoken from 'jsonwebtoken';
import { ITokenPayload, ITokenPair } from '../interfaces/token.interface';
import { configs } from '../config/configs';
import { ApiError } from '../errors/api-error';
import { TokenTypeEnum } from '../enums/token-type.enum';
import { ActionTokenTypeEnum } from '../enums/action-token-type.enum';

class TokenService {
   public generatTokens(payload: ITokenPayload): ITokenPair {
      const accessToken = jsonwebtoken.sign(payload, configs.JWT_ACCESS_SECRET, {
         expiresIn: configs.JWT_ACCESS_EXPIRATION
      })
      const refreshToken = jsonwebtoken.sign(payload, configs.JWT_REFRESH_SECRET, {
         expiresIn: configs.JWT_REFRESH_EXPIRATION
      })
      return {accessToken, refreshToken};
   }

   public verifyToken(token: string, type: TokenTypeEnum): ITokenPayload {
      let secret: string;
      try {
         switch (type) {
            case TokenTypeEnum.ACCESS:
               secret = configs.JWT_ACCESS_SECRET
               break;
            case TokenTypeEnum.REFRESH:
               secret = configs.JWT_REFRESH_SECRET
               break;   
         }
         return jsonwebtoken.verify(token, secret) as ITokenPayload;
      } catch (e) {
         throw new ApiError('Invalid token', 401);
      }
   }

   public generateActionTokens(payload: ITokenPayload, tokenType: ActionTokenTypeEnum): string {
      let secret: string;
      let expiration: string;

      switch (tokenType) {
         case ActionTokenTypeEnum.FORGOT_PASSWORD:
            secret = configs.ACTION_FORGOT_PASSWORD_SECRET;
            expiration = configs.ACTION_FORGOT_PASSWORD_EXPIRATION;
            break; 
         case ActionTokenTypeEnum.VERIFY_EMAIL:
            secret = configs.ACTION_VERIFY_EMAIL_SECRET;
            expiration = configs.ACTION_VERIFY_EMAIL_EXPIRATION;
            break;   
         default:
            throw new ApiError('Invaalid token type', 400);
      }

      return jsonwebtoken.sign(payload, secret, {expiresIn: expiration})
   }

   public verifyActionToken(token: string, type: ActionTokenTypeEnum): ITokenPayload {
      let secret: string;
      try {
         switch (type) {
            case ActionTokenTypeEnum.FORGOT_PASSWORD:
               secret = configs.ACTION_FORGOT_PASSWORD_SECRET;
               break; 
            case ActionTokenTypeEnum.VERIFY_EMAIL:
               secret = configs.ACTION_FORGOT_PASSWORD_SECRET;
               break;   
            default:
                  throw new ApiError('Invaalid token type', 400);   
         }
         return jsonwebtoken.verify(token, secret) as ITokenPayload;
      } catch (e) {
         throw new ApiError('Invalid token', 401);
      }
   }
}

export const tokenService = new TokenService();