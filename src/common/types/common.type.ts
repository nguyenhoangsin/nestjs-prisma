// Custom HTTP status type for API responses.
export type CustomHttpStatus = { statusCode?: number; code: string; message: string };

// Shape of Prisma select object extracted from GraphQL query.
export type PrismaSelectObject = {
  select: Record<string, true | PrismaSelectObject>;
};
