import { Router } from "express";
import { commonMiddleware } from "../middlewares/common.middleware";
import { userValidator } from "../validators/user.validator";
import { authController } from "../controllers/auth.controller";
import { authMiddleawre } from "../middlewares/auth.middleware";

const router = Router();

router.post('/sign-up', commonMiddleware.userBodyValid(userValidator), authController.signUp);
router.post('/sign-in', authController.signIn);

router.post('/refresh', authMiddleawre.checkRefreshToken, authController.refresh)

export const authRouter = router;