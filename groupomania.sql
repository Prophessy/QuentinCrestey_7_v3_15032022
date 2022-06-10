-- MariaDB dump 10.19  Distrib 10.4.24-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `groupomania`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `groupomania` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `groupomania`;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `commentBody` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `PostId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `PostId` (`PostId`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` (`id`, `commentBody`, `username`, `createdAt`, `updatedAt`, `PostId`) VALUES (53,'blabla','Admin','2022-06-10 11:31:40','2022-06-10 11:31:40',20),(54,'C\'est martin','Martin','2022-06-10 14:30:58','2022-06-10 14:30:58',19),(55,'dxhdhg','Martin','2022-06-10 14:39:30','2022-06-10 14:39:30',21),(58,'123','Quentin','2022-06-10 17:39:35','2022-06-10 17:39:35',21);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `PostId` int DEFAULT NULL,
  `UserId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `PostId` (`PostId`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` (`id`, `createdAt`, `updatedAt`, `PostId`, `UserId`) VALUES (37,'2022-06-10 11:28:20','2022-06-10 11:28:20',18,6),(38,'2022-06-10 11:28:21','2022-06-10 11:28:21',19,6),(39,'2022-06-10 11:29:10','2022-06-10 11:29:10',20,4),(40,'2022-06-10 11:29:12','2022-06-10 11:29:12',18,4),(44,'2022-06-10 14:38:15','2022-06-10 14:38:15',19,10),(47,'2022-06-10 14:39:21','2022-06-10 14:39:21',21,10),(62,'2022-06-10 17:39:12','2022-06-10 17:39:12',21,2),(63,'2022-06-10 17:39:15','2022-06-10 17:39:15',20,2),(64,'2022-06-10 17:39:16','2022-06-10 17:39:16',19,2),(65,'2022-06-10 17:39:19','2022-06-10 17:39:19',18,2);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `postText` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` (`id`, `title`, `image`, `postText`, `username`, `createdAt`, `updatedAt`, `UserId`) VALUES (18,'Beau paysage','35702-trillectro-aaron-campbell-2560x1440-wallpaper_f4eav3','J\'adore cette image, elle me fait voyager !','Quentin','2022-06-10 11:27:29','2022-06-10 11:27:29',2),(19,'Belle moto','52e671a2-c00b-11ec-b3ad-f970f3004874_sol6dl','Cette moto est belle, fiable et pas chère !','Guillaume','2022-06-10 11:28:12','2022-06-10 11:28:12',6),(20,'Compte admin','thumbnail_IMG_2670_fegt4v','Je suis l\'administrateur de ce réseau, attention à vous !','Admin','2022-06-10 11:29:01','2022-06-10 11:29:01',4),(21,'J\'aime quentin','wp8136802_yihooq','Très très fort','Martin','2022-06-10 14:31:20','2022-06-10 14:31:20',10);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `right` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `username`, `password`, `right`, `createdAt`, `updatedAt`) VALUES (2,'Quentin','$2b$10$T7MftX/l0h7cixEOkDtxD.GxfVkczDfxezjm3P2hoKTf7N7.SE8E6',0,'2022-05-27 10:21:56','2022-05-31 07:57:03'),(4,'Admin','$2b$10$2rmSexikp7/baXKFnQcG2OM3T2I9JblmnVjjCNRIOjT7xMxhqnm5.',1,'2022-05-30 15:19:35','2022-05-30 15:19:35'),(5,'Maman','$2b$10$y.agcNvk7y5BKrlK9u3xquUk4xjIOXNyZXDcZU53bn.sKI7579I3m',0,'2022-06-01 09:40:33','2022-06-01 09:40:33'),(6,'Guillaume','$2b$10$tY58MeoMnKwxgpK3m23vKuHuUv.RX8na/UQLc3VsK2SQabeMl5HyC',0,'2022-06-04 15:45:40','2022-06-04 15:45:40'),(7,'Thomas','$2b$10$6JTF.beu.ITMjFiKV4DCgeat/ZlVyBftRBV7o0uFYR4M3ZWLu09we',0,'2022-06-08 12:03:49','2022-06-08 12:03:49'),(8,'azer','$2b$10$8PvGFt5SJVC2gzBJEV3M.uXs02DNr2WMR3r.YWTCTGejkhqsk8wpO',NULL,'2022-06-08 13:37:22','2022-06-08 13:37:22'),(9,'Test','$2b$10$fh/akFTNYwRfLSxPFJO8wek.uZkvQoAHCJN9ozfoK9sdT2tho7arK',NULL,'2022-06-09 09:59:38','2022-06-09 09:59:38'),(10,'Martin','$2b$10$y9wkwARTQB.jm1T9V3XbGug1DJMIM.L9dJGpsPviFb59LW8YPR9nu',NULL,'2022-06-10 14:30:39','2022-06-10 14:30:39');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-10 20:26:20
