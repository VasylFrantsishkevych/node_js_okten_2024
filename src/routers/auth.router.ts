import { Router } from "express";
import { commonMiddleware } from "../middlewares/common.middleware";
import { signIn, userValidator } from "../validators/user.validator";
import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post('/sign-up', commonMiddleware.userBodyValid(userValidator), authController.signUp);
router.post('/sign-in',commonMiddleware.userBodyValid(signIn) , authController.signIn);

router.post('/refresh', authMiddleware.checkRefreshToken, authController.refresh)

router.post('/logout',authMiddleware.checkAccessToken, authController.logout);
router.post('/logout/all',authMiddleware.checkAccessToken, authController.logoutAll);

router.post('/forgot-password', authController.forgotPasswordSendEmail);
router.put('/forgot-password', authMiddleware.checkActionToken, authController.forgotPasswordSet);

export const authRouter = router;