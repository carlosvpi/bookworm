import { prisma } from '../lib/db'

export function unfriend(/*id1: number, id2: number*/) {
  console.log("OK")
  // return async () => await prisma.user.update({
  //   where: {
  //     id: id1
  //   },
  //   data: {
  //     friends: {
  //       disconnect: { id: id2 }
  //     }
  //   }
  // })
}

export function befriend(/*id1: number, id2: number*/) {
  console.log("OK")
  // return async () => await prisma.user.update({
  //   where: {
  //     id: id1
  //   },
  //   data: {
  //     friends: {
  //       connect: { id: id2 }
  //     }
  //   }
  // })
}
