const fs = require("fs");

const replace = s =>
  s
    .replace(/^yi/, "i")
    .replace(/^wu/, "u")
    .replace(/yu/, "ü")
    .replace(/^y/, "i")
    .replace(/^w/, "u")
    .replace(/ü/, "y")

    .replace(/eo/, "ə")
    .replace(/ieu/, "iu")
    .replace(/uei/, "ui")

    .replace(/(?<=[zcs])i/, "")
    .replace(/(?<=[zcs])yi/, "i")

    .replace(/^j/, "g")
    .replace(/^q/, "k")
    .replace(/^x/, "h")
    .replace(/^h/, "x")

    .replace(/^v/, "w")
    .replace(/^zh/, "ž")
    .replace(/^ch/, "č")
    .replace(/^sh/, "š")
    .replace(/(?<=[žčš])i(?=[1-5])/, "")
    .replace(/ng/, "ŋ")
    .replace(/^nj/, "ŋ")

    .replace(/1$/, "-")
    .replace(/2$/, "+")
    .replace(/3$/, "1")
    .replace(/4$/, "2")
    .replace(/5$/, "3")

  ;

const input = fs.readFileSync("./Zhauping-ONP", "utf-8");

const output = input
  .split("\n")
  .flatMap(line => {
    if (/^#/.test(line))
      return []

    const cells = line.split("\t")
    if (cells.length == 2 && cells[0].length == 1 && /^[a-z]+[1-5]$/.test(cells[1]))
      return [`${cells[0]}\t${replace(cells[1])}`];

    return [];
  })
  .join("\n")

fs.writeFileSync("script/out.tsv", output);
