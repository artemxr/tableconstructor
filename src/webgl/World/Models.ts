import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import Experience from "../Experience.ts";

export default class Models {
  experience: Experience;
  scene: THREE.Scene;
  loadingManager: THREE.LoadingManager;
  gltfLoader: GLTFLoader;
  floor!: THREE.Mesh<
    THREE.PlaneGeometry,
    THREE.MeshStandardMaterial,
    THREE.Object3DEventMap
  >;
  table!: THREE.Mesh<
    THREE.BoxGeometry,
    THREE.MeshStandardMaterial,
    THREE.Object3DEventMap
  >;
  width: number;
  depth: number;
  height: number;
  dimensions: {
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
  dataLegs!: {
    id: number;
    name: string;
    url: string;
  }[];
  legs!: {
    legLeft: THREE.Object3D<THREE.Object3DEventMap>;
    legRight: THREE.Object3D<THREE.Object3DEventMap>;
  };
  dataTableProps!: {
    id: number;
    name: string;
    url: string;
  }[];
  prop1!: {
    leftA: THREE.Object3D<THREE.Object3DEventMap>;
    leftB: THREE.Object3D<THREE.Object3DEventMap>;
    rightA: THREE.Object3D<THREE.Object3DEventMap>;
    rightB: THREE.Object3D<THREE.Object3DEventMap>;
  };
  prop2!: {
    leftA: THREE.Object3D<THREE.Object3DEventMap>;
    leftB: THREE.Object3D<THREE.Object3DEventMap>;
    rightA: THREE.Object3D<THREE.Object3DEventMap>;
    rightB: THREE.Object3D<THREE.Object3DEventMap>;
  };
  propGroup1!: THREE.Group<THREE.Object3DEventMap>;
  propGroup2!: THREE.Group<THREE.Object3DEventMap>;

  dataMaterials: { id: number; name: string; color: string; url: string }[];
  materials!: {
    id: number;
    name: string;
    material: THREE.MeshStandardMaterial;
  }[];
  materialName!: string;

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.loadingManager = new THREE.LoadingManager(() => {
      console.log(
        "Loaded in",
        (Date.now() - this.experience.startTime) / 1000,
        "sec"
      );
    });
    this.gltfLoader = new GLTFLoader(this.loadingManager);

    this.width = this.experience.width;
    this.depth = this.experience.depth;
    this.height = this.experience.height;
    this.dimensions = this.experience.dimensions;
    this.dataMaterials = this.experience.dataMaterials;
    this.materialName = this.experience.materialName;
    this.dataTableProps = this.experience.dataTableProps;
    this.dataLegs = this.experience.dataLegs;

    this.setFloor();
    this.setTable();
    this.setLegs();
    this.setProps();
    this.setMaterials();
  }

  updateShadows(model: THREE.Object3D) {
    model.traverse((child) => {
      if (
        child instanceof THREE.Mesh &&
        child.material instanceof THREE.MeshStandardMaterial
      ) {
        child.material.envMapIntensity = 0.33;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }

  setFloor() {
    this.floor = new THREE.Mesh(
      new THREE.PlaneGeometry(80, 80),
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xbababa),
      })
    );
    this.floor.rotation.x = -Math.PI * 0.5;
    this.updateShadows(this.floor);
    this.scene.add(this.floor);
  }

  setTable() {
    this.table = new THREE.Mesh(
      new THREE.BoxGeometry(
        this.depth - this.dimensions.thickness,
        this.dimensions.thicknessWidth,
        this.width
      ),
      new THREE.MeshStandardMaterial({
        roughness: 0.3,
      })
    );
    this.table.position.y = this.height;
    this.updateShadows(this.table);
    this.scene.add(this.table);
  }

  setLegs() {
    this.legs = {
      legLeft: new THREE.Object3D(),
      legRight: new THREE.Object3D(),
    };
    this.gltfLoader.load(this.dataLegs[0].url, (gltf) => {
      this.updateShadows(gltf.scene);
      this.legs.legLeft = gltf.scene;
      this.legs.legRight = gltf.scene.clone();
      this.legs.legRight.rotateY(Math.PI);
      this.setPositionLegs();
      this.scene.add(this.legs.legLeft, this.legs.legRight);
    });
  }

  setPositionLegs() {
    this.legs.legRight.position.z =
      (this.width - this.dimensions.thicknessWidth) / 2;
    this.legs.legLeft.position.z = -this.legs.legRight.position.z;
    this.legs.legRight.position.x = (this.depth - this.dimensions.minDepth) / 2;
    this.legs.legLeft.position.x = -this.legs.legRight.position.x;
  }

