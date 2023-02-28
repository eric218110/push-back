import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import * as CryptoAES from 'crypto-js/aes';

@Injectable()
export class CriptUtil {

  public async generateHashByValue(plainText: string) {
    return hash(plainText, 8);
  }

  public async compareValueAndHash(plainText: string, hash: string) {
    return compare(plainText, hash);
  }

  public encriptText(text: string): string {
    const { AES_SECRET: secret } = process.env
    return CryptoAES.encrypt(text, secret).toString()
  }

  public decriptText(text: string): string {
    const { AES_SECRET: secret } = process.env

    return CryptoAES.decrypt(text, secret).toString()
  }
}