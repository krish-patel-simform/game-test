// create game state

import type { GameState } from "./types.ts";

export const splitImages : string[]= [
    'part_0.jpg',
    'part_1.jpg',
    'part_2.jpg',
    'part_3.jpg',
    'part_4.jpg',
    'part_5.jpg',
    'part_6.jpg',
    'part_7.jpg',
    'part_8.jpg',
]

export const initGameState : GameState = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
]

export const gameState:GameState = {...initGameState}