  setDepthHeightLegs() {
    // normalize max morphing
    const normDepth =
      (this.depth - this.dimensions.minDepth) /
      (this.dimensions.maxDepthMorph - this.dimensions.minDepth);

    const normHeight =
      (this.height - this.dimensions.minHeight) /
      (this.dimensions.maxHeight - this.dimensions.minHeight);

    this.legs.legLeft.traverse((child) => {
      if (
        child instanceof THREE.Mesh &&
        child.morphTargetInfluences &&
        child.morphTargetInfluences.length == 2
      ) {
        child.morphTargetInfluences[0] = normDepth;
        child.morphTargetInfluences[1] = normHeight;
        // console.log(child.morphTargetInfluences.length);
      }
    });
    this.legs.legRight.traverse((child) => {
      if (
        child instanceof THREE.Mesh &&
        child.morphTargetInfluences &&
        child.morphTargetInfluences.length == 2
      ) {
        child.morphTargetInfluences[0] = normDepth;
        child.morphTargetInfluences[1] = normHeight;
      }
    });
  }

  setProps() {
    this.prop1 = {
      leftA: new THREE.Object3D(),
      leftB: new THREE.Object3D(),
      rightA: new THREE.Object3D(),
      rightB: new THREE.Object3D(),
    };

    this.propGroup1 = new THREE.Group();

    this.prop2 = {
      leftA: new THREE.Object3D(),
      leftB: new THREE.Object3D(),
      rightA: new THREE.Object3D(),
      rightB: new THREE.Object3D(),
    };

    this.propGroup2 = new THREE.Group();

    this.gltfLoader.load(this.dataTableProps[0].url, (gltf) => {
      this.updateShadows(gltf.scene);
      this.prop1.leftA = gltf.scene;
      this.prop1.leftB = gltf.scene.clone();
      this.prop1.rightA = gltf.scene.clone();
      this.prop1.rightB = gltf.scene.clone();
      this.propGroup1.add(
        this.prop1.leftA,
        this.prop1.leftB,
        this.prop1.rightA,
        this.prop1.rightB
      );
      this.setPositionProps(this.prop1);
      this.scene.add(this.propGroup1);
    });

    this.gltfLoader.load(this.dataTableProps[1].url, (gltf) => {
      this.updateShadows(gltf.scene);
      this.prop2.leftA = gltf.scene;
      this.prop2.leftB = gltf.scene.clone();
      this.prop2.rightA = gltf.scene.clone();
      this.prop2.rightB = gltf.scene.clone();
      this.propGroup2.add(
        this.prop2.leftA,
        this.prop2.leftB,
        this.prop2.rightA,
        this.prop2.rightB
      );
      this.setPositionProps(this.prop2);
      this.setPropInvisible(this.propGroup2);
      this.scene.add(this.propGroup2);
    });
  }

  setPositionProps(prop: {
    leftA: THREE.Object3D;
    leftB: THREE.Object3D;
    rightA: THREE.Object3D;
    rightB: THREE.Object3D;
  }) {
    prop.leftA.position.z = -(this.width - this.dimensions.thicknessWidth) / 2;
    prop.leftB.position.z = prop.leftA.position.z;
    prop.rightA.position.z = (this.width - this.dimensions.thicknessWidth) / 2;
    prop.rightB.position.z = prop.rightA.position.z;

    prop.leftA.position.x = -this.depth / 2 + this.dimensions.thicknessWidth;
    prop.rightA.position.x = prop.leftA.position.x;
    prop.leftB.position.x = this.depth / 2 - this.dimensions.thicknessWidth;
    prop.rightB.position.x = prop.leftB.position.x;
  }

  setPropVisible(propGroup: THREE.Group) {
    propGroup.visible = true;
  }

  setPropInvisible(propGroup: THREE.Group) {
    propGroup.visible = false;
  }

  setMaterials() {
    this.materials = [];

    this.dataMaterials.forEach((value) => {
      this.gltfLoader.load(value.url, (gltf) => {
        gltf.scene.traverse((child) => {
          if (
            child instanceof THREE.Mesh &&
            child.material instanceof THREE.MeshStandardMaterial
          ) {
            child.material.map?.repeat.set(1, 3);

            this.materials.push({
              id: value.id,
              name: value.name,
              material: child.material,
            });

            if (this.materialName == value.name)
              this.updateMaterial(value.name);
          }
        });
      });
    });
  }

  updateMaterial(materialName: string) {
    this.materialName = this.experience.materialName;
    this.materials.forEach((value) => {
      if (value.name == materialName) this.table.material = value.material;
    });
  }

  updateDimensions() {
    this.width = this.experience.width;
    this.depth = this.experience.depth;
    this.height = this.experience.height;

    // update Table
    this.table.geometry.dispose();
    this.table.geometry = new THREE.BoxGeometry(
      this.depth - this.dimensions.thickness,
      this.dimensions.thicknessWidth,
      this.width
    );
    this.table.position.y = this.height;

    // update Legs & Props
    this.setPositionLegs();
    this.setDepthHeightLegs();
    this.setPositionProps(this.prop1);
    this.setPositionProps(this.prop2);

    // update camera
    this.experience.camera.controls.target.y = this.height;
  }

  updateTableProp(tablePropName: string) {
    switch (tablePropName) {
      case "tableprop1":
        {
          this.setPropVisible(this.propGroup1);
          this.setPropInvisible(this.propGroup2);
        }
        break;

      case "tableprop2":
        {
          this.setPropVisible(this.propGroup2);
          this.setPropInvisible(this.propGroup1);
        }
        break;
    }
  }
}
