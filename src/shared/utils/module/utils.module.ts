import { Module } from '@nestjs/common/decorators';
import { CriptUtil } from '../crypt';
import { DecodeUtil } from '../decode';

@Module({
  providers: [CriptUtil, DecodeUtil],
  exports: [CriptUtil, DecodeUtil]
})
export class UtilsModule { }