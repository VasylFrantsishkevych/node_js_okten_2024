import { Router } from "express";
import { commonMiddleware } from "../middlewares/common.middleware";
import { signIn, userValidator } from "../validators/user.validator";
import { authController } from "../controllers/auth.controller";
import { authMiddleawre } from "../middlewares/auth.middleware";

const router = Router();

router.post('/sign-up', commonMiddleware.userBodyValid(userValidator), authController.signUp);
router.post('/sign-in',commonMiddleware.userBodyValid(signIn) , authController.signIn);

router.post('/refresh', authMiddleawre.checkRefreshToken, authController.refresh)

router.post('/logout',authMiddleawre.checkAccessToken, authController.logout);
router.post('/logout/all',authMiddleawre.checkAccessToken, authController.logoutAll);

export const authRouter = router;