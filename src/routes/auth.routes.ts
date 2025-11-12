import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";
import { validateBody } from "../middlewares/validate.middleware";
import { createUserSchema } from "../validators/user.validator";
import { UserService } from "../services/user.service";
import { requireAuth, requireAuthRefresh } from "../middlewares/auth.middlewares";
import { RedisService } from "../services/redis.service";
import { loginUserSchema } from "../validators/login.validator";

const router = Router();

const userService = new UserService
const redisService = new RedisService
const authService = new AuthService(userService, redisService);
const authController = new AuthController(authService);

router.route("/signup")
  .post(validateBody(createUserSchema), authController.signup.bind(authController))

router.route("/login")
  .post(validateBody(loginUserSchema), authController.login.bind(authController));

router.route("/refresh")
  .post(requireAuthRefresh, authController.refresh.bind(authController));

router.route("/logout")
  .post(requireAuth, authController.logout.bind(authController));

router.route("/logout-all")
  .post(requireAuth, authController.logoutAll.bind(authController));

export default router;
