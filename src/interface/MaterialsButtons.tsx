import { Text, Group, ActionIcon, Divider } from "@mantine/core";
import { EntryProps } from "../interfaceEntryProps.ts";

export default function MaterialsButtons({
  materialName,
  setMaterialName,
  dataMaterials,
}: EntryProps) {
  return (
    <>
      {dataMaterials.length ? (
        <>
          <Divider mb="sm" />
          <Text>Материал верха {materialName}</Text>
          <Group my="sm">
            {
              <>
                {dataMaterials.map((value) => (
                  <ActionIcon
                    key={value.id}
                    color={value.color}
                    size="lg"
                    radius="xl"
                    onClick={() => {
                      setMaterialName(value.name);
                    }}
                  />
                ))}
              </>
            }
          </Group>
        </>
      ) : null}
    </>
  );
}
