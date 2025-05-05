#!/usr/bin/env node

import path from "path";
import { getAllIndeces } from "./elastic/client";
import { OUTDIR } from "./util/args";
import fs from "fs";
import { getIndexFile } from "./services/elastic-service";

async function run() {
  const indeces = await getAllIndeces();
  const files = await Promise.all(indeces.map((index) => getIndexFile(index)));
  if (!fs.existsSync(OUTDIR)) fs.mkdirSync(OUTDIR, { recursive: true });
  await Promise.all(
    files.map((file) =>
      fs.promises.writeFile(path.join(OUTDIR, file.fileName), file.contents)
    )
  );
}

run();
