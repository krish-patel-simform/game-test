// create game state

import type { GameState } from "./types.ts";

export const splitImages : string[]= [
    'part_0.png',
    'part_1.png',
    'part_2.png',
    'part_3.png',
    'part_4.png',
    'part_5.png',
    'part_6.png',
    'part_7.png',
    'part_8.png',
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