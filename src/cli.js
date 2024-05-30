import pegaArquivo from "./index.js";
import listaValidada from "./http-validacao.js";
import fs from 'fs';

const caminho = process.argv;

async function imprimeLista(valida, resultado, arquivo = '') {
    if(valida){
        console.log('lista validada', arquivo, await listaValidada(resultado));
    } else{
        console.log('lista de links', arquivo, resultado);
    }
    
}

async function processaTexto(argumentos){
    const caminho = argumentos[2];
    const valida = argumentos[3] === '--valida';

    try{
        fs.lstatSync(caminho);
    }catch(erro){
        if (erro.code === 'ENOENT'){
            console.log('Arquivo ou diretório não existe');
            return
        }
    }
    if(fs.lstatSync(caminho).isFile()){
        const resultado = await pegaArquivo(caminho);
        imprimeLista(valida, resultado);
    }else if (fs.lstatSync(caminho).isDirectory()){
        const arquivos = await fs.promises.readdir(caminho);
        arquivos.forEach(async (arquivo) => {
            const lista = await pegaArquivo(`${caminho}/${arquivo}`)
            imprimeLista(valida, lista, arquivo);
        })

    }
    
}

processaTexto(caminho);