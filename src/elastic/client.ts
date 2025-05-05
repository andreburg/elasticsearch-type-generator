import { config } from "../util/config";
import { ES_KEY, ES_NODE } from "../util/args";
import { Client } from "@elastic/elasticsearch";

export const esClient = new Client({
  node: ES_NODE,
  auth: {
    apiKey: ES_KEY,
  },
});

export async function getAllIndeces() {
  const catIndeces = await esClient.cat.indices({
    h: "index",
  });
  const indeces = String(catIndeces).split("\n");
  const included = indeces.filter((index) =>
    config.include.some((rule) => new RegExp(rule).test(index))
  );
  const notExcluded = included.filter((index) =>
    config.exclude.every((rule) => !new RegExp(rule).test(index))
  );
  return notExcluded; 
}
