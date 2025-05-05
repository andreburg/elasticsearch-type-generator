import { esClient } from "../elastic/client";
import { mapProperty } from "../elastic/dto";

export type IndexTypeFile = {
  fileName: string;
  contents: string;
};

export async function getIndexFile(index: string) {
  const indexMapping = await esClient.indices.getMapping({ index });
  const fields = mapProperty(indexMapping[index].mappings);
  const indexNames = index.split(/[._-]/);
  const typeName = indexNames
    .map((word) => word[0].toLocaleUpperCase() + word.slice(1))
    .join("");
  const fileName = `${indexNames
    .map((word) => word.toLocaleLowerCase())
    .join("-")}.ts`;
  const contents = `export type ${typeName} = ${fields}`;
  return <IndexTypeFile>{ fileName, contents };
}
