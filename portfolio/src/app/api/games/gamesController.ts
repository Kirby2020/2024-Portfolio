"use server";

import prisma from "@/app/lib/prismaClient";
import { Game } from "@prisma/client";

const PAGE_SIZE = 100;

export async function getGames(): Promise<Game[]> {
  let game: Game[] = [];
  try {
    game = await prisma.game.findMany({
      take: PAGE_SIZE,
    });
  } catch (e) {
    console.log("Error fetching games: " + e);
  }

  return game;
}
