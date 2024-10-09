import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { listQuery, userUpdateValidator} from "../validators/user.validator";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get('/', commonMiddleware.isQueryValid(listQuery), userController.getList);

router.get('/me', authMiddleware.checkAccessToken, userController.getMe);
router.put(
   '/me', 
      authMiddleware.checkAccessToken,
      commonMiddleware.userBodyValid(userUpdateValidator), 
      userController.updateMe
);
router.delete(
   '/me', 
      authMiddleware.checkAccessToken,
      userController.deleteMe
);
router.get(
   '/:userId', 
      commonMiddleware.isIdvalid('userId'), 
      userController.getById
);

export const userRouter = router;