import * as THREE from "three";

export default class ObjectDoubled {
  modelA: THREE.Object3D;
  modelB: THREE.Object3D;
  group: THREE.Object3D;
  x: number;
  y: number;
  z: number;

  constructor() {
    this.modelA = new THREE.Object3D();
    this.modelB = new THREE.Object3D();
    this.group = new THREE.Group();
    this.x = 0;
    this.y = 0;
    this.z = 0;
  }

  setModels(model: THREE.Object3D, x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.modelA = model;
    this.modelB = model.clone();
    this.group.add(this.modelA, this.modelB);
    this.positionX();
    this.positionY();
    this.positionZ();
  }

  positionX(x = 0) {
    this.x = x;
    this.modelA.position.x = this.x;
    this.modelB.position.x = -this.x;
  }

  positionY(y = 0) {
    this.y = y;
    this.modelA.position.y = this.y;
    this.modelB.position.y = -this.y;
  }

  positionZ(z = 0) {
    this.z = z;
    this.modelA.position.z = this.z;
    this.modelB.position.z = -this.z;
  }
}
