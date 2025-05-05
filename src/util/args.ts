import yargs from "yargs";
import { config, env } from "./config";

const argv: { [key: string]: string } = <any>yargs.argv;

export const ES_KEY = (argv["es_key"] || env?.ES_KEY)!;
export const ES_NODE = (argv["es_node"] || env?.ES_NODE)!;

export const OUTDIR = (argv["dir"] || config.dir)!;

if (![ES_KEY, ES_NODE, OUTDIR].every((arg) => !!arg)) {
  throw new Error(`Arguments not set!`);
}
