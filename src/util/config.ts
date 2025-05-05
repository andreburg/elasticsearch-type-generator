import dotenv from "dotenv";
import fs from "fs";

type ESTypesConfig = {
  env?: string;
  dir: string;
  include: string[];
  exclude: string[];
};

type EnvArgs = {
  ES_KEY?: string;
  ES_NODE?: string;
};

const configFile = fs.readFileSync("es-types.json", "utf8");
export const config: ESTypesConfig = JSON.parse(configFile);

export let env: EnvArgs | undefined = undefined;
if (config.env) {
  const envFile = fs.readFileSync(config.env, "utf8");
  env = <EnvArgs>dotenv.parse(envFile);
}
