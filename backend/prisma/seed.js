const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'User',
      email: 'user@mail.com',
      password: '$2a$10$waalPWQvFxTiKzfykeX8VeWdrTUF2yeKwpHMInBifS1ZDGmSKt1ja'
    },
  })

  const amin = await prisma.user.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Amin',
      email: 'amin@mail.com',
      password: '$2a$10$91poT7uanvutSP1qXA78iunos3B36XjODQv4oDWfDxk2wio9UU3k.'
    },
  })

  const tentangKamu = await prisma.book.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Tentang Kamu',
      author: 'Tere Liye',
      publisher: 'Republika Penerbit',
      year: 2016,
      pages: 524,
      image: 'uploads\\tentangkamu.jpg'
    },
  })

  const deathNote = await prisma.book.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'Death Note - New Edition 01',
      author: 'Ohba Tsugumi',
      publisher: 'm&c!',
      year: 2023,
      pages: 336,
      image: 'uploads\\deathnote.jpg'
    },
  })

  const serbaSalah = await prisma.book.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: 'Serba Salah',
      author: 'Jennie Liandra',
      publisher: 'Bukune',
      year: 2019,
      pages: 36,
      image: 'uploads\\serbasalah.jpg'
    },
  })

  console.log({ user, amin, tentangKamu, deathNote, serbaSalah })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })