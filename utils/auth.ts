import { auth } from "@clerk/nextjs";
import { prisma } from "./db";

export async function getUserByClerkId() {
  const { userId } = auth();

  if (userId) {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });
    return user;
  } else {
    console.error("User not found");
    return null;
  }
}
