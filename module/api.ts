import { login } from "./api/login";
import { register } from "./api/register";

export const LIST_API_USER = {
  'POST /api/register': register,
  'POST /api/login': login
}
