-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: whatsapp_pg
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `flat_id` int DEFAULT NULL,
  `room_number` int NOT NULL,
  `sharing` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `flat_id` (`flat_id`),
  CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`flat_id`) REFERENCES `flats` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,1,1,'3'),(2,1,2,'3'),(3,1,3,'3'),(4,2,1,'4'),(5,2,2,'4'),(6,2,3,'1'),(7,3,1,'1'),(8,3,2,'1'),(9,3,3,'1'),(10,4,1,'4'),(11,4,2,'3'),(12,4,3,'3'),(13,5,1,'2'),(14,5,2,'2'),(15,5,3,'2'),(16,6,1,'2'),(17,6,2,'3'),(18,6,3,'3'),(19,7,1,'3'),(20,7,2,'3'),(21,7,3,'3'),(22,8,1,'3'),(23,8,2,'3'),(24,8,3,'3'),(25,9,1,'3'),(26,9,2,'3'),(27,9,3,'3'),(28,10,1,'3'),(29,10,2,'3'),(30,10,3,'3'),(31,11,1,'3'),(32,11,2,'3'),(33,11,3,'3'),(34,12,1,'3'),(35,12,2,'4'),(36,12,3,'4'),(37,13,1,'4'),(38,13,2,'4'),(39,13,3,'4'),(40,14,1,'4'),(41,14,2,'4'),(42,14,3,'4'),(43,15,1,'4'),(44,15,2,'4'),(45,15,3,'4'),(46,16,1,'4'),(47,16,2,'4'),(48,16,3,'4'),(49,17,1,'4'),(50,17,2,'4'),(51,17,3,'4'),(52,18,1,'4'),(53,18,2,'4'),(54,18,3,'4');
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-02 18:19:08
