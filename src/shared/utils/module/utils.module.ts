import { Module } from '@nestjs/common/decorators';
import { JwtModule } from '@nestjs/jwt/dist';
import { CriptUtil } from '../crypt';

@Module({
  providers: [CriptUtil],
  exports: [CriptUtil]
})
export class UtilsModule { }