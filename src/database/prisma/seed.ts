import { Logger } from '@nestjs/common';
import { PrismaClient } from './generated/prisma/client';

const logger = new Logger('PrismaSeed');
const prisma = new PrismaClient();

async function main() {
  // Example seed data
  await prisma.user.upsert({
    where: { id: 1 },
    update: { email: 'admin@example.com' },
    create: {
      id: 1,
      email: 'admin@example.com',
      posts: {
        create: [{ title: 'Welcome' }],
      },
    },
  });
}

main()
  .catch(error => {
    logger.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
