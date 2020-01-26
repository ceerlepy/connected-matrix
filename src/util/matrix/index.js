export default class Matrix {
  constructor(n, m) {
    this.numrows = n;
    this.numcolumns = m;
    this.generateMatrix();
  }

  generateMatrix() {
    var rows = [];
    for (var j = 0; j < this.numrows; j++) {
      var columns = [];
      for (var i = 0; i < this.numcolumns; i++) {
        columns.push({
          val: Math.round(Math.random()),
          visited: false
        });
      }
      rows.push(columns);
    }
    this.grid = rows;
  }

  getGrid = () => {
    return this.grid;
  };

  iterate = callback => {
    this.grid.forEach((subArr, i) => {
      subArr.forEach((subArrItem, j) => {
        callback(subArrItem, i, j);
      });
    });
  };

  findConnectedNeighbour = (i, j, collection) => {
    // since we are visiting, i,j lets put visited true
    this.grid[i][j].visited = true;
    collection.push({
      x: i,
      y: j
    });

    //Left
    let canWeGoLeft =
      j - 1 >= 0 &&
      this.grid[i][j - 1].visited === false &&
      this.grid[i][j - 1].val === 1;
    if (canWeGoLeft) {
      this.findConnectedNeighbour(i, j - 1, collection);
    }
    //Right
    let canWeGoRight =
      j + 1 <= this.numcolumns - 1 &&
      this.grid[i][j + 1].visited === false &&
      this.grid[i][j + 1].val === 1;
    if (canWeGoRight) {
      this.findConnectedNeighbour(i, j + 1, collection);
    }
    //UP
    let canWeGoUp =
      i - 1 >= 0 &&
      this.grid[i - 1][j].visited === false &&
      this.grid[i - 1][j].val === 1;
    if (canWeGoUp) {
      this.findConnectedNeighbour(i - 1, j, collection);
    }
    //Down
    let canWeGoDown =
      i + 1 <= this.numrows - 1 &&
      this.grid[i + 1][j].visited === false &&
      this.grid[i + 1][j].val === 1;
    if (canWeGoDown) {
      this.findConnectedNeighbour(i + 1, j, collection);
    }
  };

  resolveMatrix = () => {
    let compMap = new Map();

    this.iterate((cell, i, j) => {
      if (cell.visited === false) {
        cell.visited = true;
        if (cell.val === 1) {
          let island = [];
          this.findConnectedNeighbour(i, j, island);
          compMap.set(`${i},${j}`, island);
          island.forEach(item => {
            this.grid[item.x][item.y].visited = false;
          });
        }
      }
    });

    console.log(compMap);
    return compMap;
  };
}
