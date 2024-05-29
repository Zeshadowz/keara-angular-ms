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
  "id": number;
}
