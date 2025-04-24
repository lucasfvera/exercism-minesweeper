//
// This is only a SKELETON file for the 'Minesweeper' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

const MINE_CHARACTER = '*';

/**
 * Checks if there is a mine to the right of the provided coordinates in the
 * provided board.
 *
 * @param {[string]} board
 * @param {{x: number, y: number}} selectedBox
 * @returns {boolean} `true` if there is a mine in the right box of the board, `false` otherwise
 */
const checkRight = (board, selectedBox) => {
	const row = board[selectedBox.y];
	if (selectedBox.x === row.length - 1) return false;

	const inspectedBox = row[selectedBox.x + 1];

	return inspectedBox === MINE_CHARACTER;
};

/**
 * Checks if there is a mine to the left of the provided coordinates in the
 * provided board.
 *
 * @param {[string]} board
 * @param {{x: number, y: number}} selectedBox
 * @returns {boolean} `true` if there is a mine, `false` otherwise
 */
const checkLeft = (board, selectedBox) => {
	const row = board[selectedBox.y];
	if (selectedBox.x === 0) return false;

	const inspectedBox = row[selectedBox.x - 1];

	return inspectedBox === MINE_CHARACTER;
};

/**
 * Checks if there is a mine down of the provided coordinates in the
 * provided board.
 *
 * @param {[string]} board
 * @param {{x: number, y: number}} selectedBox
 * @returns {boolean} `true` if there is a mine, `false` otherwise
 */
const checkDown = (board, selectedBox) => {
	if (selectedBox.y === board.length - 1) return false;
	const row = board[selectedBox.y + 1];

	const inspectedBox = row[selectedBox.x];

	return inspectedBox === MINE_CHARACTER;
};

/**
 * Checks if there is a mine up of the provided coordinates in the
 * provided board.
 *
 * @param {[string]} board
 * @param {{x: number, y: number}} selectedBox
 * @returns {boolean} `true` if there is a mine, `false` otherwise
 */
const checkUp = (board, selectedBox) => {
	if (selectedBox.y === 0) return false;
	const row = board[selectedBox.y - 1];

	const inspectedBox = row[selectedBox.x];

	return inspectedBox === MINE_CHARACTER;
};

/**
 * Checks if there is a mine to the right-up of the provided coordinates in the
 * provided board.
 *
 * @param {[string]} board
 * @param {{x: number, y: number}} selectedBox
 * @returns {boolean} `true` if there is a mine, `false` otherwise
 */
const checkRightUp = (board, selectedBox) => {
	const row = board[selectedBox.y];

	if (selectedBox.y === 0) return false;
	if (selectedBox.x === row.length - 1) return false;

	const inspectedRow = board[selectedBox.y - 1];
	const inspectedBox = inspectedRow[selectedBox.x + 1];

	return inspectedBox === MINE_CHARACTER;
};

/**
 * Checks if there is a mine to the left-up of the provided coordinates in the
 * provided board.
 *
 * @param {[string]} board
 * @param {{x: number, y: number}} selectedBox
 * @returns {boolean} `true` if there is a mine, `false` otherwise
 */
const checkLeftUp = (board, selectedBox) => {
	const row = board[selectedBox.y];

	if (selectedBox.y === 0) return false;
	if (selectedBox.x === 0) return false;

	const inspectedRow = board[selectedBox.y - 1];
	const inspectedBox = inspectedRow[selectedBox.x - 1];

	return inspectedBox === MINE_CHARACTER;
};

/**
 * Checks if there is a mine to the right-down of the provided coordinates in the
 * provided board.
 *
 * @param {[string]} board
 * @param {{x: number, y: number}} selectedBox
 * @returns {boolean} `true` if there is a mine, `false` otherwise
 */
const checkRightDown = (board, selectedBox) => {
	const row = board[selectedBox.y];

	if (selectedBox.y === board.length - 1) return false;
	if (selectedBox.x === row.length - 1) return false;

	const inspectedRow = board[selectedBox.y + 1];
	const inspectedBox = inspectedRow[selectedBox.x + 1];

	return inspectedBox === MINE_CHARACTER;
};

/**
 * Checks if there is a mine to the left-down of the provided coordinates in the
 * provided board.
 *
 * @param {[string]} board
 * @param {{x: number, y: number}} selectedBox
 * @returns {boolean} `true` if there is a mine, `false` otherwise
 */
const checkLeftDown = (board, selectedBox) => {
	const row = board[selectedBox.y];

	if (selectedBox.y === board.length - 1) return false;
	if (selectedBox.x === 0) return false;

	const inspectedRow = board[selectedBox.y + 1];
	const inspectedBox = inspectedRow[selectedBox.x - 1];

	return inspectedBox === MINE_CHARACTER;
};

const checkers = {
	right: checkRight,
	left: checkLeft,
	up: checkUp,
	down: checkDown,
	rightUp: checkRightUp,
	rightDown: checkRightDown,
	leftUp: checkLeftUp,
	leftDown: checkLeftDown,
};

/**
 *
 * @param {[string]} board
 * @returns
 */
export const annotate = (board) => {
	const result = [];

	for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
		let rowResult = '';
		const selectedRow = board[rowIndex];

		for (
			let columnIndex = 0;
			columnIndex < selectedRow.length;
			columnIndex++
		) {
			let numberOfMines = 0;
			const element = selectedRow[columnIndex];
			if (element === MINE_CHARACTER) {
				rowResult += element;
			} else {
				for (let position in checkers) {
					if (
						checkers[position](board, {
							x: columnIndex,
							y: rowIndex,
						})
					) {
						numberOfMines++;
					}
				}
				numberOfMines > 0
					? (rowResult += numberOfMines)
					: (rowResult += ' ');
			}
		}

		result.push(rowResult);
	}

	return result;
};
