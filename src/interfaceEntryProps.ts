export interface EntryPropsWebGL {
  width: number;
  depth: number;
  height: number;
  materialName: string;
  tablePropName: string;
}
export interface EntryProps {
  width: number | string;
  setWidth: (value: number | string) => void;
  depth: number | string;
  setDepth: (value: number | string) => void;
  height: number | string;
  setHeight: (value: number | string) => void;
  materialName: string;
  setMaterialName: (value: string) => void;
  tablePropName: string;
  setTablePropName: (value: string) => void;
  dimensions: {
    minWidth: number;
    maxWidth: number;
    minDepth: number;
    maxDepth: number;
    minHeight: number;
    maxHeight: number;
    maxDepthMorph: number;
    thickness: number;
    thicknessWidth: number;
  };
  dataMaterials: {
    id: number;
    name: string;
    color: string;
    url: string;
  }[];
}
