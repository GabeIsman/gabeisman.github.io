export default class Matrix {
  data: Array<Array<any>>;

  constructor(data: Array<Array<any>>) {
    if (!Array.isArray(data) || !data.every(Array.isArray)) {
      throw new TypeError("Data must be a 2D array.");
    }

    if (!data.every((subArray) => subArray.length === data[0].length)) {
      throw new Error("All rows in the matrix must have the same length.");
    }

    this.data = data;
  }

  transpose(): Matrix {
    const newData: Array<Array<any>> = [];
    for (let i = 0; i < this.data[0].length; i++) {
      newData[i] = [];
      for (let j = 0; j < this.data.length; j++) {
        newData[i][j] = this.data[j][i];
      }
    }

    return new Matrix(newData);
  }
}
