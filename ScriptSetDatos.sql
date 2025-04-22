-- 3.1 Marcas
INSERT INTO Brands (Name) VALUES
('Apple'),
('Samsung'),
('Sony'),
('Logitech'),
('Microsoft'),
('Asus'),
('Dell'),
('HP');

-- 3.2 Categorías (estructura jerárquica coherente)
INSERT INTO Categories (Name, ParentCategoryId) VALUES
-- Nivel 1: Categorías principales
('Electrónica', NULL),
('Computación', NULL),
('Audio', NULL),
('Gaming', NULL),

-- Nivel 2: Subcategorías de "Electrónica"
('Smartphones', 1),
('Tablets', 1),

-- Nivel 2: Subcategorías de "Computación"
('Portátiles', 2),
('Teclados', 2),
('Monitores', 2),

-- Nivel 2: Subcategorías de "Audio"
('Auriculares', 3),
('Altavoces', 3),

-- Nivel 2: Subcategorías de "Gaming"
('Consolas', 4),
('Periféricos Gaming', 4);

-- 3.3 Productos (asignando CategoryId directamente)
INSERT INTO Products (Name, Price, Stock, Description, ImageUrl, BrandId, CategoryId) VALUES
-- Electrónica > Smartphones
('Galaxy Z Fold 4', 1799.99, 10, 'Smartphone plegable.', 'https://example.com/galaxyzfold4.jpg', 2, 5),

-- Computación > Portátiles
('MacBook Pro 16"', 2499.00, 5, 'Portátil Apple con chip M1 Pro.', 'https://example.com/macbookpro16.jpg', 1, 6),
('Surface Laptop 4', 1199.00, 7, 'Portátil ultraligero.', 'https://example.com/surface_l4.jpg', 5, 6),
('ROG Strix G15', 1499.00, 8, 'Notebook gaming.', 'https://example.com/rog_strix_g15.jpg', 6, 6),
('XPS 13', 1399.00, 6, 'Portátil ultraportátil.', 'https://example.com/xps13.jpg', 7, 6),
('ENVY 15', 1099.00, 9, 'Notebook para creadores.', 'https://example.com/hp_envy15.jpg', 8, 6),

-- Electrónica > Tablets
('iPad Pro 12.9"', 999.00, 12, 'Tablet Apple.', 'https://example.com/ipadpro12.jpg', 1, 6),
('Galaxy Tab S8', 649.99, 14, 'Tablet Samsung.', 'https://example.com/tab_s8.jpg', 2, 6),

-- Audio > Auriculares
('Sony WH-1000XM4', 349.99, 18, 'Auriculares con cancelación de ruido.', 'https://example.com/wh1000xm4.jpg', 3, 8),

-- Gaming > Consolas
('PlayStation 5', 499.99, 20, 'Consola de nueva generación.', 'https://example.com/ps5.jpg', 3, 10),

-- Computación > Teclados
('Teclado G Pro X', 129.99, 15, 'Teclado mecánico para gaming.', 'https://example.com/logitech_gprox.jpg', 4, 7);