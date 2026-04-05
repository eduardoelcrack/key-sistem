const express = require("express");
const app = express();

let keys = {};

// 🔑 KEY PERMANENTE
const permanentKey = "RATAHUB-J4Y0330M7WDO4AH4KD6";

// ✅ VERSION ACTUAL — cuando quieras que todos actualicen, cambia esto
const CURRENT_VERSION = "1.1";

function generateKey() {
    let random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return "RATAHUB-" + random;
}

app.get("/", (req, res) => {
    res.send("API funcionando 🔥");
});

app.get("/getkey", (req, res) => {
    let key = generateKey();
    let expires = Date.now() + (24 * 60 * 60 * 1000);
    keys[key] = expires;
    res.send("Tu key es: " + key);
});

app.get("/check", (req, res) => {
    let key     = req.query.key;
    let version = req.query.version;

    // verificar version primero
    if (version && version !== CURRENT_VERSION) {
        return res.send("outdated");
    }

    // key permanente
    if (key === permanentKey) {
        return res.send("valid");
    }

    // no existe
    if (!keys[key]) return res.send("invalid");

    // expirada
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
