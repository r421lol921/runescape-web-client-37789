
import { Game } from "./osrs/Game";

const canvas = document.getElementById("game-canvas");
canvas.width = 765;
canvas.height = 503;
canvas.focus();

const game = new Game(canvas);
game.initializeApplication(765, 503);
