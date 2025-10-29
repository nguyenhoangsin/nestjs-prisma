import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const logger = new Logger('PrismaSeed');
const prisma = new PrismaClient();

async function main() {
  // await prisma.user.upsert({
  //   where: {},
  //   update: {},
  //   create: {},
  // });
  // logger.log('Seed completed');
}

main()
  .catch(error => {
    logger.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
