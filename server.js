app.get("/", (req, res) => {
    res.send("API funcionando 🔥");
});

const express = require("express");
const app = express();

let keys = {};

// generar key
app.get("/getkey", (req, res) => {
    let key = Math.random().toString(36).substring(2, 10);
    let expires = Date.now() + (24 * 60 * 60 * 1000); // 24 horas

    keys[key] = expires;

    res.send("Tu key es: " + key);
});

// verificar key
app.get("/check", (req, res) => {
    let key = req.query.key;

    if (!keys[key]) return res.send("invalid");

    if (Date.now() > keys[key]) {
        delete keys[key];
        return res.send("expired");
    }

    res.send("valid");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Servidor listo");
});