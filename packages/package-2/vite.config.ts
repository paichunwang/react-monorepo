import { readFileSync } from "fs";
import { createViteLibraryConfig } from "../../vite.config.base";

const pkg = JSON.parse(readFileSync("./package.json", "utf-8"));
export default createViteLibraryConfig(__dirname, pkg);
