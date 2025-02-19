import { Text, Group, Divider, Slider, NumberInput } from "@mantine/core";
import { EntryProps } from "../interfaceEntryProps.ts";

export default function Sliders({
  width,
  setWidth,
  depth,
  setDepth,
  height,
  setHeight,
  dimensions,
}: EntryProps) {
  return (
    <>
      <Divider my="sm" />
      <Text>Размеры</Text>
      <Group mt="sm">
        <NumberInput
          value={width}
          onChange={setWidth}
          step={1}
          min={dimensions.minWidth}
          max={dimensions.maxWidth}
          maw={"60"}
          hideControls
        />
        <Text size="sm">Ширина А (мм)</Text>
      </Group>
      <Slider
        mt="0.2em"
        min={dimensions.minWidth}
        max={dimensions.maxWidth}
        step={1}
        label={null}
        value={typeof width === "string" ? 0 : width}
        onChange={setWidth}
      />
      <Group mt="sm">
        <NumberInput
          value={depth}
          onChange={setDepth}
          step={1}
          min={dimensions.minDepth}
          max={dimensions.maxDepth}
          maw={"60"}
          hideControls
        />
        <Text size="sm">Глубина А (мм)</Text>
      </Group>
      <Slider
        mt="0.2em"
        min={dimensions.minDepth}
        max={dimensions.maxDepth}
        step={1}
        label={null}
        value={typeof depth === "string" ? 0 : depth}
        onChange={setDepth}
      />
      <Group mt="sm">
        <NumberInput
          value={height}
          onChange={setHeight}
          step={1}
          min={dimensions.minHeight}
          max={dimensions.maxHeight}
          maw={"60"}
          hideControls
        />
        <Text size="sm">Высота А (мм)</Text>
      </Group>
      <Slider
        mt="0.2em"
        min={dimensions.minHeight}
        max={dimensions.maxHeight}
        step={1}
        label={null}
        value={typeof height === "string" ? 0 : height}
        onChange={setHeight}
      />
    </>
  );
}
