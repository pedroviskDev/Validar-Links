import fs from "fs";
import chalk from "chalk";

function tratarErro(erro){
    throw new Error(chalk.red(erro.code, 'Não há arquivo no diretório'));
}

function extrairLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    const resultados = capturas.map((captura) => {
        return {[captura[1]]: captura[2]}
    })
    return resultados.length !==0 ? resultados: 'Nao ha links no arquivo';
}

async function pegaArquivo(caminhoArquivo) {
    try{
        const encoding = 'utf-8';
        const texto = await fs.promises.readFile(caminhoArquivo, encoding);
        return extrairLinks(texto)
    }catch(erro){
        tratarErro(erro)
    }
    
}


export default pegaArquivo;