import "../App.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { EntryProps } from "../interfaceEntryProps.ts";
import MaterialsButtons from "./MaterialsButtons.tsx";
import Sliders from "./Sliders.tsx";
import TablePropsButtons from "./TablePropsButtons.tsx";

export default function Interface(props: EntryProps) {
  const theme = createTheme({
    primaryColor: "ocean-blue",
    colors: {
      "ocean-blue": [
        "#7AD1DD",
        "#5FCCDB",
        "#44CADC",
        "#2AC9DE",
        "#1AC2D9",
        "#11B7CD",
        "#09ADC3",
        "#0E99AC",
        "#128797",
        "#147885",
      ],
    },
  });

  return (
    <div className="interfacecontainer">
      <MantineProvider theme={theme}>
        <MaterialsButtons {...props} />
        <Sliders {...props} />
        <TablePropsButtons {...props} />
      </MantineProvider>
    </div>
  );
}
