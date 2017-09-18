/* create database JSPROJECT */
CREATE TABLE usuario (
  idusuario SERIAL PRIMARY KEY,
  usuario VARCHAR(45) NOT NULL,
  pass VARCHAR(255) NOT NULL,
  nombre VARCHAR(45) NOT NULL);

CREATE TABLE  cuento  (
   idcuento  SERIAL PRIMARY KEY,
   nombre  VARCHAR(255) NULL,
   descripcion  VARCHAR(255) NULL,
   creditos  VARCHAR(45) NULL,
   idusuario  INT NULL,
  CONSTRAINT  idusuario 
    FOREIGN KEY ( idusuario )
    REFERENCES   usuario  ( idusuario ));

CREATE TABLE  pagina  (
   idpagina  SERIAL PRIMARY KEY,
   imagen  VARCHAR(255) NOT NULL,
   audio  VARCHAR(255) NOT NULL,
   idcuento  INT NOT NULL,
  CONSTRAINT  idcuento 
    FOREIGN KEY ( idcuento )
    REFERENCES  cuento  ( idcuento ));

CREATE TABLE  pregunta  (
   idpregunta  SERIAL PRIMARY KEY,
   img1  VARCHAR(255) NULL,
   img2  VARCHAR(255) NULL,
   audio  VARCHAR(255) NULL,
   respuesta  VARCHAR(45) NULL,
   idcuento  INT NOT NULL,
  CONSTRAINT  idcuento
    FOREIGN KEY ( idcuento )
    REFERENCES  cuento  ( idcuento ));




INSERT INTO  usuario  (usuario ,  pass ,  nombre ) VALUES ('Shimberly', 'kim', 'Kimberly Munoz');

INSERT INTO  usuario  ( usuario ,  pass ,  nombre ) VALUES ('Deathpaul', 'paul', 'Paul Valle');

INSERT INTO  usuario  (usuario ,  pass ,  nombre ) VALUES ('Chibi', 'paola', 'Paola Ortiz');


INSERT INTO  cuento  ( nombre ,  descripcion ,  creditos ,  idusuario ) VALUES ('Los tres cerditos', 'Cuento infantil con moraleja para incentivar el trabajo', 'Tomado de guiainfantil.com', '1');

INSERT INTO  cuento  (  nombre ,  descripcion ,  creditos ,  idusuario ) VALUES ('Blancanieves', 'Cuento infantil con moraleja de no hablar con desconocidos', 'Tomado de guiainfantil.com', '1');

INSERT INTO  cuento  (  nombre ,  descripcion ,  creditos ,  idusuario ) VALUES ('Pinocho', 'Cuento infantil con moraleja ayuda a reflexionar sobre no mentir', 'Tomado de guiainfantil.com', '1');

INSERT INTO  cuento  (  nombre ,  descripcion ,  creditos ,  idusuario ) VALUES ('Pinocho', 'Cuento infantil con moraleja ayuda a reflexionar sobre no mentir', 'Tomado de guiainfantil.com', '2');

INSERT INTO  cuento  (   nombre ,  descripcion ,  creditos ,  idusuario ) VALUES ( 'Blancanieves', 'Cuento infantil con moraleja de no hablar con desconocidos', 'Tomado de guiainfantil.com', '3');

INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/cerditos1.jpg', 'images/cuentos/cerditos1.mp3', '1');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/cerditos2.jpg', 'images/cuentos/cerditos2.mp3', '1');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/cerditos3.jpg', 'images/cuentos/cerditos3.mp3', '1');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/cerditos4.jpg', 'images/cuentos/cerditos4.mp3', '1');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/cerditos4.jpg', 'images/cuentos/cerditos5.mp3', '1');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/cerditos4.jpg', 'images/cuentos/cerditos6.mp3', '1');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/cerditos4.jpg', 'images/cuentos/cerditos7.mp3', '1');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/cerditos8.jpg', 'images/cuentos/cerditos8.mp3', '1');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/cerditos9.jpg', 'images/cuentos/cerditos9.mp3', '1');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/cerditos10.jpg', 'images/cuentos/cerditos10.mp3', '1');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/cerditos11.jpg', 'images/cuentos/cerditos11.mp3', '1');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/cerditos12.jpg', 'images/cuentos/cerditos12.mp3', '1');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/cerditos13.jpg', 'images/cuentos/cerditos13.mp3', '1');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/cerditos14.jpg', 'images/cuentos/cerditos14.mp3', '1');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/cerditos15.jpg', 'images/cuentos/cerditos15.mp3', '1');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/cerditos16.jpg', 'images/cuentos/cerditos16.mp3', '1');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/cerditos17.jpg', 'images/cuentos/cerditos17.mp3', '1');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/cerditos18.jpg', 'images/cuentos/cerditos18.mp3', '1');


INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/blancanieves1.jpg', 'images/cuentos/blancanieves1.mp3', '2');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/blancanieves2.jpg', 'images/cuentos/blancanieves2.mp3', '2');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/blancanieves3.jpg', 'images/cuentos/blancanieves3.mp3', '2');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/blancanieves4.jpg', 'images/cuentos/blancanieves4.mp3', '2');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/blancanieves5.jpg', 'images/cuentos/blancanieves5.mp3', '2');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/blancanieves6.jpg', 'images/cuentos/blancanieves6.mp3', '2');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/blancanieves7.jpg', 'images/cuentos/blancanieves7.mp3', '2');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/blancanieves8.jpg', 'images/cuentos/blancanieves8.mp3', '2');


INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/pinocho1.jpg', 'images/cuentos/pinocho1.mp3', '3');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/pinocho2.jpg', 'images/cuentos/pinocho2.mp3', '3');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/pinocho3.jpg', 'images/cuentos/pinocho3.mp3', '3');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/pinocho4.jpg', 'images/cuentos/pinocho4.mp3', '3');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/pinocho5.jpg', 'images/cuentos/pinocho5.mp3', '3');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/pinocho6.jpg', 'images/cuentos/pinocho6.mp3', '3');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/pinocho7.jpg', 'images/cuentos/pinocho7.mp3', '3');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/pinocho8.jpg', 'images/cuentos/pinocho8.mp3', '3');


INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/pinocho1.jpg', 'images/cuentos/pinocho1.mp3', '4');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/pinocho2.jpg', 'images/cuentos/pinocho2.mp3', '4');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/pinocho3.jpg', 'images/cuentos/pinocho3.mp3', '4');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/pinocho4.jpg', 'images/cuentos/pinocho4.mp3', '4');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/pinocho5.jpg', 'images/cuentos/pinocho5.mp3', '4');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/pinocho6.jpg', 'images/cuentos/pinocho6.mp3', '4');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/pinocho7.jpg', 'images/cuentos/pinocho7.mp3', '4');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/pinocho8.jpg', 'images/cuentos/pinocho8.mp3', '4');


INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/blancanieves1.jpg', 'images/cuentos/blancanieves1.mp3', '5');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/blancanieves2.jpg', 'images/cuentos/blancanieves2.mp3', '5');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/blancanieves3.jpg', 'images/cuentos/blancanieves3.mp3', '5');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/blancanieves4.jpg', 'images/cuentos/blancanieves4.mp3', '5');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/blancanieves5.jpg', 'images/cuentos/blancanieves5.mp3', '5');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/blancanieves6.jpg', 'images/cuentos/blancanieves6.mp3', '5');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/blancanieves7.jpg', 'images/cuentos/blancanieves7.mp3', '5');
INSERT INTO   pagina  (     imagen ,  audio ,  idcuento ) VALUES ('images/cuentos/blancanieves8.jpg', 'images/cuentos/blancanieves8.mp3', '5');

INSERT INTO  pregunta  (img1 ,  img2 ,  audio, respuesta, idcuento) VALUES ('images/cuentos/colorverde.jpg', 'images/cuentos/colorladrillo.jpg', 'images/cuentos/preguntacerditos.mp3','2',1);


INSERT INTO  pregunta  (img1 ,  img2 ,  audio, respuesta, idcuento) VALUES ('images/cuentos/opcion1P1.jpg', 'images/cuentos/opcion2P1.jpg', 'images/cuentos/preguntablancanieves.mp3','1',2);

INSERT INTO  pregunta  (img1 ,  img2 ,  audio, respuesta, idcuento) VALUES ('images/cuentos/nombrePapaPinocho.png', 'images/cuentos/nombrePapaPinocho2.gif', 'images/cuentos/PapaPinocho.mp3','1',3);











