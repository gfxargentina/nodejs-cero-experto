const fs = require('fs');

//lee el archivo readme
const content = fs.readFileSync('README.md', 'utf-8');

//hace una cuenta aprox de las palabras, el split no es exato
const wordCount = content.split(' ');

//busca la palabra node.js con una expresion regular, g: en todo el doc, i:case insensitive,
//si no encuentra nada devuelve un array vacio
const nodeWordCount = content.match(/node.js/gi ?? []).length;

console.log('Palabras: ', wordCount.length);
console.log('Palabras Node: ', nodeWordCount);
