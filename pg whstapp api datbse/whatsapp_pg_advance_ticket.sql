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
-- Table structure for table `advance_ticket`
--

DROP TABLE IF EXISTS `advance_ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `advance_ticket` (
  `ticket_id` varchar(255) NOT NULL,
  `amount` int NOT NULL,
  `currency` varchar(10) NOT NULL,
  `customer_email` varchar(255) NOT NULL,
  `sender_id` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ticket_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `advance_ticket`
--

LOCK TABLES `advance_ticket` WRITE;
/*!40000 ALTER TABLE `advance_ticket` DISABLE KEYS */;
INSERT INTO `advance_ticket` VALUES ('cs_test_a11tuy2h525X273gTraamOCXgaWI1NfkNeZuPnm5ScYLwx6lprvaiRdvby',300000,'inr','zainkaleem27@gmail.com','917760372901','2024-05-31 12:20:12'),('cs_test_a120VWIKHKu8tmzo2FEQP2amHyN160ysoyqrNyqvH7Wat1vZn6WWKDc1EQ',300000,'inr','zainkaleem27@gmail.com','917760372901','2024-06-02 11:07:52'),('cs_test_a1ANlqSPCvAjXsQMX23SJE1wdVIFD03pPynoElMVGJPqxR6Vx6zac6IE1K',300000,'inr','zainkaleem27@gmail.com','917760372901','2024-05-31 11:20:43'),('cs_test_a1BZIzITWcXILpCyUSl8XWYR3qKQ9XKZ1xF1OCfRhIhCFe4KlLTxPU9f6c',300000,'inr','syedadil093@gmail.com','919901184938','2024-05-28 11:11:07'),('cs_test_a1EPIdB8TlcrYHUqLnLSWIutwX9gTtwTwOSvkJuo1VD0Ub3BUWpBMbwCzc',300000,'inr','zainkaleem27@gmail.com','917760372901','2024-05-28 11:30:01'),('cs_test_a1Ey0YzSrkFL8cuThnHTlRvppp7girohZZ6DQeV3guWYlb1PrJ0TGSG3AC',300000,'inr','zainkaleem27@gmail.com','917760372901','2024-05-28 16:46:42'),('cs_test_a1hPJwC7251MLF4ZVlNCkmPfplVK6Ra2AR2fij68gHMxPDai771wjN3HXy',300000,'inr','zainkaleem27@gmail.com','917760372901','2024-06-01 07:03:17'),('cs_test_a1jM5g7Ph7kGIyFeFud2XS5T70zFmxMDuTGqLkvXE4DSRI2vg3MyBw3Llp',300000,'inr','zainkaleem27@gmail.com','917760372901','2024-05-28 11:04:51'),('cs_test_a1jvujCLUeCBN2iVeqYwIbnHSTQE1XcVxX3PRPmDKc8ERHuKqF0geYMO46',300000,'inr','zainkaleem27@gmail.com','917760372901','2024-05-28 14:00:14'),('cs_test_a1N9kJ6fazGGpMZEJ3DuxixDiR6PJqkuzvrVs6av46t5Ob0medhoISI3pC',300000,'inr','zainkaleem27@gmail.com','917760372901','2024-05-28 09:09:58'),('cs_test_a1Ou0BVuQrtT8I1qHOZxQ73SYR3Pl1W35LL3c0o9DkSM4JJHuxhtwcxN4k',300000,'inr','zainkaleem27@gmail.com','917760372901','2024-05-28 13:15:37'),('cs_test_a1pfMXh6OytMl0PGdg34zruF85D1hOtAYtTdk6r4wztyJVjBrQ7yOoXP1u',300000,'inr','zainkaleem27@gmail.com','917760372901','2024-05-28 09:50:44'),('cs_test_a1pJsxCwj6u71tIgr6Hd0kHGtK7hlvadhQ88MtVEykscbZ2QCsL15FzbyC',300000,'inr','zainkaleem27@gmail.com','917760372901','2024-05-28 11:02:24'),('cs_test_a1QfRDI1AbfyVHSXfYx9uicOfjkQtM6fRDLwU3pOWsPbRKHnbFCcWDljSz',300000,'inr','zainkaleem27@gmail.com','917760372901','2024-05-28 16:57:56'),('cs_test_a1rMjC8Dd6qNuFxGpq83cur4H74WnPlQQaM2JDe0H0i4v51X1Xfs5RCwNP',300000,'inr','zainkaleem27@gmail.com','917760372901','2024-05-29 13:15:51'),('cs_test_a1RzYgZ7aaOBEyDskYwmGWaUhexH40j3eqgiOTUzckT0O77iVwVBs81csP',300000,'inr','zainkaleem27@gmail.com','917760372901','2024-05-28 11:25:09'),('cs_test_a1sqm5m93gOwjJLDD2LaaaamHpN52s8uqtdsEESHkaHdq5AyjfAPPJt8xw',300000,'inr','syedadil093@gmail.com','919901184938','2024-06-01 08:59:39'),('cs_test_a1vEdNJP2sLS3hywawdAA0N9plfLAf7DfpkZ24iJEd3Cmk8GWH3sol5IVv',300000,'inr','zainkaleem27@gmail.com','917760372901','2024-05-28 11:17:48'),('cs_test_a1YK65M5o6WOMxB6Jevb917SapmD87TPUm0cNVhIIECuhNcCK0sAtsl50h',300000,'inr','zainkaleem27@gmail.com','917760372901','2024-06-01 14:48:17'),('cs_test_a1ZiwKkAH2pSuzLuOFFP0t7lM0ijbei4kZm5VkPlq2h8nF9WYiiheL9xfZ',300000,'inr','syedadil093@gmail.com','919901184938','2024-05-28 13:55:39'),('cs_test_a1ZWdjL0Ea6s7NF4Z4HToLeLd5D73Fu7qLA50ZlhFtvuNZyXuxBisHFnh6',300000,'inr','zainkaleem27@gmail.com','917760372901','2024-05-28 13:28:41'),('cs_test_a1ZyMCWrjKvI6uk2R83HvFwz4uRNJUo6W6CaexN9tlkYayIrNUlqPTyzUm',300000,'inr','zainkaleem27@gmail.com','917760372901','2024-06-01 09:16:06');
/*!40000 ALTER TABLE `advance_ticket` ENABLE KEYS */;
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
