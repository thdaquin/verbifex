import fs from "fs";
import path from "path";

const dataDir = path.resolve("src/data/rawData");
const outputFile = path.resolve("src/data/validWordList.ts");

const words = new Set();

for (const file of fs.readdirSync(dataDir)) {
  if (!file.endsWith(".json")) continue;

  const json = JSON.parse(
    fs.readFileSync(path.join(dataDir, file), "utf8")
  );

  if (typeof json === "object" && json !== null) {
    for (const key of Object.keys(json)) {
      words.add(key.toLowerCase());
    }
  }
}

const contents = `
// AUTO-GENERATED — DO NOT EDIT
export const validWordList = new Set([
${[...words].sort().map(w => `  "${w}",`).join("\n")}
]);
`;

fs.writeFileSync(outputFile, contents);
console.log("validWordList words generated:", words.size);
