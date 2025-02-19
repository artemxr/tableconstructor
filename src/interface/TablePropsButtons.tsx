import { Text, Group, Divider, SegmentedControl } from "@mantine/core";
import { EntryProps } from "../interfaceEntryProps.ts";

export default function TablePropsButtons({
  tablePropName,
  setTablePropName,
}: EntryProps) {
  return (
    <>
      <Divider my="sm" />
      <Text>Опоры</Text>
      <Group my="xs">
        <SegmentedControl
          value={tablePropName}
          onChange={setTablePropName}
          color="ocean-blue"
          data={[
            { label: "Вариант 1", value: "tableprop1" },
            { label: "Вариант 2", value: "tableprop2" },
          ]}
        />
      </Group>
      <Divider my="sm" />
    </>
  );
}
