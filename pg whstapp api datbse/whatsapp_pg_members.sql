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
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `members` (
  `member_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phoneno` varchar(20) NOT NULL,
  `active` int DEFAULT '1',
  `bed_id` int DEFAULT NULL,
  PRIMARY KEY (`member_id`),
  UNIQUE KEY `member_id` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES (1,'Visalakshi A','1234567891',1,1),(2,'Olivia Paul','1234567892',1,2),(3,'Pragathi','1234567893',1,3),(4,'Shwetha Kumari','1234567894',1,4),(5,'Aparna P Menon','1234567895',1,5),(6,'Mathangi Devi','1234567896',1,6),(7,'Ashwitha S','1234567897',1,7),(8,'Sneha B V','1234567898',1,8),(9,'Sunayani S V','1234567899',1,9),(10,'Nookala Deepthi','1234567800',1,10),(11,'Ashwini J N','1234567801',1,11),(12,'Sindhuja','1234567802',1,12),(13,'Bhagya M','1234567803',1,NULL),(14,'Anisha Prabhu','1234567804',1,13),(15,'Ayanika Bhowmik','1234567805',1,14),(16,'Tarunya','1234567806',1,15),(17,'P V Sowmya','1234567807',1,16),(18,'Swati Roy','1234567808',1,17),(19,'Diksha','1234567809',1,18),(20,'Amia Wilson','1234567810',1,19),(21,'Sowmya KM','1234567811',1,20),(22,'Smitha A','1234567812',1,21),(23,'Moksha B S','1234567813',1,22),(24,'Jayam Rakshitha','1234567814',1,NULL),(25,'Shanthi A S','1234567815',1,23),(26,'Reenijeeva','1234567816',1,24),(27,'Pratheeksha','1234567817',1,25),(28,'Sanjana R','1234567818',1,26),(29,'N Chaitra','1234567819',1,27),(30,'Preethi','1234567820',1,28),(31,'Anjali P','1234567821',1,29),(32,'Soniya','1234567822',1,30),(33,'Pinky Patangia','1234567823',1,31),(34,'Bhagyashree','1234567824',1,32),(35,'Princy A','1234567825',1,33),(36,'Anuja H Hiregoudar','1234567826',1,34),(37,'Prajna R rao','1234567827',1,NULL),(38,'Shambhavi Ranjan','1234567828',1,35),(39,'Tejal anil Lokare','1234567829',1,36),(40,'Kavya Gadadewar','1234567830',1,37),(41,'Akansha Deb Roy','1234567831',1,38),(42,'Sampurnaa Basak','1234567832',1,39),(43,'Natasha','1234567833',1,40),(44,'Sinchana K N','1234567834',1,41),(45,'Yashaswini','1234567835',1,42),(46,'Shubhangi Saxena','1234567836',1,43),(47,'Shwetha Poojary','1234567837',1,44),(48,'Sofiya Seles','1234567838',1,NULL),(49,'Kriti','1234567839',1,45),(50,'Sunitha Poojari','1234567840',1,46),(51,'Pragya Shukla','1234567841',1,47),(52,'Gomathi P','1234567842',1,48),(53,'Sindhu S R','1234567843',1,49),(54,'Rakshitha D S','1234567844',1,50),(55,'Sanmaya E','1234567845',1,51),(56,'P S Himanshu','1234567846',1,52),(57,'Suchaithra','1234567847',1,53),(58,'Lavanya Somanathan','1234567848',1,54),(59,'Priya','1234567849',1,55),(60,'M. Anusiya','1234567850',1,56),(61,'Chandana N','1234567851',1,NULL),(62,'Prachi Goutam','1234567852',1,57),(63,'Apoorva Subhodh Borgaonkar','1234567853',1,58),(64,'Riya Yadav','1234567854',1,59),(65,'Kesha Patel','1234567855',1,60),(66,'Megha Sarkar','1234567856',1,61),(67,'Kaynath Nezam','1234567857',1,62),(68,'Rekha Chapi','1234567858',1,63),(69,'Akila Nayak','1234567859',1,64),(70,'Santhoshi','1234567860',1,65),(71,'Chethana R','1234567861',1,66),(72,'Tejaswini','1234567862',1,NULL),(90,'Syed ','7760372901',1,87);
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
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
