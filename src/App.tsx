import "./App.css";
import "@mantine/core/styles.css";
import { useState } from "react";
import WebGLContainer from "./webgl/WebGLContainer.tsx";
import Interface from "./interface/Interface.tsx";
import sources from "./sources.ts";

export default function App() {
  const dimensions = sources.dimensions;
  const dataMaterials = sources.dataMaterials;
  const dataTableProps = sources.dataTableProps;

  // width is type of <number | string> because of the input buttons of the interface
  const [width, setWidth] = useState<number | string>(dimensions.minWidth);
  const [depth, setDepth] = useState<number | string>(dimensions.minDepth);
  const [height, setHeight] = useState<number | string>(dimensions.minHeight);

  // setting default values of the first material and table prop
  const [materialName, setMaterialName] = useState<string>(
    dataMaterials[2].name
  );
  const [tablePropName, setTablePropName] = useState<string>(
    dataTableProps[0].name
  );

  return (
    <div>
      <WebGLContainer
        width={typeof width === "string" ? 0 : width}
        depth={typeof depth === "string" ? 0 : depth}
        height={typeof height === "string" ? 0 : height}
        materialName={materialName}
        tablePropName={tablePropName}
      />
      <Interface
        dimensions={dimensions}
        dataMaterials={dataMaterials}
        width={width}
        setWidth={setWidth}
        depth={depth}
        setDepth={setDepth}
        height={height}
        setHeight={setHeight}
        materialName={materialName}
        setMaterialName={setMaterialName}
        tablePropName={tablePropName}
        setTablePropName={setTablePropName}
      />
    </div>
  );
}
