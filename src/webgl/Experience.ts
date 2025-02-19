import * as THREE from "three";
import "../App.css";
import Sizes from "./Sizes.ts";
import Camera from "./Camera.ts";
import Renderer from "./Renderer.ts";
import World from "./World/World.ts";
import sources from "../sources.ts";

let instance: Experience | null = null;

export default class Experience {
  webGLContainer!: HTMLElement;
  canvas!: HTMLCanvasElement;
  sizes!: Sizes;
  scene!: THREE.Scene;
  camera!: Camera;
  renderer!: Renderer;
  world!: World;
  startTime = 0;

  dimensionsScale!: number;
  width!: number;
  height!: number;
  depth!: number;
  dimensions!: {
    thickness: number;
    thicknessWidth: number;
    minWidth: number;
    minDepth: number;
    minHeight: number;
    maxWidth: number;
    maxDepth: number;
    maxHeight: number;
    maxDepthMorph: number;
  };
  materialName!: string;
  dataMaterials!: {
    id: number;
    name: string;
    color: string;
    url: string;
  }[];
  dataLegs!: {
    id: number;
    name: string;
    url: string;
  }[];
  dataTableProps!: {
    id: number;
    name: string;
    url: string;
  }[];

  constructor() {
    // Singlton
    if (instance) {
      return instance;
    }
    instance = this;
  }

  start(webGLContainer: HTMLElement) {
    // console.log("experience starts");
    this.startTime = Date.now();

    this.webGLContainer = webGLContainer;
    this.canvas = document.createElement("canvas");
    this.webGLContainer.appendChild(this.canvas);

    // Sources setup
    this.dimensionsScale = 1000;
    this.dimensions = sources.dimensions;
    this.dataMaterials = sources.dataMaterials;
    this.dataTableProps = sources.dataTableProps;
    this.dataLegs = sources.dataLegs;

    this.dimensions = {
      minWidth: this.dimensions.minWidth / this.dimensionsScale,
      maxWidth: this.dimensions.maxWidth / this.dimensionsScale,
      minDepth: this.dimensions.minDepth / this.dimensionsScale,
      maxDepth: this.dimensions.maxDepth / this.dimensionsScale,
      minHeight: this.dimensions.minHeight / this.dimensionsScale,
      maxHeight: this.dimensions.maxHeight / this.dimensionsScale,
      maxDepthMorph: this.dimensions.maxDepthMorph / this.dimensionsScale,
      thickness: this.dimensions.thickness / this.dimensionsScale,
      thicknessWidth: this.dimensions.thicknessWidth / this.dimensionsScale,
    };

    // Table variables
    this.width = this.dimensions.minWidth;
    this.depth = this.dimensions.minDepth;
    this.height = this.dimensions.minHeight;

    // webGL scene setup
    this.sizes = new Sizes();
    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();

    window.addEventListener("resize", () => {
      this.onResize();
    });

    // Animation function
    window.requestAnimationFrame(() => this.tick());
  }

  tick() {
    this.camera.controls.update();
    this.renderer.update();
    window.requestAnimationFrame(() => this.tick());
  }

  updateDimensions(
    width = this.width,
    depth = this.depth,
    height = this.height
  ) {
    this.width = width / this.dimensionsScale;
    this.depth = depth / this.dimensionsScale;
    this.height = height / this.dimensionsScale;

    if (
      this.width >= this.dimensions.minWidth &&
      this.width <= this.dimensions.maxWidth &&
      this.depth >= this.dimensions.minDepth &&
      this.depth <= this.dimensions.maxDepth &&
      this.height >= this.dimensions.minHeight &&
      this.height <= this.dimensions.maxHeight
    ) {
      this.world.models.updateDimensions();
    }
  }

  updateMaterial(materialName: string) {
    this.materialName = materialName;
    this.world.models.updateMaterial(materialName);
  }

  updateTableProp(tablePropName: string) {
    this.world.models.updateTableProp(tablePropName);
  }

  onResize() {
    this.sizes.sizesUpdate();
    this.camera.resize();
    this.renderer.resize();
  }

  dispose() {
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        for (const key in child.material) {
          const value = child.material[key];
          if (value && typeof value.dispose === "function") {
            value.dispose();
          }
        }
      }
    });

    window.removeEventListener("resize", () => {
      this.onResize();
    });

    this.camera.controls.dispose();
    this.renderer.instance.dispose();

    if (this.webGLContainer.firstChild)
      this.webGLContainer.removeChild(this.webGLContainer.firstChild);
  }
}
