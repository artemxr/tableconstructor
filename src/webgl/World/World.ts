import Environment from "./Environment.ts";
import Models from "./Models.ts";

export default class World {
  environment: Environment;
  models: Models;

  constructor() {
    this.environment = new Environment();
    this.models = new Models();

    // should update after all scene loaded due to update function
    // this.environment = new Environment(this.global);
  }
  update() {
    // this.models.update();
  }
}
