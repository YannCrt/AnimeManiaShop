CREATE TABLE Client(
   Id_Client INT AUTO_INCREMENT,
   firstname VARCHAR(255),
   lastname VARCHAR(255),
   mail VARCHAR(255),
   password_hasch VARCHAR(255),
   role VARCHAR(255),
   inscription_date DATETIME,
   adress VARCHAR(255),
   PRIMARY KEY(Id_Client)
);

CREATE TABLE Category(
   Id_Category INT AUTO_INCREMENT,
   category_name VARCHAR(255),
   PRIMARY KEY(Id_Category)
);

CREATE TABLE Anime(
   Id_Anime INT AUTO_INCREMENT,
   Anime_name VARCHAR(255),
   manga_category VARCHAR(255),
   PRIMARY KEY(Id_Anime)
);

CREATE TABLE Product(
   Id_Product INT AUTO_INCREMENT,
   name VARCHAR(255),
   description VARCHAR(255),
   price INT,
   stock INT,
   image_url VARCHAR(255),
   Id_Anime INT NOT NULL,
   PRIMARY KEY(Id_Product),
   FOREIGN KEY(Id_Anime) REFERENCES Anime(Id_Anime)
);

CREATE TABLE Cart(
   Id_Cart INT AUTO_INCREMENT,
   date_creation DATETIME,
   Id_Client INT NOT NULL,
   PRIMARY KEY(Id_Cart),
   UNIQUE(Id_Client),
   FOREIGN KEY(Id_Client) REFERENCES Client(Id_Client)
);

CREATE TABLE Avis(
   Id_Avis INT AUTO_INCREMENT,
   note VARCHAR(255),
   date_avis DATETIME,
   content VARCHAR(255),
   Id_Product INT NOT NULL,
   Id_Client INT NOT NULL,
   PRIMARY KEY(Id_Avis),
   FOREIGN KEY(Id_Product) REFERENCES Product(Id_Product),
   FOREIGN KEY(Id_Client) REFERENCES Client(Id_Client)
);

CREATE TABLE Favoris(
   Id_Favoris INT AUTO_INCREMENT,
   date_ajout DATETIME,
   Id_Client INT NOT NULL,
   Id_Product INT NOT NULL,
   PRIMARY KEY(Id_Favoris),
   FOREIGN KEY(Id_Client) REFERENCES Client(Id_Client),
   FOREIGN KEY(Id_Product) REFERENCES Product(Id_Product)
);

CREATE TABLE Cart_Item(
   Id_Cart_Item INT AUTO_INCREMENT,
   quantitee VARCHAR(255),
   Id_Product INT NOT NULL,
   Id_Cart INT NOT NULL,
   PRIMARY KEY(Id_Cart_Item),
   UNIQUE(Id_Product),
   FOREIGN KEY(Id_Product) REFERENCES Product(Id_Product),
   FOREIGN KEY(Id_Cart) REFERENCES Cart(Id_Cart)
);

CREATE TABLE assigner(
   Id_Product INT,
   Id_Category INT,
   PRIMARY KEY(Id_Product, Id_Category),
   FOREIGN KEY(Id_Product) REFERENCES Product(Id_Product),
   FOREIGN KEY(Id_Category) REFERENCES Category(Id_Category)
);
