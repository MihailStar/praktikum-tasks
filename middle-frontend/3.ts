// prettier-ignore
const keyboard = [
  [['1'], ['2', 'a', 'b', 'c'], ['3', 'd', 'e', 'f']],
  [['4', 'g', 'h', 'i'], ['5', 'j', 'k', 'l'], ['6', 'm', 'n', 'o']],
  [['7', 'p', 'q', 'r', 's'], ['8', 't', 'u', 'v'], ['9', 'w', 'x', 'y', 'z']],
  [['*'], ['0'], ['#']],
];

type Coordinate = { y: number; x: number };

const symbolToCoordinate: Map<string, Coordinate & { i: number }> = new Map();

for (let y = 0; y < keyboard.length; y += 1) {
  const row = keyboard[y];

  for (let x = 0; x < row.length; x += 1) {
    const button = row[x];

    for (let i = 0; i < button.length; i += 1) {
      symbolToCoordinate.set(button[i], { y, x, i });
    }
  }
}

function isCoordinatesEqual(a: Coordinate, b: Coordinate): boolean {
  return a.y === b.y && a.x === b.x;
}

/** ```[`top`, `right`, `bottom`, `left`]``` */
function getCoordinatesAround<T>(
  matrix: T[][],
  center: Coordinate,
  isCyclical = false,
): Coordinate[] {
  if (isCyclical) {
    return [
      center.y === 0
        ? { y: matrix.length - 1, x: center.x }
        : { y: center.y - 1, x: center.x },
      center.x === matrix[center.y].length - 1
        ? { y: center.y, x: 0 }
        : { y: center.y, x: center.x + 1 },
      center.y === matrix.length - 1
        ? { y: 0, x: center.x }
        : { y: center.y + 1, x: center.x },
      center.x === 0
        ? { y: center.y, x: matrix[center.y].length - 1 }
        : { y: center.y, x: center.x - 1 },
    ];
  }

  return [
    center.y === 0 ? null : { y: center.y - 1, x: center.x },
    center.x === matrix[center.y].length - 1
      ? null
      : { y: center.y, x: center.x + 1 },
    center.y === matrix.length - 1 ? null : { y: center.y + 1, x: center.x },
    center.x === 0 ? null : { y: center.y, x: center.x - 1 },
  ].filter((coordinate): coordinate is Coordinate => coordinate !== null);
}

