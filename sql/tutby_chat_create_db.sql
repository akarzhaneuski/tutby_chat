CREATE DATABASE IF NOT EXISTS tutby_chat;

CREATE TABLE IF NOT EXISTS `tutby_chat`.`users` (
  `id` INT(6) NOT NULL AUTO_INCREMENT ,
  `login` VARCHAR(30) NOT NULL ,
  `password` VARCHAR(45) NOT NULL ,
  `status_id` INT(2) NOT NULL DEFAULT 0 ,
  `avatar` INT(2) NOT NULL ,
  `status_message` VARCHAR(45) NULL ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
  UNIQUE INDEX `login_UNIQUE` (`login` ASC) );

CREATE TABLE IF NOT EXISTS `tutby_chat`.`status` (
  `id` INT(2) NOT NULL AUTO_INCREMENT ,
  `description` VARCHAR(20) NULL ,
  PRIMARY KEY (`id`) );

CREATE TABLE IF NOT EXISTS  `tutby_chat`.`friend` (
  `giving` INT(6) NOT NULL ,
  `accepting` INT(6) NOT NULL );

CREATE  TABLE IF NOT EXISTS `tutby_chat`.`messeges` (
  `id` INT(9) NOT NULL AUTO_INCREMENT ,
  `id_sender` INT(6) NOT NULL ,
  `id_target` INT(6) NOT NULL ,
  `message` VARCHAR(1000) NULL ,
  `time` DATETIME NOT NULL ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) );

ALTER TABLE `tutby_chat`.`messeges` CHANGE COLUMN `id_sender` `user` VARCHAR(30) NOT NULL  ,
 CHANGE COLUMN `id_target` `id_conference` INT(9) NOT NULL  ;

 CREATE  TABLE `tutby_chat`.`conference` (
   `id` INT NOT NULL ,
   `user_id` INT(9) NULL );

   ALTER TABLE `tutby_chat`.users DROP index id_UNIQUE;
   ALTER TABLE `tutby_chat`.friend ADD index (giving, accepting);

   insert into `tutby_chat`.users
   value
   (1,'Adminius','12345',0,0,'offline')
   ;
   insert into status
   values
   (1,'online'),(2,'away'),(3,'busy'),(4,'offline')
   ;
--    messAges
--    user ID
--   delete unique id
--   varchar 1000
-- add index
-- mysqldump