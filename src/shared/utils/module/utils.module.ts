import { Module } from '@nestjs/common/decorators';
import { CriptUtil } from '../crypt';

@Module({
  providers: [CriptUtil],
  exports: [CriptUtil]
})
export class UtilsModule { }