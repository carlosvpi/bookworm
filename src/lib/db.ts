import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}

export async function getUser(userId: number) {
  return await prisma.user.findFirst({
    where: {
      id: +userId
    },
    include: {
      friends: true,
      userClubs: {
        include: {
          club: true
        }
      }
    }
  })
}

export type User = {
  id: number
  name: string
  email: string
  friends: {id: number, name: string}[]
  clubs: {
    creator: Club[]
    admin: Club[]
    member: Club[]
  }
}

export type Club = {id: number, name: string}

export async function getUsers() {
  return await prisma.user.findMany()
}
