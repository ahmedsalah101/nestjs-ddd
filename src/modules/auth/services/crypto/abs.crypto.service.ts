export abstract class CryptoServices {
  abstract hash(dataToHash: string): Promise<string>;
  abstract verify(hashedData: string, plainData: string): Promise<boolean>;
  abstract verifyOrThrow(
    hashedData: string,
    plainData: string,
  ): Promise<boolean>;
}
