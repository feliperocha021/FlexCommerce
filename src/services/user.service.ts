import { ConflictError, NotFoundError } from "../errors/error";
import { User } from "../models/user.model";

export class UserService {
  async createUser(name: string, email: string, password: string) {
    const exist = await User.findOne({ email });
    if (exist) throw new ConflictError("Este e-mail já está em uso");

    const user = await User.create({ name, email, password });
    return user;
  }

  async findByEmail(email: string) {
    return await User.findOne({ email });
  }

  async findById(userId: string) {
    const user = await User.findById(userId);
    if(!user) {
      throw new NotFoundError("Usuário não encontrado")
    }
    return user;
  }
}