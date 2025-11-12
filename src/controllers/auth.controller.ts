import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { cookieConfig } from "../config/cookie";
import { RefreshTokenPayload } from "../interfaces/user-payload.interface";
import { toUserDTO } from "../mappers/user.mapper";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const { user, accessToken, refreshToken } = await this.authService.signup(name, email, password);

      res.cookie(cookieConfig.name, refreshToken, cookieConfig);
      res.setHeader("x-refresh-token", refreshToken);
      return res.status(201).json({ 
        success: true,
        message: "Usuário criado com sucesso",
        data: {
          user: toUserDTO(user),
          accessToken,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const { user, accessToken, refreshToken } = await this.authService.login(email, password);

      res.cookie(cookieConfig.name, refreshToken, cookieConfig);
      res.setHeader("x-refresh-token", refreshToken);
      return res.status(201).json({
        success: true,
        message: "Login realizado com sucesso",
        data: {
          user: toUserDTO(user),
          accessToken,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.user as RefreshTokenPayload;
      const { user, accessToken, refreshToken } = await this.authService.refresh(payload);

      res.cookie(cookieConfig.name, refreshToken, cookieConfig);
      res.setHeader("x-refresh-token", refreshToken);
      return res.status(200).json({
        success: true,
        message: "Token renovado com sucesso",
        data: {
          user: toUserDTO(user),
          accessToken,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.user as RefreshTokenPayload;

      const message = await this.authService.logout(payload);

      res.clearCookie(cookieConfig.name, cookieConfig);

      return res.status(200).json({
        success: true,
        message: "Logout realizado com sucesso",
        data: null
      });
    } catch (err) {
      next(err);
    }
  }

  async logoutAll(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.user as RefreshTokenPayload;

      const message = await this.authService.logoutAll(payload);

      res.clearCookie(cookieConfig.name, cookieConfig);
    return res.status(200).json({
      success: true,
      message: "Logout global realizado com sucesso",
      data: null
    });
    } catch (err) {
      next(err);
    }
  }
}
