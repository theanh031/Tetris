// Define constants
const DEFAULT_COLS = 10;
const DEFAULT_ROWS = 20;
const BLOCK_SIZE = 30;
const COLOR_MAPPING = [
    "red",
    "orange",
    "green",
    "purple",
    "blue",
    "cyan",
    "yellow",
    "white",
];

const BRICK_LAYOUT = [
    [
        [
            [1, 7, 7],
            [1, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 1, 1],
            [7, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [7, 7, 1],
        ],
        [
            [7, 1, 7],
            [7, 1, 7],
            [1, 1, 7],
        ],
    ],
    [
        [
            [7, 1, 7],
            [7, 1, 7],
            [7, 1, 1],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [1, 7, 7],
        ],
        [
            [1, 1, 7],
            [7, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 7, 1],
            [1, 1, 1],
            [7, 7, 7],
        ],
    ],
    [
        [
            [1, 7, 7],
            [1, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 1, 1],
            [1, 1, 7],
            [7, 7, 7],
        ],
        [
            [7, 1, 7],
            [7, 1, 1],
            [7, 7, 1],
        ],
        [
            [7, 7, 7],
            [7, 1, 1],
            [1, 1, 7],
        ],
    ],
    [
        [
            [7, 1, 7],
            [1, 1, 7],
            [1, 7, 7],
        ],
        [
            [1, 1, 7],
            [7, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 7, 1],
            [7, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 7],
            [7, 1, 1],
        ],
    ],
    [
        [
            [7, 7, 7, 7],
            [1, 1, 1, 1],
            [7, 7, 7, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 1, 7],
            [7, 7, 1, 7],
            [7, 7, 1, 7],
            [7, 7, 1, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 7, 7, 7],
            [1, 1, 1, 1],
            [7, 7, 7, 7],
        ],
        [
            [7, 1, 7, 7],
            [7, 1, 7, 7],
            [7, 1, 7, 7],
            [7, 1, 7, 7],
        ],
    ],
    [
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
    ],
    [
        [
            [7, 1, 7],
            [1, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 1, 7],
            [7, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 1, 7],
            [1, 1, 7],
            [7, 1, 7],
        ],
    ],
];

const WHITE_COLOR_ID = 7;

const canvas = document.getElementById("board");
const canvasContext = canvas.getContext("2d");

canvasContext.canvas.width = DEFAULT_COLS * BLOCK_SIZE;
canvasContext.canvas.height = DEFAULT_ROWS * BLOCK_SIZE;

class Board {
    constructor(canvasContext) {
        this.canvasContext = canvasContext;
        this.grid = this.generateWriteBoard();
        this.score = 0;
        this.gameOver = false;
        this.isPlaying = false;
    }

    reset() {
        this.score = 0;
        this.grid = this.generateWriteBoard();
        this.gameOver = false;
        this.drawBoard();
    }
    generateWriteBoard() {
        return Array.from({ length: DEFAULT_ROWS }, () =>
            Array(DEFAULT_COLS).fill(WHITE_COLOR_ID)
        );
    }

    drawCell(x, y, colorId) {
        this.canvasContext.fillStyle =
            COLOR_MAPPING[colorId] || COLOR_MAPPING[WHITE_COLOR_ID];
        this.canvasContext.fillRect(
            x * BLOCK_SIZE,
            y * BLOCK_SIZE,
            BLOCK_SIZE,
            BLOCK_SIZE
        );
        
      
    }

    drawBoard() {
        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 0; col < this.grid[0].length; col++) {
                this.drawCell(col, row, this.grid[row][col]);
            }
        }
    }

    handleCompleteRows() {
        const latestGrid = board.grid.filter((row) => {
            return row.some((col) => col === WHITE_COLOR_ID);
        });

        const newScore = DEFAULT_ROWS - latestGrid.length;
        const newRows = Array.from({ length: newScore }, () =>
            Array(DEFAULT_COLS).fill(WHITE_COLOR_ID)
        );
        if (newScore) {
            board.grid = [...newRows, ...latestGrid];
            this.handleScore(newScore * 10);
        }
    }

    handleScore(newScore) {
        this.score += newScore;
        document
            .querySelectorAll(".score")
            .forEach((e) => (e.innerHTML = this.score));
    }
    handleGameOver() {
        this.gameOver = true;
        this.isPlaying = false;
        document.getElementById("game-over").style.display = "block";
    }
}

