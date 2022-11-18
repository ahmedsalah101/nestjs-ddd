export namespace Credentials {
  export class BasicCredentials {
    email: string;
    userId: string;
    hashedPassword: string;
  }

  export class GoogleCredentials {
    googleId: string;
    userId: string;
  }
}
