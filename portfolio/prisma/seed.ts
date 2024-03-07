import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    generateProjects()
}

async function generateProjects() {
    for (let i = 0; i < 10; i++) {
        const id = "Project " + i;
        const project = await prisma.project.upsert({
            where: { id: id},
            update: {},
            create: {
                id: id,
                title: id,
                description: "Description " + id,
                previewUrl: "/images/Nakiri Ayame - Hiasobi 9.png",
                url: "#",
                type: i % 2 == 0 ? "GitHub" : "YouTube"
            }
        })
    }
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