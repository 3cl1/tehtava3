CREATE DATABASE urheilijat;

USE urheilijat;

CREATE TABLE urheilijat (
  id INT AUTO_INCREMENT PRIMARY KEY,
  etunimi VARCHAR(50),
  sukunimi VARCHAR(50),
  kutsumanimi VARCHAR(50),
  syntymavuosi DATE,
  paino DECIMAL(5,2),
  kuva_linkki VARCHAR(255),
  laji VARCHAR(50),
  saavutukset TEXT
);




INSERT INTO urheilijat (etunimi, sukunimi, kutsumanimi, syntymavuosi, paino, kuva_linkki, laji, saavutukset)
VALUES
  ('Rafael', 'Nadal', 'Rafa', '1986-06-03', 75, 'https://www.example.com/rafael_nadal.jpg', 'Tennis', '22 Grand Slam -turnausvoittoa'),
  ('Lionel', 'Messi', 'Leo', '1987-06-24', 72, 'https://www.example.com/lionel_messi.jpg', 'Jalkapallo', 'Maailmanmestaruus, useita Ballon d’Or -palkintoja'),
  ('Serena', 'Williams', 'Serena', '1981-09-26', 68, 'https://www.example.com/serena_williams.jpg', 'Tennis', '23 Grand Slam -turnausvoittoa'),
  ('Michael', 'Phelps', 'Michael', '1985-07-30', 84, 'https://www.example.com/michael_phelps.jpg', 'Uinti', 'Eniten olympiakultaa voittanut urheilija'),
  ('Usain', 'Bolt', 'Usain', '1986-08-21', 94, 'https://www.example.com/usain_bolt.jpg', 'Yleisurheilu', 'Useita maailmanennätyksiä pikajuoksussa'),
  ('LeBron', 'James', 'Lebron', '1984-12-30', 113, 'https://www.example.com/lebron_james.jpg', 'Koripallo', 'Useita NBA-mestaruuksia'),
  ('Mika', 'Häkkinen', 'Mika', '1969-08-28', 75, 'https://www.example.com/mika_hakkinen.jpg', 'Formula 1', 'Kaksi maailmanmestaruutta'),
  ('Marja-Liisa', 'Kirvesniemi', 'Marja-Liisa', '1955-02-19', 58, 'https://www.example.com/marja_liisa_kirvesniemi.jpg', 'Hiihto', 'Useita olympiamitaleja'),
  ('Janica', 'Kostelic', 'Janica', '1980-1/05', 58, 'https://www.example.com/janica_kostelic.jpg', 'Alppihiihto', 'Neljä olympiakultaa'),
  ('Tiger', 'Woods', 'Tiger', '1975-12-30', 85, 'https://www.example.com/tiger_woods.jpg', 'Golf', 'Useita Major-turnausvoittoja');
