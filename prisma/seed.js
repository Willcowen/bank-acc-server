const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  const alice = await prisma.user.create({
    data: {
      username: "Alice",
      email: "alice@alice.com",
      password: "alice",
    },
  });

  const transaction = await prisma.transaction.create({
    data: {
      description: "Paycheck",
      amount: 100,
      date: new Date(),
      type: "deposit",
      balanceAtTime: 100,
      user: {
        connect: { id: alice.id },
      },
    },
  });
}

console.log("Running seed file");
seed();
