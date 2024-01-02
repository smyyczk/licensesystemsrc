const express = require('express');
const cfg = require('./config.json')
const app = express();
const port = 3335;
const { MongoClient } = require('mongodb');

const uri = cfg.mongouri
const dbName = cfg.mongodbname
const portcheck = cfg.port
const errcheck = cfg.errorchecker

if(errcheck == "true") {



if(dbName == "") {
    console.log("------------------------------------");
    console.log('\x1b[31m%s\x1b[0m', 'Podaj nazwe bazy danych w config.json');
    console.log('\x1b[31m%s\x1b[0m', `Stworz ticketa na naszym serwerze by otrzymac pomoc.`);
    console.log("------------------------------------");
      return process.exit(1)
}

if(uri == "") {
    console.log("------------------------------------");
    console.log('\x1b[31m%s\x1b[0m', 'Podaj link do polaczenia sie z baza danych MongoDB w config.json');
    console.log('\x1b[31m%s\x1b[0m', `Stworz ticketa na naszym serwerze by otrzymac pomoc.`);
    console.log("------------------------------------");
      return process.exit(1)
}

if([portcheck] == "") {
    console.log("------------------------------------");
    console.log('\x1b[31m%s\x1b[0m', 'Podaj port do uruchomienia serwera w config.json');
    console.log('\x1b[31m%s\x1b[0m', `Stworz ticketa na naszym serwerze by otrzymac pomoc.`);
    console.log("------------------------------------");
      return process.exit(1)
}

}

async function connectToDatabase() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db(dbName);

        // Dodawanie przyk�adowej licencji
        const licensesCollection = db.collection('licenses');

        console.log('Poloczono z baza danych.');
        return db;
    } catch (error) {
        console.error('Blad polaczenia z baza danych:', error);
    }
}

// Kod strony
app.get('/api/checklicense/:licenseKey', async (req, res) => {
    const enteredLicenseKey = req.params.licenseKey;

    try {
        const db = await connectToDatabase();
        const licensesCollection = db.collection('licenses');

        const licenseData = await licensesCollection.findOne({ licenseKey: enteredLicenseKey });

        if (licenseData) {
            const isValid = true;
            const discordID = licenseData.discordID;

            res.json({ isValid, discordID });
        } else {
            const isValid = false;
            res.json({ isValid });
        }
    } catch (error) {
        console.error('Blad podczas sprawdzania licencji:', error);
        res.status(500).json({ error: 'Blad serwera' });
    }
});




// wersja
app.get('/api/checkversion', (req, res) => {
    res.json({ version: '1.1' });
});

// Sprawdzanie wersji



// wersja end


app.listen(cfg.port, () => {
    console.log(`API dziala poprawnie. Port: ${cfg.port}`);
});
