function extraiLinks (arrLinks){
    return arrLinks.map((objLink) => Object.values(objLink).join())
}

async function checaStatus (listaURLs){
    const arrStatus = await Promise.all(
        listaURLs.map(async(url) => {
            try{
                const response = await fetch(url)
                return response.status;
            }catch(erro){
                return manejaErro(erro)
            }
            
        })
    )
    return arrStatus
}

function manejaErro(erro){
    if (erro.cause.code === 'ENOTFOUND'){
        return 'Link não encontrado'
    }
    else{
        return 'Ocorreu algum erro'
    }
}

export default async function listaValidada (listaDeLinks){
    const links = extraiLinks(listaDeLinks);
    const status = await checaStatus(links);

    return listaDeLinks.map((objeto, index) => ({
        ...objeto,
        status: status[index]
    }))

}