const testField = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
console.assert(
  JSON.stringify(getCoordinatesAround(testField, { y: 0, x: 0 })) ===
    JSON.stringify([
      { y: 0, x: 1 },
      { y: 1, x: 0 },
    ]),
);
console.assert(
  JSON.stringify(getCoordinatesAround(testField, { y: 0, x: 1 })) ===
    JSON.stringify([
      { y: 0, x: 2 },
      { y: 1, x: 1 },
      { y: 0, x: 0 },
    ]),
);
console.assert(
  JSON.stringify(getCoordinatesAround(testField, { y: 0, x: 2 })) ===
    JSON.stringify([
      { y: 1, x: 2 },
      { y: 0, x: 1 },
    ]),
);
console.assert(
  JSON.stringify(getCoordinatesAround(testField, { y: 1, x: 0 })) ===
    JSON.stringify([
      { y: 0, x: 0 },
      { y: 1, x: 1 },
      { y: 2, x: 0 },
    ]),
);
console.assert(
  JSON.stringify(getCoordinatesAround(testField, { y: 1, x: 1 })) ===
    JSON.stringify([
      { y: 0, x: 1 },
      { y: 1, x: 2 },
      { y: 2, x: 1 },
      { y: 1, x: 0 },
    ]),
);
console.assert(
  JSON.stringify(getCoordinatesAround(testField, { y: 1, x: 2 })) ===
    JSON.stringify([
      { y: 0, x: 2 },
      { y: 2, x: 2 },
      { y: 1, x: 1 },
    ]),
);
console.assert(
  JSON.stringify(getCoordinatesAround(testField, { y: 2, x: 0 })) ===
    JSON.stringify([
      { y: 1, x: 0 },
      { y: 2, x: 1 },
    ]),
);
console.assert(
  JSON.stringify(getCoordinatesAround(testField, { y: 2, x: 1 })) ===
    JSON.stringify([
      { y: 1, x: 1 },
      { y: 2, x: 2 },
      { y: 2, x: 0 },
    ]),
);
console.assert(
  JSON.stringify(getCoordinatesAround(testField, { y: 2, x: 2 })) ===
    JSON.stringify([
      { y: 1, x: 2 },
      { y: 2, x: 1 },
    ]),
);
console.assert(
  JSON.stringify(getCoordinatesAround(testField, { y: 0, x: 0 }, true)) ===
    JSON.stringify([
      { y: 2, x: 0 },
      { y: 0, x: 1 },
      { y: 1, x: 0 },
      { y: 0, x: 2 },
    ]),
);
console.assert(
  JSON.stringify(getCoordinatesAround(testField, { y: 0, x: 1 }, true)) ===
    JSON.stringify([
      { y: 2, x: 1 },
      { y: 0, x: 2 },
      { y: 1, x: 1 },
      { y: 0, x: 0 },
    ]),
);
console.assert(
  JSON.stringify(getCoordinatesAround(testField, { y: 0, x: 2 }, true)) ===
    JSON.stringify([
      { y: 2, x: 2 },
      { y: 0, x: 0 },
      { y: 1, x: 2 },
      { y: 0, x: 1 },
    ]),
);
console.assert(
  JSON.stringify(getCoordinatesAround(testField, { y: 1, x: 0 }, true)) ===
    JSON.stringify([
      { y: 0, x: 0 },
      { y: 1, x: 1 },
      { y: 2, x: 0 },
      { y: 1, x: 2 },
    ]),
);
console.assert(
  JSON.stringify(getCoordinatesAround(testField, { y: 1, x: 1 }, true)) ===
    JSON.stringify([
      { y: 0, x: 1 },
      { y: 1, x: 2 },
      { y: 2, x: 1 },
      { y: 1, x: 0 },
    ]),
);
console.assert(
  JSON.stringify(getCoordinatesAround(testField, { y: 1, x: 2 }, true)) ===
    JSON.stringify([
      { y: 0, x: 2 },
      { y: 1, x: 0 },
      { y: 2, x: 2 },
      { y: 1, x: 1 },
    ]),
);
console.assert(
  JSON.stringify(getCoordinatesAround(testField, { y: 2, x: 0 }, true)) ===
    JSON.stringify([
      { y: 1, x: 0 },
      { y: 2, x: 1 },
      { y: 0, x: 0 },
      { y: 2, x: 2 },
    ]),
);
console.assert(
  JSON.stringify(getCoordinatesAround(testField, { y: 2, x: 1 }, true)) ===
    JSON.stringify([
      { y: 1, x: 1 },
      { y: 2, x: 2 },
      { y: 0, x: 1 },
      { y: 2, x: 0 },
    ]),
);
console.assert(
  JSON.stringify(getCoordinatesAround(testField, { y: 2, x: 2 }, true)) ===
    JSON.stringify([
      { y: 1, x: 2 },
      { y: 2, x: 0 },
      { y: 0, x: 2 },
      { y: 2, x: 1 },
    ]),
);

/** @throws {Error} */
function getStepsBetween<T>(
  matrix: T[][],
  a: Coordinate,
  b: Coordinate,
): number {
  if (isCoordinatesEqual(a, b)) {
    return 0;
  }

  const keyboardTemplate = matrix.map((row) => row.map(() => -1));
  const queue = [
    { arounds: getCoordinatesAround(matrix, a, true), counter: 1 },
  ];

  keyboardTemplate[a.y][a.x] = 0;

  while (queue.length > 0) {
    const { arounds, counter } = queue.pop()!;

    for (let i = 0; i < arounds.length; i += 1) {
      const around = arounds[i];

      if (keyboardTemplate[around.y][around.x] >= 0) {
        continue;
      }

      keyboardTemplate[around.y][around.x] = counter;

      if (isCoordinatesEqual(around, b)) {
        return counter;
      }

      queue.unshift({
        arounds: getCoordinatesAround(keyboard, around, true),
        counter: counter + 1,
      });
    }
  }

  throw new Error();
}

/** @throws {RangeError} */
export function mobileRemote(string: string): number {
  const startChar = '1';
  let from = symbolToCoordinate.get(startChar)!;
  let result = 0;

  for (let i = 0; i < string.length; i += 1) {
    const currentChar = string[i];
    const current = symbolToCoordinate.get(currentChar);

    if (current === undefined) {
      throw new RangeError();
    }

    result += getStepsBetween(keyboard, from, current);
    result += 1;
    result += current.i;
    result += 1;

    from = current;
  }

  return result;
}
