import { PrismaClient } from "@prisma/client";
// limit the ammount of connections by assigning prisma to globalThis
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// check if prisma already exists in globalThis and if not, create a new connection
export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ log: ["query"] });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
