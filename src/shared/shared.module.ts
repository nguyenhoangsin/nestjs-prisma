import { Module, Global } from '@nestjs/common';
import { AuditLogService } from '@shared/audit-log.service';
import { DataLoaderService } from '@shared/data-loader.service';

@Global()
@Module({
  imports: [],
  providers: [AuditLogService, DataLoaderService],
  exports: [AuditLogService, DataLoaderService],
})
export class SharedModule {}
