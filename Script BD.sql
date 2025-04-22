CREATE DATABASE IF NOT EXISTS PruebaTecnicaEvoltis;

USE PruebaTecnicaEvoltis;

-- Tabla de Marcas
CREATE TABLE IF NOT EXISTS Brands (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL
);

-- Tabla de Categorías (con jerarquía)
CREATE TABLE IF NOT EXISTS Categories (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    ParentCategoryId INT NULL,
    FOREIGN KEY (ParentCategoryId) REFERENCES Categories(Id)
        ON DELETE SET NULL ON UPDATE CASCADE
);

-- Tabla de Productos (con relación directa a Categoría)
CREATE TABLE IF NOT EXISTS Products (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    Stock INT NOT NULL,
    Description TEXT,
    ImageUrl VARCHAR(500),
    BrandId INT NOT NULL,
    CategoryId INT NOT NULL, -- Nueva columna para la relación 1:N
    FOREIGN KEY (BrandId) REFERENCES Brands(Id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (CategoryId) REFERENCES Categories(Id) -- Clave foránea a Categories
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- ⚠️ Eliminamos la tabla ProductCategory (ya no es necesaria)
DROP TABLE IF EXISTS ProductCategory;