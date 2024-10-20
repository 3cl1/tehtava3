const express = require("express");
const bodyParser = require("body-parser");
const mariadb = require("mariadb");

// Luo yhteys MariaDB-tietokantaan
const pool = mariadb.createPool({
  host: "localhost",
  user: "opiskelija",
  password: "opiskelija1",
  database: "urheilijat",
  connectionLimit: 5,
});

const app = express();
app.use(bodyParser.json());

// GET /urheilijat - Hakee kaikki urheilijat
app.get("/urheilijat", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT id, etunimi, sukunimi, kutsumanimi, DATE_FORMAT(syntymavuosi, '%Y-%m-%d') AS syntymavuosi, CAST(paino AS DECIMAL(10, 2)) AS paino, kuva_linkki, laji, saavutukset FROM urheilijat"
    );

    res.json(rows);
    conn.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /urheilijat/:id - Hakee urheilijan ID:n perusteella
app.get("/urheilijat/:id", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const row = await conn.query("SELECT * FROM urheilijat WHERE id = ?", [
      req.params.id,
    ]);
    res.json(row[0]);
    conn.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /urheilijat - Lisää uuden urheilijan
app.post("/urheilijat", async (req, res) => {
  try {
    const {
      etunimi,
      sukunimi,
      kutsumanimi,
      syntymavuosi,
      paino,
      kuva_linkki,
      laji,
      saavutukset,
    } = req.body;

    const conn = await pool.getConnection();
    const result = await conn.query(
      "INSERT INTO urheilijat (etunimi, sukunimi, kutsumanimi, syntymavuosi, paino, kuva_linkki, laji, saavutukset) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        etunimi,
        sukunimi,
        kutsumanimi,
        syntymavuosi,
        parseFloat(paino),
        kuva_linkki,
        laji,
        saavutukset,
      ]
    );

    // Muunna insertId number-tyyppiseksi, jos se on BigInt
    const insertId = Number(result.insertId);

    res.status(201).json({ message: "Urheilija lisätty", id: insertId });
    conn.end();
  } catch (err) {
    if (err.message.includes("BigInt")) {
      console.error("BigInt-virhe:", err.message);
      return res.status(500).json({ error: "BigInt-tyyppinen virhe" });
    }
    res.status(500).json({ error: err.message });
  }
});

// PUT /urheilijat/:id - Päivittää urheilijan tietoja
app.put("/urheilijat/:id", async (req, res) => {
  const {
    etunimi,
    sukunimi,
    kutsumanimi,
    syntymavuosi,
    paino,
    kuva_linkki,
    laji,
    saavutukset,
  } = req.body;
  try {
    const conn = await pool.getConnection();
    const result = await conn.query(
      "UPDATE urheilijat SET etunimi = ?, sukunimi = ?, kutsumanimi = ?, syntymavuosi = ?, paino = ?, kuva_linkki = ?, laji = ?, saavutukset = ? WHERE id = ?",
      [
        etunimi,
        sukunimi,
        kutsumanimi,
        syntymavuosi,
        paino,
        kuva_linkki,
        laji,
        saavutukset,
        req.params.id,
      ]
    );
    res.json({ affectedRows: result.affectedRows });
    conn.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /urheilijat/:id - Poistaa urheilijan ID:n perusteella
app.delete("/urheilijat/:id", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const result = await conn.query("DELETE FROM urheilijat WHERE id = ?", [
      req.params.id,
    ]);
    res.json({ affectedRows: result.affectedRows });
    conn.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Käynnistä palvelin
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Sulje tietokantayhteys, kun sovellus suljetaan
process.on("exit", () => {
  pool.end();
});
