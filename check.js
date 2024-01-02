
const config = require('./config.json');
const licenseKey = config.licenseKey // Klucz, który chcesz sprawdzić
const apiUrl = `http://masterstrona.pl/api/checklicense/${licenseKey}`;
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        if (data.isValid) {
             console.log("――――――――――――――――――――――――――――――――――――");
             console.log('\x1b[32m%s\x1b[0m', 'Twoj klucz licencji jest prawidlowy!');
             console.log('\x1b[36m%s\x1b[0m', "Autoryzacja powiodla sie!");
             console.log('\x1b[36m%s\x1b[0m', `Discord id: ${data.discordID}`);
             console.log("――――――――――――――――――――――――――――――――――――");
        } else {
             console.log("――――――――――――――――――――――――――――――――――――");
             console.log('\x1b[31m%s\x1b[0m', 'Klucz licencji jest nieprawidlowy!');
             console.log('\x1b[31m%s\x1b[0m', `Stworz ticketa na naszym serwerze by otrzymac pomoc.`);
             console.log("――――――――――――――――――――――――――――――――――――");
               return process.exit(1)
        }
    // Reszta twojego kodu







        //Error, nie zmieniaj
    })
    .catch(error => {
        console.log("――――――――――――――――――――――――――――――――――――");
        console.log('\x1b[31m%s\x1b[0m', 'Blad podczas laczenia z API');
        console.log('\x1b[31m%s\x1b[0m', `Stworz ticketa by zglosic blad.`);
        console.log('\x1b[31m%s\x1b[0m', `Error: ${error}`);
        console.log("――――――――――――――――――――――――――――――――――――");
          return process.exit(1)
    });

