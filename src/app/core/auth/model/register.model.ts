import { SignUpRequestDto } from "../../../shared/api/dto/sign-up.dto";

export interface RegisterModel extends SignUpRequestDto {
  confirmPassword: string;
}
