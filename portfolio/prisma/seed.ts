import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    generateProjects()
}

async function generateProjects() {
    for (let i = 0; i < 10; i++) {
        const id = "Project_" + i;
        const project = await prisma.project.upsert({
            where: { id: id},
            update: {},
            create: {
                id: id,
                title: id,
                description: "Description " + id,
                previewUrl: "https://k41jfyz0rmi8ju7o.public.blob.vercel-storage.com/images/102978_289999.webp",
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