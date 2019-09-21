const fs = require('fs');

const fileWrite = ( path, text )=>{
    return new Promise( function( resolve, reject ){
        fs.writeFile( path , text, (erro ) => {
            
            if (erro) reject(erro);
        
            resolve(`Arquivo ${path} salvo com sucesso`);            
        });
    });
}

module.exports = fileWrite;