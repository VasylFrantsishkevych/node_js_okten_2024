import { Router } from "express";
import { commonMiddleware } from "../middlewares/common.middleware";
import { signIn, userValidator } from "../validators/user.validator";
import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";

const router = Router();

router.post('/sign-up', commonMiddleware.userBodyValid(userValidator), authController.signUp);
router.post('/sign-in',commonMiddleware.userBodyValid(signIn) , authController.signIn);

router.post('/refresh', authMiddleware.checkRefreshToken, authController.refresh)

router.post('/logout',authMiddleware.checkAccessToken, authController.logout);
router.post('/logout/all',authMiddleware.checkAccessToken, authController.logoutAll);

router.post('/forgot-password', authController.forgotPasswordSendEmail);
router.put(
   '/forgot-password', 
   authMiddleware.checkActionToken(ActionTokenTypeEnum.FORGOT_PASSWORD), 
   authController.forgotPasswordSet
);

router.put(
   '/verify-email', 
   authMiddleware.checkActionToken(ActionTokenTypeEnum.VERIFY_EMAIL), 
   authController.verifyEmail
);

export const authRouter = router;