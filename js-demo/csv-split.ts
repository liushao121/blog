import { readFileSync } from "fs";
import { resolve } from "path";

function init(): void {
  //   const file = "./js-demo/normal.csv";
  const file = "./js-demo/demo.csv";
  const content = readFileSync(resolve(file), {
    encoding: "utf-8"
  });
  const result = parser(content);
  console.log(result);
}

function parser(content: String): String[][] {
  const rows = content.split("\n");
  return rows.map(v => v.split(","));
}

init();
