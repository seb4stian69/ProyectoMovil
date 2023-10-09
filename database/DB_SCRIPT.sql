-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Artesanias
-- -----------------------------------------------------

CREATE DATABASE IF NOT EXISTS `Artesanias` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `Artesanias`;

-- -----------------------------------------------------
-- Table `Artesanias`.`Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Usuarios` (
  `_id` VARCHAR(15) CHARACTER SET 'big5' NOT NULL,
  `tipo_id` ENUM('CC', 'CE', 'TI', 'PAS') NOT NULL,
  `primer_nombre` VARCHAR(45) NOT NULL,
  `segundo_nombre` VARCHAR(45) NULL,
  `primer_apellido` VARCHAR(45) NOT NULL,
  `segundo_apellido` VARCHAR(45) NULL,
  `fecha_nacimiento` VARCHAR(45) NOT NULL,
  `telefono` VARCHAR(45) NOT NULL,
  `direccion` VARCHAR(45) NOT NULL,
  `correo` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`_id`, `tipo_id`)
);

-- -----------------------------------------------------
-- Table `Artesanias`.`Roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Roles` (
  `_id` VARCHAR(100) NOT NULL,
  `tipo` ENUM('Cliente', 'Artesano', 'Admin') NOT NULL,
  `Usuarios__id` VARCHAR(15) CHARACTER SET 'big5' NOT NULL,
  `Usuarios_tipo_id` ENUM('CC', 'CE', 'TI', 'PAS') NOT NULL,
  PRIMARY KEY (`_id`),
  INDEX `fk_Roles_Usuarios1_idx` (`Usuarios__id`, `Usuarios_tipo_id`) VISIBLE,
  CONSTRAINT `fk_Roles_Usuarios1`
    FOREIGN KEY (`Usuarios__id`, `Usuarios_tipo_id`)
    REFERENCES `Usuarios` (`_id`, `tipo_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table `Artesanias`.`Categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Categorias` (
  `_id` VARCHAR(100) NOT NULL,
  `nombre_categoria` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`_id`)
);

-- -----------------------------------------------------
-- Table `Artesanias`.`Productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Productos` (
  `_id` VARCHAR(100) NOT NULL,
  `precio` FLOAT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(100) NOT NULL,
  `stock` INT NOT NULL,
  `valor_compra` FLOAT NOT NULL,
  `valor_venta` FLOAT NOT NULL,
  `imagen` VARCHAR(45) NOT NULL,
  `Categorias__id` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`_id`),
  INDEX `fk_Productos_Categorias1_idx` (`Categorias__id`) VISIBLE,
  CONSTRAINT `fk_Productos_Categorias1`
    FOREIGN KEY (`Categorias__id`)
    REFERENCES `Categorias` (`_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table `Artesanias`.`Pedidos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Pedidos` (
  `_id` VARCHAR(100) NOT NULL,
  `estado` ENUM('Confirmado', 'EnProceso', 'Entregado', 'Cancelado') NOT NULL,
  `fecha` DATETIME NOT NULL,
  `Usuarios__id` VARCHAR(15) CHARACTER SET 'big5' NOT NULL,
  `Usuarios_tipo_id` ENUM('CC', 'CE', 'TI', 'PAS') NOT NULL,
  PRIMARY KEY (`_id`),
  INDEX `fk_Pedidos_Usuarios1_idx` (`Usuarios__id`, `Usuarios_tipo_id`) VISIBLE,
  CONSTRAINT `fk_Pedidos_Usuarios1`
    FOREIGN KEY (`Usuarios__id`, `Usuarios_tipo_id`)
    REFERENCES `Usuarios` (`_id`, `tipo_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table `Artesanias`.`MetodoPagoCompra`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MetodoPagoCompra` (
  `_id` VARCHAR(100) NOT NULL,
  `medio` ENUM('TDebito', 'TCredito', 'Efectivo', 'Transferencia') NOT NULL,
  `detalles` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`_id`)
);

-- -----------------------------------------------------
-- Table `Artesanias`.`Facturas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Facturas` (
  `_id` VARCHAR(100) NOT NULL,
  `fecha` DATE NOT NULL,
  `MetodoPagoCompra__id` VARCHAR(100) NOT NULL,
  `Usuarios__id` VARCHAR(15) CHARACTER SET 'big5' NOT NULL,
  `Usuarios_tipo_id` ENUM('CC', 'CE', 'TI', 'PAS') NOT NULL,
  PRIMARY KEY (`_id`),
  INDEX `fk_Facturas_MetodoPagoCompra1_idx` (`MetodoPagoCompra__id`) VISIBLE,
  INDEX `fk_Facturas_Usuarios1_idx` (`Usuarios__id`, `Usuarios_tipo_id`) VISIBLE,
  CONSTRAINT `fk_Facturas_MetodoPagoCompra1`
    FOREIGN KEY (`MetodoPagoCompra__id`)
    REFERENCES `MetodoPagoCompra` (`_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Facturas_Usuarios1`
    FOREIGN KEY (`Usuarios__id`, `Usuarios_tipo_id`)
    REFERENCES `Usuarios` (`_id`, `tipo_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table `Artesanias`.`DetallesFactura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DetallesFactura` (
  `_id` VARCHAR(100) NOT NULL,
  `cantidad` INT NOT NULL,
  `precio` FLOAT NOT NULL,
  `subtotal` FLOAT NOT NULL,
  `Facturas__id` VARCHAR(100) NOT NULL,
  `Productos__id` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`_id`),
  INDEX `fk_Detalles_Facturas1_idx` (`Facturas__id`) VISIBLE,
  INDEX `fk_Detalles_Productos1_idx` (`Productos__id`) VISIBLE,
  CONSTRAINT `fk_Detalles_Facturas1`
    FOREIGN KEY (`Facturas__id`)
    REFERENCES `Facturas` (`_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Detalles_Productos1`
    FOREIGN KEY (`Productos__id`)
    REFERENCES `Productos` (`_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table `Artesanias`.`PedidosEnLinea`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PedidosEnLinea` (
  `_id` VARCHAR(100) NOT NULL,
  `Pedidos__id` VARCHAR(100) NOT NULL,
  `Productos__id` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`_id`, `Pedidos__id`, `Productos__id`),
  INDEX `fk_PedidosEnLinea_Pedidos1_idx` (`Pedidos__id`) VISIBLE,
  INDEX `fk_PedidosEnLinea_Productos1_idx` (`Productos__id`) VISIBLE,
  CONSTRAINT `fk_PedidosEnLinea_Pedidos1`
    FOREIGN KEY (`Pedidos__id`)
    REFERENCES `Pedidos` (`_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PedidosEnLinea_Productos1`
    FOREIGN KEY (`Productos__id`)
    REFERENCES `Productos` (`_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table `Artesanias`.`Credenciales`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Credenciales` (
  `_id` VARCHAR(100) NOT NULL,
  `usuario` VARCHAR(45) NOT NULL,
  `contrasena` VARCHAR(45) NOT NULL,
  `Usuarios__id` VARCHAR(15) CHARACTER SET 'big5' NOT NULL,
  `Usuarios_tipo_id` ENUM('CC', 'CE', 'TI', 'PAS') NOT NULL,
  PRIMARY KEY (`_id`),
  INDEX `fk_Credenciales_Usuarios1_idx` (`Usuarios__id`, `Usuarios_tipo_id`) VISIBLE,
  CONSTRAINT `fk_Credenciales_Usuarios1`
    FOREIGN KEY (`Usuarios__id`, `Usuarios_tipo_id`)
    REFERENCES `Usuarios` (`_id`, `tipo_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table `Artesanias`.`VideosArtesanos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `VideosArtesanos` (
  `_id` VARCHAR(100) NOT NULL,
  `url_video` VARCHAR(45) NOT NULL,
  `titulo` VARCHAR(45) NOT NULL,
  `fecha` DATE NOT NULL,
  `descripcion` VARCHAR(100) NOT NULL,
  `Usuarios__id` VARCHAR(15) CHARACTER SET 'big5' NOT NULL,
  `Usuarios_tipo_id` ENUM('CC', 'CE', 'TI', 'PAS') NOT NULL,
  PRIMARY KEY (`_id`),
  INDEX `fk_VideosArtesanos_Usuarios1_idx` (`Usuarios__id`, `Usuarios_tipo_id`) VISIBLE,
  CONSTRAINT `fk_VideosArtesanos_Usuarios1`
    FOREIGN KEY (`Usuarios__id`, `Usuarios_tipo_id`)
    REFERENCES `Usuarios` (`_id`, `tipo_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table `Artesanias`.`IngresosLogs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `IngresosLogs` (
  `_id` VARCHAR(100) NOT NULL,
  `log` VARCHAR(100) NOT NULL,
  `fecha` DATETIME NOT NULL,
  `Usuarios__id` VARCHAR(15) CHARACTER SET 'big5' NOT NULL,
  `Usuarios_tipo_id` ENUM('CC', 'CE', 'TI', 'PAS') NOT NULL,
  PRIMARY KEY (`_id`),
  INDEX `fk_IngresosLogs_Usuarios1_idx` (`Usuarios__id`, `Usuarios_tipo_id`) VISIBLE,
  CONSTRAINT `fk_IngresosLogs_Usuarios1`
    FOREIGN KEY (`Usuarios__id`, `Usuarios_tipo_id`)
    REFERENCES `Usuarios` (`_id`, `tipo_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
