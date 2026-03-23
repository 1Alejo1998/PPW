
DROP DATABASE IF EXISTS BD_SUGARRUSH;
CREATE DATABASE BD_SUGARRUSH;
USE BD_SUGARRUSH;

CREATE TABLE PRODUCTOS(
id INT AUTO_INCREMENT,
nombre VARCHAR(100) NOT NULL,
descripcion TEXT NOT NULL,
precio DECIMAL(10,2) NOT NULL,
img VARCHAR(150) NOT NULL,
stock INT NOT NULL DEFAULT 0,
PRIMARY KEY (id)
);

INSERT INTO productos (id, nombre, descripcion, precio, img, stock) VALUES
(1, "Trolli Sour Worms", "Gominola ácida en forma de gusanos.", 66.20, "img/trolli-sour-worms.png",10),
(2, "Twizzlers", "Regaliz dulce en tiras para compartir.", 47.66, "img/twizzlers.png",10),
(3, "Gushers", "Snacks frutales con relleno líquido.", 52.96, "img/gushers.png",10),
(4, "Fruit Roll-Ups", "Lámina de fruta enrollable divertida.", 26.48, "img/fruit-roll-ups.png",10),
(5, "Ring Pop", "Caramelo en forma de anillo frutal.", 19.86, "img/ring-pop.png",10),
(6, "Dr Pepper (lata)", "Refresco con sabor único distintivo.", 33.10, "img/dr.-pepper.png",10),
(7, "Mountain Dew (lata)", "Refresco cítrico muy refrescante.", 33.10, "img/mountain-dew.png",10),
(8, "Monster Energy (16 oz)", "Bebida energizante de gran tamaño.", 71.00, "img/monster-energy.png",10),
(9, "Prime Hydration", "Bebida isotónica de moda.", 79.19, "img/prime-hydration.webp",10),
(10, "Coca-Cola Cherry (lata)", "Clásica Coca-Cola con toque de cereza.", 33.10, "img/coca-cola-cherry.png",10),
(11, "Twix", "Chocolate con caramelo y galleta.", 33.10, "img/twix.png",10),
(12, "Milky Way", "Chocolate con relleno suave cremoso.", 33.10, "img/milky-way.png",10),
(13, "Kinder Bueno", "Chocolate con crema de avellana.", 46.34, "img/kinder-bueno.png",10),
(14, "Toblerone", "Chocolate suizo con miel y almendras.", 66.20, "img/toblerone.png",10),
(15, "Ferrero Rocher", "Bombones crujientes de avellana.", 92.68, "img/ferrero-rocher.png",10),
(16, "Crunch", "Chocolate con arroz inflado.", 33.10, "img/crunch.png",10),
(17, "Butterfinger", "Crocante mantequilla de maní.", 33.10, "img/butterfinger.png",10),
(18, "3 Musketeers", "Chocolate con centro de nougat.", 33.10, "img/3-musketeers.png",10),
(19, "Baby Ruth", "Chocolate, cacahuate y caramelo.", 33.10, "img/baby-ruth.png",10),
(20, "Heath Bar", "Barra de toffee y chocolate.", 33.10, "img/heath-bar.png",10),
(21, "Skittles", "Caramelos masticables de colores.", 26.48, "img/skittles.png",10),
(22, "Starburst", "Caramelos suaves muy jugosos.", 26.48, "img/starburst.png",10),
(23, "Sour Patch Kids", "Gomitas ácidas y luego dulces.", 33.10, "img/sour-patch-kids.png",10),
(24, "Ositos Haribo", "Las gomitas originales de ositos.", 66.20, "img/ositos-haribo.png",10),
(25, "Nerds", "Pequeños caramelos crujientes.", 26.48, "img/nerds.png",10),
(26, "Jolly Rancher", "Caramelos duros de larga duración.", 26.48, "img/jolly-rancher.webp",10),
(27, "AirHeads", "Masticables de textura elástica.", 26.48, "img/airheads.png",10),
(28, "Laffy Taffy", "Taffy suave con chistes en empaque.", 19.86, "img/laffy-taffy.png",10),
(29, "Mike and Ike", "Caramelos alargados de fruta.", 26.48, "img/mike-and-ike.png",10),
(30, "Swedish Fish", "Gomitas con forma de pez.", 26.48, "img/swedish-fish.png",10),
(31, "Takis Fuego", "Chips enrollados muy picantes.", 74.38, "img/takis-fuego.png",10),
(32, "Pringles Original", "Papas en lata receta original.", 32.05, "img/pringles-original.png",10),
(33, "Cheetos Flamin Hot", "Snacks de maíz picantes.", 59.88, "img/cheetos-flamin-hot.png",10),
(34, "Doritos Nacho", "Tortillas con sabor queso nacho.", 77.29, "img/doritos-nacho.png",10),
(35, "Lays Clásicas", "Papas fritas con el toque de sal.", 42.08, "img/lays-clasicas.png",10),
(36, "Ruffles Queso", "Onduladas con sabor a queso.", 84.43, "img/ruffles-queso.png",10),
(37, "Popcorners", "Chips de maíz tipo popcorn.", 26.90, "img/popcorners.png",10),
(38, "Pretzels Snyder's", "Pretzels salados crujientes.", 24.55, "img/pretzels-snyder's.png",10),
(39, "Goldfish", "Galletitas saladas de pececito.", 38.09, "img/goldfish.png",10),
(40, "Munchies Mix", "Mezcla ideal de varios snacks.", 50.24, "img/munchies-mix.png",10),
(41, "Tostitos", "Totopos perfectos para salsas.", 42.70, "img/tostitos.png",10),
(42, "Funyuns", "Aros con sabor a cebolla.", 66.38, "img/funyuns.png",10),
(43, "Bugles", "Snack crujiente forma de cono.", 79.84, "img/bugles.png",10),
(44, "Cheez-It", "Galletas de queso horneado.", 99.37, "img/cheez-it.png",10),
(45, "Gardetto's", "Mezcla de botanas estilo snack mix.", 29.02, "img/gardetto's.webp",10),
(46, "Hershey's Milk", "Barra de chocolate con leche.", 96.97, "img/hershey's-milk.png",10),
(47, "Snickers", "Chocolate, caramelo y maní.", 87.46, "img/snickers.png",10),
(48, "KitKat", "Wafer cubierto de chocolate.", 58.80, "img/kitkat.png",10),
(49, "Reese's Cups", "Chocolate y mantequilla de maní.", 38.65, "img/reese's-cups.png",10),
(50, "M&M's Cacahuate", "Chocolates con maní y colores.", 78.03, "img/m&m's-cacahuate.png",10);



CREATE TABLE USUARIOS
(id_user INT NOT NULL auto_increment ,
username VARCHAR(50) NOT NULL UNIQUE,
userpass  VARCHAR(255) NOT NULL,
primary key(id_user)
);

INSERT INTO USUARIOS (username, userpass) VALUES("admin","012345");