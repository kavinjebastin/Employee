CREATE DATABASE people;
USE people;

CREATE TABLE `people`.`employee` (
  `id` BIGINT(15) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `company_name` VARCHAR(45) NULL,
  `role` VARCHAR(45) NULL,
  `salary`  DOUBLE NULL DEFAULT NULL,
  `phone_number` BIGINT(15) NOT NULL,
  `email` VARCHAR(55) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `phone_number_UNIQUE` (`phone_number` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);
  

  
INSERT INTO `people`.`employee` (`id`, `name`, `company_name`, `role`, `salary`, `phone_number`, `email`) VALUES ('1', 'Kavin Jebastin', 'Clarity TTS', 'Graduate Engineer Trainee', '30000.99', '8248764615', 'sp.kavin@claritytts.com');

