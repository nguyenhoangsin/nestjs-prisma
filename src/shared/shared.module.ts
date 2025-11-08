import { Module, Global } from '@nestjs/common';
import { DataLoaderService } from '@shared/data-loader.service';

@Global()
@Module({
  imports: [],
  providers: [DataLoaderService],
  exports: [DataLoaderService],
})
export class SharedModule {}
