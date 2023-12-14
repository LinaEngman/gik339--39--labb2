const express = require('express'); //importerar vi modulen express. Detta sätt att importera npm-paket gäller för både externa npm-paket, sådana inbyggda i Node.js (såsom exempelvis http), samt eventuella egna moduler som vi själva skapar. Koden require(”express”) betyder alltså att vi importerar en modul vid namn express.
const server = express(); //På rad 2 skapas variabeln server. Den tilldelas ett objekt skapat av express. Detta objekt utgör hela själva webbservern. Det är vanligt att denna variabel också kallas för app. Vi döper den till server så att vi vet att det är en server vi håller på med.

server
.use(express.json()) 
.use(express.urlencoded({ extended: false })) 
.use((req, res, next) => {
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Headers', '*'); 
res.header('Access-Control-Allow-Methods', '*');

next(); 
});

server.get('/',(req,res) => { // Där finns ett anrop till express inbyggda funktion get(), som kan användas för att hantera GET-förfrågningar.
    const method = req.method;
    const url =req.url;
    res.send(`Du har gjort en ${method}-förfrågan till url:en ${url}`);
}); // När en användare gör en GET-förfrågan till roten, skickar servern tillbaka en textrespons som anger HTTP-metoden (GET) och URL:en som begäran gjordes till.

server.get('/users', (req, res) => {
    const db = new sqlite3.Database('./gik339-labb2.db');  // Skapa en databasanslutning
    const sql = 'SELECT * FROM users';  // Hämta alla rader från tabellen users
    db.all(sql, (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(rows);  // Skicka tillbaka data som svar
        }
    });
    db.close();  // Stäng databasanslutningen när du är klar
});

const sqlite3 = require('sqlite3').verbose();

server.listen(3000, () => {
    console.log('server running on http://localhost:3000');
}); //Här startas servern och börjar lyssna på port 3000. När servern har startats, skrivs ett meddelande ut i konsolen för att indikera att servern är igång.
