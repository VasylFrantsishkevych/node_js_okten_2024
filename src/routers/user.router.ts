import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { userUpdateValidator, userValidator } from "../validators/user.validator";

const router = Router();

router.get('/', userController.getAll);
router.post(
   '/', 
      commonMiddleware.userBodyValid(userValidator), 
      userController.create
);

router.get(
   '/:userId', 
      commonMiddleware.isIdvalid('userId'), 
      userController.getById
);
router.put(
   '/:userId', 
      commonMiddleware.isIdvalid('userId'),
      commonMiddleware.userBodyValid(userUpdateValidator), 
      userController.update
);
router.delete(
   '/:userId', 
      commonMiddleware.isIdvalid('userId'), 
      userController.delete
);

export const userRouter = router;