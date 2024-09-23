import { Router } from "express";
import { commonMiddleware } from "../middlewares/common.middleware";
import { userValidator } from "../validators/user.validator";
import { authController } from "../controllers/auth.controller";

const router = Router();

router.post('/sign-up', commonMiddleware.userBodyValid(userValidator), authController.signUp);
router.post('/sign-in', authController.signIn);

export const authRouter = router;