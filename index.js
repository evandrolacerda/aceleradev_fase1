const fetch = require('node-fetch');
const fileWrite = require('./src/filewrite');
const decoder = require('./src/decrypt');
const sha1 = require('sha1');
const fs = require('fs');
const FormData = require('form-data');

require('dotenv').config();



( async ()=>{
    
    try {
        
        const token = process.env.CODENATION_TOKEN;
        const apiGetEndpoint = `https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=${token}`;
        const response = await fetch( apiGetEndpoint );

        if( response.status == 200 ){
            const payload = await response.json();
            
            await fileWrite('answer.json', JSON.stringify( payload ) );
            console.log( payload );
            const decodedText = await decoder( payload.cifrado, payload.numero_casas );

            const decodedTextHash = sha1( decodedText );
            
            //atualiza o objeto json e o regrava no arquivo answer.json
            payload.decifrado = decodedText;
            payload.resumo_criptografico = decodedTextHash;
            await fileWrite('answer.json', JSON.stringify( payload ) );


            //envia a resposta
            const apiPostEndpoint = `https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=${token}`;

            const submitResponsePaylod = new FormData();
            const fileBuffer = fs.readFileSync('./answer.json');
        
            submitResponsePaylod.append('answer', fileBuffer, {
                contentType: 'multipart/form-data',
                name: 'answer',
                filename: 'answer.json',
              });

            
            const submitResponse = await fetch( apiPostEndpoint,
            {
                method: 'post',
                body:  submitResponsePaylod,
                headers: submitResponsePaylod.getHeaders(),
            });
            const message = await submitResponse.json();
            console.log( message );



            console.log( decodedText, decodedTextHash  );
        }

    } catch (error) {
        console.log('Erro ao decodificar o texto');
        console.log( error );   
    }
})();