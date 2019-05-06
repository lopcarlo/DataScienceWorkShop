let filePt = require("fs");
let fileDe = require("fs");
let fileEs = require("fs");

let text = filePt.readFileSync("./data/text_pt.txt");
let textPt = text.toString().toLowerCase();

let text1 = fileDe.readFileSync("./data/text_de.txt");
let textDe = text1.toString().toLowerCase();

let text2 = fileEs.readFileSync("./data/text_es.txt");
let textEs = text2.toString().toLowerCase();

let trigramPtCounts = new Map();

String.prototype.ngrams = function(n) {
  let r = [];
  for (let i = 0; i <= this.length - n; i++) r.push(this.substring(i, i + n));
  return r;
};

//PT
let trigramsPt = textPt.ngrams(3);

trigramsPt.forEach(element => {
  if (trigramPtCounts.has(element))
    trigramPtCounts.set(element, trigramPtCounts.get(element) + 1);
  else trigramPtCounts.set(element, 1);
});

let trigramPtProbs = new Map();

let valuesPt = [...trigramPtCounts.values()];
let sumValuesPt = valuesPt.reduce((add, a) => add + a, 0);

trigramsPt.forEach(element => {
  trigramPtProbs.set(
    element,
    (trigramPtCounts.get(element) + 1) / (sumValuesPt + valuesPt.length)
  );
});

//DE
let trigramDeCounts = new Map();
let trigramsDe = textDe.ngrams(3);

trigramsDe.forEach(element => {
  if (trigramDeCounts.has(element))
    trigramDeCounts.set(element, trigramDeCounts.get(element) + 1);
  else trigramDeCounts.set(element, 1);
});

let trigramDeProbs = new Map();

let valuesDe = [...trigramDeCounts.values()];
let sumValuesDe = valuesDe.reduce((add, a) => add + a, 0);

trigramsDe.forEach(element => {
  if (trigramDeProbs.has(element))
    trigramDeProbs.set(
      element,
      (trigramDeCounts.get(element) + 1) / (sumValuesDe + valuesDe.length)
    );
  else trigramDeProbs.set(element, 1 / (sumValuesDe + valuesDe.length));
});

//ES
let trigramEsCounts = new Map();
let trigramsEs = textEs.ngrams(3);

trigramsEs.forEach(element => {
  if (trigramEsCounts.has(element))
    trigramEsCounts.set(element, trigramEsCounts.get(element) + 1);
  else trigramEsCounts.set(element, 1);
});

let trigramEsProbs = new Map();

let valuesEs = [...trigramEsCounts.values()];
let sumValuesEs = valuesEs.reduce((add, a) => add + a, 0);

trigramsEs.forEach(element => {
  trigramEsProbs.set(
    element,
    (trigramEsCounts.get(element) + 1) / (sumValuesEs + valuesEs.length)
  );
});

//INPUT FROM USER
let input = "seja bem vindo à academia de código";

let textInput = input.toLowerCase();

let trigramInput = textInput.ngrams(3);

console.log(trigramInput);
let prob1 = 0;
let prob2 = 0;
let prob3 = 0;

trigramInput.forEach(element => {
  if (trigramPtProbs.get(element)) {
    prob1 += Math.log10(trigramPtProbs.get(element));
  } else {
    prob2 += Math.log10(1 / (sumValuesPt + valuesPt.length));    
  }

  if (trigramDeProbs.get(element)) {
    prob2 += Math.log10(trigramDeProbs.get(element));
  } else {
      
    prob2 += Math.log10(1 / (sumValuesDe + valuesDe.length));
    
  }

  if (trigramEsProbs.get(element)) {
    prob3 += Math.log10(trigramEsProbs.get(element));
  } else {
    prob2 += Math.log10(1 / (sumValuesEs + valuesEs.length));
  }
});

console.log(prob1);
console.log(prob2);
console.log(prob3);
