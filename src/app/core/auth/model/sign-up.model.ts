import { SignUpRequestDto } from "../../../shared/api/dto/sign-up.dto";

export interface SignUpModel extends SignUpRequestDto {
  confirmPassword: string;
}
