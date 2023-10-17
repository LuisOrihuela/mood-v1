import { prisma } from "@/utils/db";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const createNewUser = async () => {
  const user = await currentUser();
  const match = await prisma.user.findUnique({
    where: {
      clerkId: user?.id as string,
    },
  });

  if (user && !match) {
    await prisma.user.create({
      data: {
        clerkId: user?.id,
        email: user?.emailAddresses[0].emailAddress,
      },
    });
  }

  redirect("/journal");
};

export const NewUserPage = async () => {
  await createNewUser();
  return <div>...loading</div>;
};

export default NewUserPage;
