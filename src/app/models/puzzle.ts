import * as MiniZinc from 'minizinc';

export class Puzzle {
  model: MiniZinc.Model = new MiniZinc.Model();
  solution: any;

  constructor(modelName: string, modelContent: string) {
    // console.log("name : " + modelName + ", content : " + modelContent)
    this.initModel(modelName, modelContent);
  }

  initModel(name: string, content: string) {
    // console.log(fileContent)
    this.model.addFile(name, content);
  }

  async solveModel() {
    const solve = this.model.solve({
      options: {
        solver: 'gecode',
        'all-solutions': true,
      }
    });
    solve.then(result => {
      console.log("Solved !");
      console.log(result);
    });
    return solve;
  }

  addString(param: string) {
    this.model.addString(param)
  }

}
