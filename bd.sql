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
