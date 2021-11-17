import run from "aocrunner";
const parseInput = (rawInput) => rawInput.split("\n").map((claim) => {
  const [id, _, coord, mesures] = claim.split(" ");
  const [x, y] = coord.replace(":", "").split(",");
  const [width, height] = mesures.split("x");
  return {
    id: parseInt(id.replace("#", "")),
    x: parseInt(x),
    y: parseInt(y),
    width: parseInt(width),
    height: parseInt(height)
  };
});
const makeFabric = (input) => {
  const fabric = [];
  input.forEach((claim) => {
    for (let x = claim.x; x < claim.x + claim.width; x++) {
      for (let y = claim.y; y < claim.y + claim.height; y++) {
        if (!fabric[x]) {
          fabric[x] = [];
        }
        if (!fabric[x][y]) {
          fabric[x][y] = [];
        }
        fabric[x][y].push(claim.id);
      }
    }
  });
  return fabric;
};
const checkClaim = (claim, fabric) => {
  let intact = true;
  for (let x = claim.x; x < claim.x + claim.width; x++) {
    for (let y = claim.y; y < claim.y + claim.height; y++) {
      if (fabric[x][y].length > 1) {
        intact = false;
      }
    }
  }
  return intact;
};
const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const fabric = makeFabric(input);
  return fabric.reduce((acc, row) => {
    return row.filter((ids) => ids.length > 1).length + acc;
  }, 0);
};
const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const fabric = makeFabric(input);
  return input.find((claim) => checkClaim(claim, fabric)).id;
};
run({
  part1: {
    tests: [],
    solution: part1
  },
  part2: {
    tests: [],
    solution: part2
  },
  trimTestInputs: true
});
//# sourceMappingURL=index.js.map
