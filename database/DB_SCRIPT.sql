-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Artesanias
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Artesanias
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Artesanias` DEFAULT CHARACTER SET utf8 ;
USE `Artesanias` ;

-- -----------------------------------------------------
-- Table `Artesanias`.`Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Artesanias`.`Usuarios` (
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
  PRIMARY KEY (`_id`, `tipo_id`))
;


-- -----------------------------------------------------
-- Table `Artesanias`.`Roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Artesanias`.`Roles` (
  `_id` VARCHAR(100) NULL,
  `tipo` ENUM('Cliente', 'Artesano', 'Admin') NOT NULL,
  `Usuarios__id` VARCHAR(15) CHARACTER SET 'big5' NOT NULL,
  `Usuarios_tipo_id` ENUM('CC', 'CE', 'TI', 'PAS') NOT NULL,
  PRIMARY KEY (`_id`),
  INDEX `fk_Roles_Usuarios1_idx` (`Usuarios__id` ASC, `Usuarios_tipo_id` ASC) VISIBLE,
  CONSTRAINT `fk_Roles_Usuarios1`
    FOREIGN KEY (`Usuarios__id` , `Usuarios_tipo_id`)
    REFERENCES `Artesanias`.`Usuarios` (`_id` , `tipo_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table `Artesanias`.`Categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Artesanias`.`Categorias` (
  `_id` VARCHAR(100) NOT NULL,
  `nombre_categoria` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`_id`))
;


