-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 09, 2024 at 10:53 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `healthtrack_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `Formulaire`
--

CREATE TABLE `Formulaire` (
  `modif` int(1) UNSIGNED NOT NULL,
  `modif1` int(2) UNSIGNED NOT NULL,
  `modif2` int(3) UNSIGNED NOT NULL,
  `modif3` int(4) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Formulaire`
--

INSERT INTO `Formulaire` (`modif`, `modif1`, `modif2`, `modif3`) VALUES
(0, 1, 2, 3),
(10, 11, 12, 13);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Formulaire`
--
ALTER TABLE `Formulaire`
  ADD PRIMARY KEY (`modif`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
