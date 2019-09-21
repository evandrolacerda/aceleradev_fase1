const decoder = ( text, offset  ) =>{
    return new Promise( ( resolve, reject ) =>{

        //normalização da string
        text = text.toLowerCase();
        console.log( 'TextCifrado: ', text );

        let decodedText = '';

        for( let i = 0; i < text.length; i++ ){
            
            
            let decodedCharacter = text[i];

            const code = text.charCodeAt( i );

            //letras mínusculas no UNICODE estão entre os códigos 97 e 122

            if( code >= 97 && code <= 122 )
            {
                //gera um novo código entre 97 e 122
                let newCode = ( (code - 97 + offset ) % 26 ) + 97;                

                decodedCharacter = String.fromCharCode( newCode );

                console.log( code, newCode );
            }

            decodedText+= decodedCharacter;
                

        }

        resolve( decodedText );
    });
};

module.exports = decoder;