-- -----------------------------------------------------
-- Table `Artesanias`.`Productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Artesanias`.`Productos` (
  `_id` VARCHAR(100) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(100) NOT NULL,
  `stock` INT NOT NULL,
  `valor_compra` FLOAT NOT NULL,
  `valor_venta` FLOAT NOT NULL,
  `imagen` VARCHAR(45) NOT NULL,
  `Categorias__id` VARCHAR(100) NOT NULL,
  `Usuarios__id` VARCHAR(15) CHARACTER SET 'big5' NOT NULL,
  `Usuarios_tipo_id` ENUM('CC', 'CE', 'TI', 'PAS') NOT NULL,
  PRIMARY KEY (`_id`),
  INDEX `fk_Productos_Categorias1_idx` (`Categorias__id` ASC) VISIBLE,
  INDEX `fk_Productos_Usuarios1_idx` (`Usuarios__id` ASC, `Usuarios_tipo_id` ASC) VISIBLE,
  CONSTRAINT `fk_Productos_Categorias1`
    FOREIGN KEY (`Categorias__id`)
    REFERENCES `Artesanias`.`Categorias` (`_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Productos_Usuarios1`
    FOREIGN KEY (`Usuarios__id` , `Usuarios_tipo_id`)
    REFERENCES `Artesanias`.`Usuarios` (`_id` , `tipo_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table `Artesanias`.`MetodoPagoCompra`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Artesanias`.`MetodoPagoCompra` (
  `_id` VARCHAR(100) NOT NULL,
  `medio` ENUM('TDebito', 'TCredito', 'Efectivo', 'Transferencia') NOT NULL,
  `detalles` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`_id`))
;


-- -----------------------------------------------------
-- Table `Artesanias`.`Facturas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Artesanias`.`Facturas` (
  `_id` VARCHAR(100) NOT NULL,
  `fecha` DATE NOT NULL,
  `estado` ENUM('EnProceso', 'Cancelado', 'Entregado') NOT NULL,
  `Usuarios__id` VARCHAR(15) CHARACTER SET 'big5' NOT NULL,
  `Usuarios_tipo_id` ENUM('CC', 'CE', 'TI', 'PAS') NOT NULL,
  `MetodoPagoCompra__id` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`_id`),
  INDEX `fk_Facturas_Usuarios1_idx` (`Usuarios__id` ASC, `Usuarios_tipo_id` ASC) VISIBLE,
  INDEX `fk_Facturas_MetodoPagoCompra1_idx` (`MetodoPagoCompra__id` ASC) VISIBLE,
  CONSTRAINT `fk_Facturas_Usuarios1`
    FOREIGN KEY (`Usuarios__id` , `Usuarios_tipo_id`)
    REFERENCES `Artesanias`.`Usuarios` (`_id` , `tipo_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Facturas_MetodoPagoCompra1`
    FOREIGN KEY (`MetodoPagoCompra__id`)
    REFERENCES `Artesanias`.`MetodoPagoCompra` (`_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table `Artesanias`.`DetallesFactura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Artesanias`.`DetallesFactura` (
  `_id` VARCHAR(100) NOT NULL,
  `cantidad` INT NOT NULL,
  `precio` FLOAT NOT NULL,
  `subtotal` FLOAT NOT NULL,
  `Facturas__id` VARCHAR(100) NOT NULL,
  `Productos__id` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`_id`),
  INDEX `fk_DetallesFactura_Facturas1_idx` (`Facturas__id` ASC) VISIBLE,
  INDEX `fk_DetallesFactura_Productos1_idx` (`Productos__id` ASC) VISIBLE,
  CONSTRAINT `fk_DetallesFactura_Facturas1`
    FOREIGN KEY (`Facturas__id`)
    REFERENCES `Artesanias`.`Facturas` (`_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_DetallesFactura_Productos1`
    FOREIGN KEY (`Productos__id`)
    REFERENCES `Artesanias`.`Productos` (`_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table `Artesanias`.`Credenciales`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Artesanias`.`Credenciales` (
  `_id` VARCHAR(100) NOT NULL,
  `usuario` VARCHAR(45) NOT NULL UNIQUE,
  `contrasena` VARCHAR(45) NOT NULL,
  `Usuarios__id` VARCHAR(15) CHARACTER SET 'big5' NOT NULL,
  `Usuarios_tipo_id` ENUM('CC', 'CE', 'TI', 'PAS') NOT NULL,
  PRIMARY KEY (`_id`),
  INDEX `fk_Credenciales_Usuarios1_idx` (`Usuarios__id` ASC, `Usuarios_tipo_id` ASC) VISIBLE,
  CONSTRAINT `fk_Credenciales_Usuarios1`
    FOREIGN KEY (`Usuarios__id` , `Usuarios_tipo_id`)
    REFERENCES `Artesanias`.`Usuarios` (`_id` , `tipo_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table `Artesanias`.`VideosArtesanos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Artesanias`.`VideosArtesanos` (
  `_id` VARCHAR(100) NOT NULL,
  `url_video` VARCHAR(45) NOT NULL,
  `titulo` VARCHAR(45) NOT NULL,
  `fecha` DATE NOT NULL,
  `descripcion` VARCHAR(100) NOT NULL,
  `Usuarios__id` VARCHAR(15) CHARACTER SET 'big5' NOT NULL,
  `Usuarios_tipo_id` ENUM('CC', 'CE', 'TI', 'PAS') NOT NULL,
  PRIMARY KEY (`_id`),
  INDEX `fk_VideosArtesanos_Usuarios1_idx` (`Usuarios__id` ASC, `Usuarios_tipo_id` ASC) VISIBLE,
  CONSTRAINT `fk_VideosArtesanos_Usuarios1`
    FOREIGN KEY (`Usuarios__id` , `Usuarios_tipo_id`)
    REFERENCES `Artesanias`.`Usuarios` (`_id` , `tipo_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table `Artesanias`.`IngresosLogs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Artesanias`.`IngresosLogs` (
  `_id` VARCHAR(100) NOT NULL,
  `log` VARCHAR(100) NOT NULL,
  `fecha` DATETIME NOT NULL,
  `Usuarios__id` VARCHAR(15) CHARACTER SET 'big5' NOT NULL,
  `Usuarios_tipo_id` ENUM('CC', 'CE', 'TI', 'PAS') NOT NULL,
  PRIMARY KEY (`_id`),
  INDEX `fk_IngresosLogs_Usuarios1_idx` (`Usuarios__id` ASC, `Usuarios_tipo_id` ASC) VISIBLE,
  CONSTRAINT `fk_IngresosLogs_Usuarios1`
    FOREIGN KEY (`Usuarios__id` , `Usuarios_tipo_id`)
    REFERENCES `Artesanias`.`Usuarios` (`_id` , `tipo_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table `Artesanias`.`CarritoCompras`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Artesanias`.`CarritoCompras` (
  `_id` INT NOT NULL AUTO_INCREMENT,
  `Usuarios__id` VARCHAR(15) CHARACTER SET 'big5' NOT NULL,
  `Usuarios_tipo_id` ENUM('CC', 'CE', 'TI', 'PAS') NOT NULL,
  `Productos__id` VARCHAR(100) NOT NULL,
  `cantidad` INT NOT NULL,
  PRIMARY KEY (`_id`),
  INDEX `fk_CarritoCompras_Usuarios1_idx` (`Usuarios__id` ASC, `Usuarios_tipo_id` ASC) VISIBLE,
  INDEX `fk_CarritoCompras_Productos1_idx` (`Productos__id` ASC) VISIBLE,
  CONSTRAINT `fk_CarritoCompras_Usuarios1`
    FOREIGN KEY (`Usuarios__id` , `Usuarios_tipo_id`)
    REFERENCES `Artesanias`.`Usuarios` (`_id` , `tipo_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_CarritoCompras_Productos1`
    FOREIGN KEY (`Productos__id`)
    REFERENCES `Artesanias`.`Productos` (`_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
