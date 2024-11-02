export class IUser {
  id: string;
  email: string;
  role: string;
  access_token: string;
}

export class NotFoundResponse {
  status_code: number;
  message: string;
}

export class UploadImageResponse {
  imageUrl: string;
}

export class FileType {
  file: Express.Multer.File;
}

export class ResetPasswordResponse {
  token: string;
}
