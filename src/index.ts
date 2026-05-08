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
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
]

export const timeOut = "9:59"

export let gameState:GameState = [...initGameState]