export interface SignUpRequestDto {
  gender: string;
  title: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  terms: boolean;
}

export interface SignUpResponseDto {
  "id": string;
}

export interface UserDto {
  id: number;
  gender: string;
  title: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  role: string;
  terms: boolean
}
