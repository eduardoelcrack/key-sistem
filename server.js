const express = require("express");
const app = express();

let keys = {};

// 🔑 KEY PERMANENTE (cámbiala si quieres)
const permanentKey = "RATAHUB-J4Y0330M7WDO4AH4KD6";

// función para generar key con formato
function generateKey() {
    let random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return "RATAHUB-" + random;
}

// ruta inicio
app.get("/", (req, res) => {
    res.send("API funcionando 🔥");
});

// generar key temporal
app.get("/getkey", (req, res) => {
    let key = generateKey();
    let expires = Date.now() + (24 * 60 * 60 * 1000); // 24 horas

    keys[key] = expires;

    res.send("Tu key es: " + key);
});

// verificar key
app.get("/check", (req, res) => {
    let key = req.query.key;

    // ✅ key permanente
    if (key === permanentKey) {
        return res.send("valid");
    }

    // ❌ no existe
    if (!keys[key]) return res.send("invalid");

    // ⏱️ expiración
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
