export default {
  dimensions: {
    minWidth: 1200,
    maxWidth: 2400,
    minDepth: 300,
    maxDepth: 900,
    minHeight: 500,
    maxHeight: 1200,
    maxDepthMorph: 1500,
    thickness: 17.5,
    thicknessWidth: 25,
  },

  dataMaterials: [
    {
      id: 1,
      name: "Ashwood",
      color: "#c7b299",
      url: "./gltf/materials/top_ashwood_mat.glb",
    },
    {
      id: 2,
      name: "Cedar",
      color: "#cd7f32",
      url: "./gltf/materials/top_cedar_mat.glb",
    },
    {
      id: 3,
      name: "Plastic Black",
      color: "#1c1c1c",
      url: "./gltf/materials/top_plastic_black_mat.glb",
    },
    {
      id: 4,
      name: "Plastic White",
      color: "#f0f0f0",
      url: "./gltf/materials/top_plastic_white_mat.glb",
    },
    {
      id: 5,
      name: "Walnut",
      color: "#773f1a",
      url: "./gltf/materials/top_walnut_mat.glb",
    },
  ],

  dataTableProps: [
    {
      id: 1,
      name: "tableprop1",
      url: "./gltf/prop_01.glb",
    },
    {
      id: 2,
      name: "tableprop2",
      url: "./gltf/prop_02.glb",
    },
  ],

  dataLegs: [
    {
      id: 1,
      name: "leg1",
      url: "./gltf/leg.glb",
    },
  ],
};
