import * as MiniZinc from 'minizinc';
import {waitForAsync} from "@angular/core/testing";

export class Puzzle {
  model: MiniZinc.Model = new MiniZinc.Model();
  modelFileContent: any;
  modelName: any;

  constructor(modelFile: string) {
    this.modelName = modelFile

    fetch("http://localhost:4200/assets/" + modelFile).then(
      res => res.text()
    ).then(
      data => {
        // console.log(data)
        this.modelName = modelFile
        this.modelFileContent = data
        this.initModel(modelFile, data);
      }
    );
  }

  initModel(name: string, fileContent: string) {
    // console.log(fileContent)
    this.model.addFile(name, fileContent);
  }

   solveModel(){
    let solution : string = ""
    const solve = this.model.solve({
      options: {
        solver: 'gecode',
        'all-solutions': true,
      }
    });
    solve.then(result => {
        // console.log(result.solution);
        JSON.stringify(result.solution);
    });
  }

  addString(param: string) {
    this.model.addString(param)
  }
  async getSolution(): Promise<any> {
    return  this.solveModel();
  }

}
