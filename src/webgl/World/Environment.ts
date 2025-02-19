import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import Experience from "../Experience.ts";

export default class Environment {
  experience: Experience;
  scene: THREE.Scene;
  directionalLight!: THREE.DirectionalLight;
  rgbeLoader: RGBELoader;

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.rgbeLoader = new RGBELoader();

    // Setup
    this.setDirectionalLight();
    this.setEnvironmentMap();
  }

  setDirectionalLight() {
    this.directionalLight = new THREE.DirectionalLight("#ffffff", 1);
    this.directionalLight.castShadow = true;
    this.directionalLight.target.position.set(0, 4, 0);
    this.directionalLight.shadow.camera.far = 15;
    this.directionalLight.shadow.mapSize.set(2048, 2048);
    this.directionalLight.position.set(4, 6.2, 2.5);
    this.directionalLight.shadow.normalBias = -0.013;
    this.directionalLight.shadow.bias = -0.004;
    this.scene.add(this.directionalLight);
  }

  setEnvironmentMap() {
    this.rgbeLoader.load("./envmap/envmap.hdr", (environmentMap) => {
      environmentMap.mapping = THREE.EquirectangularReflectionMapping;
      this.scene.environment = environmentMap;
    });
  }
}
