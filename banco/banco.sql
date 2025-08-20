-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema ecoquiz
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ecoquiz
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ecoquiz` DEFAULT CHARACTER SET utf8mb4 ;
USE `ecoquiz` ;

-- -----------------------------------------------------
-- Table `ecoquiz`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecoquiz`.`usuarios` (
  `idUsuario` INT(11) NOT NULL AUTO_INCREMENT,
  `dataCadastro` DATETIME NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`idUsuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ecoquiz`.`respostas_agua`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecoquiz`.`respostas_agua` (
  `idResposta` INT(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` INT(11) NULL DEFAULT NULL,
  `litrosPorDia` DECIMAL(10,2) NULL DEFAULT NULL,
  `tipoBanho` VARCHAR(50) NULL DEFAULT NULL,
  `usoReuso` TINYINT(1) NULL DEFAULT NULL,
  `dataResposta` DATETIME NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`idResposta`),
  INDEX `idUsuario` (`idUsuario` ASC) VISIBLE,
  CONSTRAINT `respostas_agua_ibfk_1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `ecoquiz`.`usuarios` (`idUsuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ecoquiz`.`respostas_lampadas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecoquiz`.`respostas_lampadas` (
  `idResposta` INT(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` INT(11) NULL DEFAULT NULL,
  `tipo` VARCHAR(50) NOT NULL,
  `nLampadas` INT(11) NOT NULL,
  `nHoras` INT(11) NOT NULL,
  `gasto` DECIMAL(10,2) NOT NULL,
  `dataResposta` DATETIME NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`idResposta`),
  INDEX `idUsuario` (`idUsuario` ASC) VISIBLE,
  CONSTRAINT `respostas_lampadas_ibfk_1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `ecoquiz`.`usuarios` (`idUsuario`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ecoquiz`.`respostas_lixo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecoquiz`.`respostas_lixo` (
  `idResposta` INT(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` INT(11) NULL DEFAULT NULL,
  `recicla` TINYINT(1) NULL DEFAULT NULL,
  `tipoLixoMaisGerado` VARCHAR(100) NULL DEFAULT NULL,
  `dataResposta` DATETIME NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`idResposta`),
  INDEX `idUsuario` (`idUsuario` ASC) VISIBLE,
  CONSTRAINT `respostas_lixo_ibfk_1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `ecoquiz`.`usuarios` (`idUsuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ecoquiz`.`respostas_transporte`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecoquiz`.`respostas_transporte` (
  `idResposta` INT(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` INT(11) NULL DEFAULT NULL,
  `tipoTransporte` VARCHAR(50) NULL DEFAULT NULL,
  `kmPorDia` DECIMAL(5,2) NULL DEFAULT NULL,
  `combustivel` VARCHAR(50) NULL DEFAULT NULL,
  `dataResposta` DATETIME NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`idResposta`),
  INDEX `idUsuario` (`idUsuario` ASC) VISIBLE,
  CONSTRAINT `respostas_transporte_ibfk_1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `ecoquiz`.`usuarios` (`idUsuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


















-------------------------------------------------------------------------------------------------------------------



-- Criar schema ecoquiz
CREATE SCHEMA IF NOT EXISTS `ecoquiz` 
  DEFAULT CHARACTER SET utf8mb4 
  COLLATE utf8mb4_general_ci;
USE `ecoquiz`;

-- Tabela usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `dataCadastro` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB 
  DEFAULT CHARSET=utf8mb4 
  COLLATE=utf8mb4_general_ci;

-- Tabela respostas_agua
CREATE TABLE IF NOT EXISTS `respostas_agua` (
  `idResposta` INT NOT NULL AUTO_INCREMENT,
  `idUsuario` INT NULL,
  `litrosPorDia` DECIMAL(10,2) NULL,
  `tipoBanho` VARCHAR(50) NULL,
  `usoReuso` TINYINT(1) NULL,
  `dataResposta` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idResposta`),
  INDEX `idUsuario` (`idUsuario` ASC),
  CONSTRAINT `respostas_agua_ibfk_1` FOREIGN KEY (`idUsuario`)
    REFERENCES `usuarios` (`idUsuario`)
) ENGINE=InnoDB 
  DEFAULT CHARSET=utf8mb4 
  COLLATE=utf8mb4_general_ci;

-- Tabela respostas_lampadas
CREATE TABLE IF NOT EXISTS `respostas_lampadas` (
  `idResposta` INT NOT NULL AUTO_INCREMENT,
  `idUsuario` INT NULL,
  `tipo` VARCHAR(50) NOT NULL,
  `nLampadas` INT NOT NULL,
  `nHoras` INT NOT NULL,
  `gasto` DECIMAL(10,2) NOT NULL,
  `dataResposta` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idResposta`),
  INDEX `idUsuario` (`idUsuario` ASC),
  CONSTRAINT `respostas_lampadas_ibfk_1` FOREIGN KEY (`idUsuario`)
    REFERENCES `usuarios` (`idUsuario`)
) ENGINE=InnoDB 
  DEFAULT CHARSET=utf8mb4 
  COLLATE=utf8mb4_general_ci;

-- Tabela respostas_lixo
CREATE TABLE IF NOT EXISTS `respostas_lixo` (
  `idResposta` INT NOT NULL AUTO_INCREMENT,
  `idUsuario` INT NULL,
  `recicla` TINYINT(1) NULL,
  `tipoLixoMaisGerado` VARCHAR(100) NULL,
  `dataResposta` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idResposta`),
  INDEX `idUsuario` (`idUsuario` ASC),
  CONSTRAINT `respostas_lixo_ibfk_1` FOREIGN KEY (`idUsuario`)
    REFERENCES `usuarios` (`idUsuario`)
) ENGINE=InnoDB 
  DEFAULT CHARSET=utf8mb4 
  COLLATE=utf8mb4_general_ci;

-- Tabela respostas_transporte
CREATE TABLE IF NOT EXISTS `respostas_transporte` (
  `idResposta` INT NOT NULL AUTO_INCREMENT,
  `idUsuario` INT NULL,
  `tipoTransporte` VARCHAR(50) NULL,
  `kmPorDia` DECIMAL(5,2) NULL,
  `combustivel` VARCHAR(50) NULL,
  `dataResposta` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idResposta`),
  INDEX `idUsuario` (`idUsuario` ASC),
  CONSTRAINT `respostas_transporte_ibfk_1` FOREIGN KEY (`idUsuario`)
    REFERENCES `usuarios` (`idUsuario`)
) ENGINE=InnoDB 
  DEFAULT CHARSET=utf8mb4 
  COLLATE=utf8mb4_general_ci;
  
  

  
GRANT ALL PRIVILEGES ON ecoquiz.* TO 'ju'@'%' IDENTIFIED BY 'senha';
FLUSH PRIVILEGES;
