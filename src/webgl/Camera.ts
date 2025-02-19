import Experience from "./Experience.ts";
import Sizes from "./Sizes.ts";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// this.camera = new THREE.PerspectiveCamera(
//   75,
//   this.sizes.width / this.sizes.height,
//   0.1,
//   100
// );
// this.camera.position.set(-1.16, this.height + 0.5, -0.8);
// this.scene.add(this.camera);

// // Controls
// this.controls = new OrbitControls(this.camera, this.canvas);
// this.controls.target.y = this.height;
// this.controls.enableDamping = true;
// this.controls.maxPolarAngle = Math.PI / 2;
// this.controls.minDistance = 0.5;
// this.controls.maxDistance = 4;

export default class Camera {
  experience: Experience;
  sizes: Sizes;
  scene: THREE.Scene;
  canvas: HTMLCanvasElement;
  instance!: THREE.PerspectiveCamera;
  controls!: OrbitControls;

  constructor() {
    this.experience = new Experience();
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.setInstance();
    this.setOrbitControls();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.instance.position.set(-1.16, this.experience.height + 0.5, -0.8);
    this.scene.add(this.instance);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.target.y = this.experience.height;
    this.controls.enableDamping = true;
    this.controls.maxPolarAngle = Math.PI / 2;
    this.controls.minDistance = 0.5;
    this.controls.maxDistance = 4;
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
