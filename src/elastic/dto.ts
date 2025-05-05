import { MappingProperty } from "node_modules/@elastic/elasticsearch/lib/api/types";

type MappingPropertyType = Exclude<MappingProperty["type"], undefined>;

const typeMap: Partial<Record<MappingPropertyType, string>> = {
  binary: "number",
  boolean: "boolean",
  date: "Date",
  keyword: "string",
  text: "string",
  float: "number",
  double: "number",
  integer: "number",
} as const;

function mapToTypescript(esType: MappingPropertyType) {
  return typeMap[esType] || "any";
}

export function mapProperty(
  property: MappingProperty & { properties?: Record<string, MappingProperty> }
): Record<string, any> | string | undefined {
  if (property.properties)
    return `{${Object.entries(property.properties).reduce(
      (acc, [key, value]) => `\t${acc}\n"${key}": ${mapProperty(value)};`,
      ""
    )}\n}`;

  if (!property.type) return;

  return mapToTypescript(property.type);
}

export function toDotTs() {}
