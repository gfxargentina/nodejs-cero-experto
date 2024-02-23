import fs from 'fs';
import { yarg } from './config/plugins/yargs.plugin';

const { b: base, l: limit, s: showTable } = yarg;

let outputMessage = '';
//const base = 5;
const headerMessage = `
=============================================
        Tabla del ${base}
=============================================\n        
`;

for (let i = 1; i <= limit; i++) {
  outputMessage += `${base} x ${i} = ${base * i}\n`;
}

outputMessage = headerMessage + outputMessage;

if (showTable) {
  console.log(outputMessage);
}

const outputPath = `outputs`;

//crear el directorio, la opcion recursive permite crear mas subdirectorios
fs.mkdirSync(outputPath, { recursive: true });

//grabar en archivo de salida
fs.writeFileSync(`outputs/tabla-${base}.txt`, outputMessage);
console.log('Archivo Creado');
