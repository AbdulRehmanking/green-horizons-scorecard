import fs from "fs";
import path from "path";
import Papa from "papaparse";

export function loadCsv<T>(filename: string): T[] {
  const filePath = path.join(process.cwd(), "src/data/raw", filename);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const result = Papa.parse<T>(fileContent, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  });
  if (result.errors.length > 0) {
    console.warn(`CSV warnings in ${filename}:`, result.errors.slice(0, 3));
  }
  return result.data;
}