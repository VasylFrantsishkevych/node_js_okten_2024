import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { userUpdateValidator} from "../validators/user.validator";
import { authMiddleawre } from "../middlewares/auth.middleware";

const router = Router();

router.get('/', userController.getAll);

router.get('/me', authMiddleawre.checkAccessToken, userController.getMe);
router.put(
   '/me', 
      authMiddleawre.checkAccessToken,
      commonMiddleware.userBodyValid(userUpdateValidator), 
      userController.updateMe
);
router.delete(
   '/me', 
      authMiddleawre.checkAccessToken,
      userController.deleteMe
);
router.get(
   '/:userId', 
      commonMiddleware.isIdvalid('userId'), 
      userController.getById
);

export const userRouter = router;