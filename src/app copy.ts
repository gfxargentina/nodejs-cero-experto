import fs from 'fs';

let outputMessage = '';
const base = 5;
const headerMessage = `
=============================================
        Tabla del ${base}
=============================================\n        
`;

for (let i = 1; i <= 10; i++) {
  outputMessage += `${base} x ${i} = ${base * i}\n`;
}

outputMessage = headerMessage + outputMessage;
console.log(outputMessage);

const outputPath = `outputs`;

//crear el directorio, la opcion recursive permite crear mas subdirectorios
fs.mkdirSync(outputPath, { recursive: true });

//grabar en archivo de salida
fs.writeFileSync(`outputs/tabla-${base}.txt`, outputMessage);
console.log('Archivo Creado');
