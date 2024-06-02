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
-- Table structure for table `phone_numbers`
--

DROP TABLE IF EXISTS `phone_numbers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phone_numbers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `phone_number` varchar(255) DEFAULT NULL,
  `conversation_type` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phone_numbers`
--

LOCK TABLES `phone_numbers` WRITE;
/*!40000 ALTER TABLE `phone_numbers` DISABLE KEYS */;
INSERT INTO `phone_numbers` VALUES (1,'917760372901','room details','2024-06-02 07:39:54'),(2,'917760372901','room details','2024-06-02 07:41:14'),(3,'917760372901','room details','2024-06-02 07:43:13'),(4,'917760372901','1 sharing','2024-06-02 07:44:23'),(5,'917760372901','greeting','2024-06-02 08:01:34'),(6,'917760372901','room details','2024-06-02 08:01:37'),(7,'917760372901','amenities','2024-06-02 08:01:45'),(8,'917760372901','location and directions','2024-06-02 08:01:50'),(9,'917760372901','1 sharing','2024-06-02 08:02:08'),(10,'917760372901','2 sharing','2024-06-02 08:02:13'),(11,'917760372901','3 sharing','2024-06-02 08:02:20'),(12,'917760372901','greeting','2024-06-02 08:07:11'),(13,'917760372901','1 sharing','2024-06-02 08:07:19'),(14,'917760372901','1 sharing','2024-06-02 08:07:42'),(15,'917760372901','1 sharing','2024-06-02 08:11:23'),(16,'917760372901','1 sharing','2024-06-02 08:12:18'),(17,'917760372901','greeting','2024-06-02 08:17:53'),(18,'917760372901','1 sharing','2024-06-02 08:32:38'),(19,'917760372901','2 sharing','2024-06-02 08:33:31'),(20,'917760372901','3 sharing','2024-06-02 08:33:35'),(21,'917760372901','4 sharing','2024-06-02 08:34:22'),(22,'917760372901','3 sharing','2024-06-02 08:35:02'),(23,'917760372901','greeting','2024-06-02 08:35:46'),(24,'917760372901','2 sharing','2024-06-02 08:35:53'),(25,'917760372901','4 sharing','2024-06-02 08:39:18'),(26,'917760372901','4 sharing','2024-06-02 08:40:36'),(27,'919901184938','greeting','2024-06-02 08:41:33'),(28,'919901184938','room details','2024-06-02 08:41:37'),(29,'919901184938','4 sharing','2024-06-02 08:41:52'),(30,'917760372901','4 sharing','2024-06-02 08:44:35'),(31,'917760372901','greeting','2024-06-02 08:46:01'),(32,'917760372901','2 sharing','2024-06-02 08:46:08'),(33,'917760372901','3 sharing','2024-06-02 08:46:10'),(34,'917760372901','3 sharing','2024-06-02 08:47:03'),(35,'917760372901','greeting','2024-06-02 08:48:30'),(36,'917760372901','3 sharing','2024-06-02 08:48:44'),(37,'917760372901','greeting','2024-06-02 08:49:46'),(38,'917760372901','3 sharing','2024-06-02 08:50:15'),(39,'917760372901','4 sharing','2024-06-02 08:56:44'),(40,'917760372901','3 sharing','2024-06-02 08:57:47'),(41,'917760372901','2 sharing','2024-06-02 08:58:33'),(42,'917760372901','2 sharing','2024-06-02 09:01:27'),(43,'917760372901','3 sharing','2024-06-02 09:02:48'),(44,'917760372901','3 sharing','2024-06-02 09:04:41'),(45,'917760372901','3 sharing','2024-06-02 09:06:02'),(46,'917760372901','3 sharing','2024-06-02 09:06:20'),(47,'917760372901','4 sharing','2024-06-02 09:08:41'),(48,'917760372901','4 sharing','2024-06-02 09:08:57'),(49,'917760372901','4 sharing','2024-06-02 09:09:10'),(50,'917760372901','4 sharing','2024-06-02 09:11:41'),(51,'917760372901','3 sharing','2024-06-02 09:11:52'),(52,'917760372901','4 sharing','2024-06-02 09:13:10'),(53,'917760372901','4 sharing','2024-06-02 09:14:18'),(54,'917760372901','4 sharing','2024-06-02 09:15:04'),(55,'917760372901','1 sharing','2024-06-02 09:16:29'),(56,'917760372901','2 sharing','2024-06-02 09:16:36'),(57,'917760372901','3 sharing','2024-06-02 09:17:14'),(58,'917760372901','4 sharing','2024-06-02 09:17:21'),(59,'917760372901','greeting','2024-06-02 09:22:44'),(60,'917760372901','2 sharing','2024-06-02 09:23:04'),(61,'917760372901','3 sharing','2024-06-02 09:23:10'),(62,'917760372901','greeting','2024-06-02 09:25:58'),(63,'917760372901','1 sharing','2024-06-02 09:26:21'),(64,'917760372901','2 sharing','2024-06-02 09:26:27'),(65,'917760372901','3 sharing','2024-06-02 09:26:35'),(66,'917760372901','2 sharing','2024-06-02 09:27:49'),(67,'917760372901','2 sharing','2024-06-02 09:28:35'),(68,'917760372901','greeting','2024-06-02 10:07:26'),(69,'917760372901','advance booking','2024-06-02 10:07:34'),(70,'917760372901','4 sharing','2024-06-02 10:14:26'),(71,'917760372901','greeting','2024-06-02 11:05:57'),(72,'917760372901','room details','2024-06-02 11:06:01'),(73,'917760372901','amenities','2024-06-02 11:06:25'),(74,'917760372901','location and directions','2024-06-02 11:06:33'),(75,'917760372901','1 sharing','2024-06-02 11:06:45'),(76,'917760372901','2 sharing','2024-06-02 11:06:50'),(77,'917760372901','3 sharing','2024-06-02 11:06:54'),(78,'917760372901','4 sharing','2024-06-02 11:07:08'),(79,'917760372901','advance booking','2024-06-02 11:07:19'),(80,'919353676794','greeting','2024-06-02 11:55:33'),(81,'919353676794','2 sharing','2024-06-02 11:55:49'),(82,'919353676794','4 sharing','2024-06-02 11:56:23'),(83,'917760372901','greeting','2024-06-02 12:01:56'),(84,'917760372901','1 sharing','2024-06-02 12:02:04'),(85,'917760372901','2 sharing','2024-06-02 12:02:10'),(86,'917760372901','3 sharing','2024-06-02 12:02:15'),(87,'917760372901','4 sharing','2024-06-02 12:02:25');
/*!40000 ALTER TABLE `phone_numbers` ENABLE KEYS */;
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