class Brick {
    constructor(id) {
        this.id = id;
        this.layout = BRICK_LAYOUT[id];
        this.activeIndex = 0;
        this.colPosition = 3;
        this.rowPosition = -2;
    }

    draw() {
        for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (
                let col = 0;
                col < this.layout[this.activeIndex][0].length;
                col++
            ) {
                if (this.layout[this.activeIndex][row][col] != WHITE_COLOR_ID) {
                    board.drawCell(
                        col + this.colPosition,
                        row + this.rowPosition,
                        this.id
                    );
                }
            }
        }
    }

    clear() {
        for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (
                let col = 0;
                col < this.layout[this.activeIndex][0].length;
                col++
            ) {
                if (this.layout[this.activeIndex][row][col] != WHITE_COLOR_ID) {
                    board.drawCell(
                        col + this.colPosition,
                        row + this.rowPosition,
                        WHITE_COLOR_ID
                    );
                }
            }
        }
    }

    moveLeft() {
        if (
            !this.checkCollision(
                this.rowPosition,
                this.colPosition - 1,
                this.layout[this.activeIndex]
            )
        ) {
            this.clear();
            this.colPosition--;
            this.draw();
        }
    }

    moveRight() {
        if (
            !this.checkCollision(
                this.rowPosition,
                this.colPosition + 1,
                this.layout[this.activeIndex]
            )
        ) {
            this.clear();
            this.colPosition++;
            this.draw();
        }
    }

    moveDown() {
        if (
            !this.checkCollision(
                this.rowPosition + 1,
                this.colPosition,
                this.layout[this.activeIndex]
            )
        ) {
            this.clear();
            this.rowPosition++;
            this.draw();
            return;
        }

        this.handleLand();
        generateNewBrick();
    }

    rotate() {
        if (
            !this.checkCollision(
                this.rowPosition,
                this.colPosition,
                this.layout[(this.activeIndex + 1) % 4]
            )
        ) {
            this.clear();
            this.activeIndex = (this.activeIndex + 1) % 4;
            this.draw();
        }
    }

    checkCollision(nextRow, nextCol, nextLayout) {
        for (let row = 0; row < nextLayout.length; row++) {
            for (let col = 0; col < nextLayout[0].length; col++) {
                if (nextLayout[row][col] != WHITE_COLOR_ID && nextRow >= 0) {
                    if (
                        col + nextCol < 0 ||
                        col + nextCol >= DEFAULT_COLS ||
                        row + nextRow >= DEFAULT_ROWS ||
                        board.grid[row + nextRow][col + nextCol] !==
                            WHITE_COLOR_ID
                    ) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    handleLand() {
        if (this.rowPosition <= 0) {
            board.handleGameOver();
            return;
        }
        for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (
                let col = 0;
                col < this.layout[this.activeIndex][0].length;
                col++
            ) {
                if (this.layout[this.activeIndex][row][col] != WHITE_COLOR_ID) {
                    board.grid[row + this.rowPosition][col + this.colPosition] =
                        this.id;
                }
            }
        }
        board.handleCompleteRows();
        board.drawBoard();
    }
}

function generateNewBrick() {
    brick = new Brick(Math.floor(Math.random() * 10) % BRICK_LAYOUT.length);
}

board = new Board(canvasContext);
board.drawBoard();

document.getElementById("play").addEventListener("click", () => {
    board.reset();

    board.isPlaying = true;
    generateNewBrick();
    const refresh = setInterval(() => {
        if (!board.gameOver && board.isPlaying) {
            brick.moveDown();
        } else {
            clearInterval(refresh);
        }
    }, 1000);
});

document.getElementById("pause").addEventListener("click", () => {
    board.isPlaying = !board.isPlaying;
    console.log("pause");
});

document.addEventListener("keydown", (e) => {
    if (!board.gameOver && board.isPlaying)
        switch (e.code) {
            case "KeyW":
            case "ArrowUp":
                brick.rotate();
                break;
            case "KeyA":
            case "ArrowLeft":
                brick.moveLeft();
                break;
            case "KeyD":
            case "ArrowRight":
                brick.moveRight();
                break;
            case "KeyS":
            case "ArrowDown":
                brick.moveDown();
                break;
            default:
                break;
        }
});
