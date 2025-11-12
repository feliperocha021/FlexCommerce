import { IUserDocument } from "../models/user.model";
import { UserDTO } from "../dtos/user.dto";

export function toUserDTO(user: IUserDocument): UserDTO {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  };
}
