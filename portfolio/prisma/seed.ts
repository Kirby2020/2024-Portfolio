import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const imageUrls = [
  "https://firebasestorage.googleapis.com/v0/b/radiant-rookery-417208.appspot.com/o/images%2FNakiri%20Ayame%20-%20KING%2023.png?alt=media",
  "https://firebasestorage.googleapis.com/v0/b/radiant-rookery-417208.appspot.com/o/images%2FPekora%20%26%20Ihora%20-%20The%20world%20is%20in%20love%201.png?alt=media",
  "https://firebasestorage.googleapis.com/v0/b/radiant-rookery-417208.appspot.com/o/images%2F1710429083349_Tobiichi%20Origami%20(white).png?alt=media",
  "https://firebasestorage.googleapis.com/v0/b/radiant-rookery-417208.appspot.com/o/images%2F008.jpg?alt=media",
];

async function generateImageTags() {
  await prisma.imageTag.createMany({
    data: [
      { title: "smile" },
      { title: "vTuber" },
      { title: "drawing" },
      { title: "character" },
      { title: "anime" },
    ],
  });
}

async function main() {
  generateProjects();

  generateImageTags();

  generateCollection("Collection 1", 3);
  generateCollection("Collection 2", 2);
  generateCollection("Collection 3", 5);

  generateGames();
}

async function generateProjects() {
  for (let i = 0; i < 10; i++) {
    const id = "Project_" + i;
    const randomImageIndex = i % imageUrls.length;
    const project = await prisma.project.upsert({
      where: { id: id },
      update: {},
      create: {
        id: id,
        title: id,
        description: "Description " + id,
        previewUrl: imageUrls[randomImageIndex],
        url: "#",
        type: i % 2 == 0 ? "GitHub" : "YouTube",
      },
    });
  }
}

async function generateCollection(title: string, numImages: number) {
  const imageIds = [];

  for (let i = 0; i < numImages; i++) {
    const image = await generateImage(i);
    imageIds.push(image.id);
  }

  const collection = await prisma.collection.create({
    data: {
      title: title,
      images: { connect: imageIds.map((id) => ({ id })) },
      previewUrl: imageUrls[0],
    },
  });
}

async function generateImage(index: number) {
  const imageUrl = imageUrls[index % imageUrls.length];
  const tags = await getRandomTags();
  const image = await prisma.image.create({
    data: {
      fileName: imageUrl.split("/").pop()!,
      filePath: imageUrl,
      tags: { connect: tags.map((tag) => ({ id: tag.id })) },
    },
  });
  return image;
}

async function getRandomTags() {
  const imageTags = await prisma.imageTag.findMany();
  const shuffledTags = imageTags.sort(() => Math.random() - 0.5);
  const numTags = Math.floor(Math.random() * (shuffledTags.length + 1));
  return shuffledTags.slice(0, numTags);
}

async function generateGames() {
  for (let i = 0; i < 5; i++) {
    const id = i;
    const game = await prisma.game.upsert({
      where: { id: id },
      update: {},
      create: {
        game_id: id,
        name: "Game title",
        previewUrl:
          "https://images.igdb.com/igdb/image/upload/t_1080p/co2h5a.jpg",
        url: "https://www.igdb.com/games/megadimension-neptunia-vii",
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
