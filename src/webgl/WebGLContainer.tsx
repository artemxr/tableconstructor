import "../App.css";
import { useRef, useEffect } from "react";
import Experience from "./Experience.ts";
import { EntryPropsWebGL } from "../interfaceEntryProps.ts";

export default function WebGLContainer({
  width,
  depth,
  height,
  materialName,
  tablePropName,
}: EntryPropsWebGL) {
  const webGLContainer = useRef(null);
  const experience = new Experience();

  useEffect(() => {
    if (webGLContainer.current) {
      experience.start(webGLContainer.current);
    }

    return () => {
      console.log("webGL dispose");
      experience.dispose();
    };
  }, []);

  // Updating values
  useEffect(() => {
    experience.updateDimensions(width, depth, height);
  }, [width, depth, height]);

  useEffect(() => {
    experience.updateMaterial(materialName);
  }, [materialName]);

  useEffect(() => {
    experience.updateTableProp(tablePropName);
  }, [tablePropName]);

  return <div className="webglcontainer" ref={webGLContainer}></div>;
}
