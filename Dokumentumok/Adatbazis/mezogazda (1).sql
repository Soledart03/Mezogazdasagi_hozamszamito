-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Okt 14. 08:08
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `mezogazda`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `fold`
--

CREATE TABLE `fold` (
  `id` int(11) NOT NULL,
  `terulet` decimal(10,2) NOT NULL,
  `muvelesi_ag` varchar(100) DEFAULT NULL,
  `helyrajzi_szam` varchar(50) DEFAULT NULL,
  `elozo_evi_hasznositas` varchar(255) DEFAULT NULL,
  `gazda_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `fold`
--

INSERT INTO `fold` (`id`, `terulet`, `muvelesi_ag`, `helyrajzi_szam`, `elozo_evi_hasznositas`, `gazda_id`) VALUES
(1, 12.50, 'szántó', '1234/1', 'búza', 1),
(2, 8.00, 'rét', '5678/3', 'kukorica', 1),
(3, 15.20, 'szántó', '9101/5', 'burgonya', 2);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `gazda_fiok`
--

CREATE TABLE `gazda_fiok` (
  `id` int(11) NOT NULL,
  `nev` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `jelszo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `gazda_fiok`
--

INSERT INTO `gazda_fiok` (`id`, `nev`, `email`, `jelszo`) VALUES
(1, 'Kovács Péter', 'peter.kovacs@example.com', 'jelszo123'),
(2, 'Szabó Anna', 'anna.szabo@example.com', 'titok456');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `input_anyag`
--

CREATE TABLE `input_anyag` (
  `id` int(11) NOT NULL,
  `nev` varchar(100) NOT NULL,
  `ar` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `input_anyag`
--

INSERT INTO `input_anyag` (`id`, `nev`, `ar`) VALUES
(1, 'Vetőmag', 25000.00),
(2, 'Műtrágya', 18000.00),
(3, 'Növényvédőszer', 12000.00),
(4, 'Üzemanyag', 10000.00);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kiadas`
--

CREATE TABLE `kiadas` (
  `id` int(11) NOT NULL,
  `datum` date NOT NULL,
  `osszeg` decimal(10,2) NOT NULL,
  `tipus` varchar(50) DEFAULT NULL,
  `leiras` varchar(255) DEFAULT NULL,
  `fold_id` int(11) DEFAULT NULL,
  `noveny_id` int(11) DEFAULT NULL,
  `inputanyag_id` int(11) DEFAULT NULL,
  `terv_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `kiadas`
--

INSERT INTO `kiadas` (`id`, `datum`, `osszeg`, `tipus`, `leiras`, `fold_id`, `noveny_id`, `inputanyag_id`, `terv_id`) VALUES
(1, '2025-03-10', 25000.00, 'vetomag', 'Búza vetőmag', 1, 1, 1, 1),
(2, '2025-03-22', 18000.00, 'mutragya', 'NPK kijuttatás', 1, 1, 2, 1),
(3, '2025-04-01', 12000.00, 'novenyvedoszer', 'Gyomirtás', 1, 1, 3, 1),
(4, '2025-04-15', 30000.00, 'munka', 'Aratás', 1, 1, NULL, 1),
(5, '2025-04-05', 30000.00, 'vetomag', 'Kukorica vetőmag', 2, 2, 1, 2),
(6, '2025-04-20', 20000.00, 'mutragya', 'Kukorica tápanyag', 2, 2, 2, 2),
(7, '2025-05-10', 15000.00, 'ontozes', 'Kukorica öntözés', 2, 2, NULL, 2),
(8, '2025-06-01', 18000.00, 'uzemanyag', 'Traktor szántás', 2, 2, 4, 2),
(9, '2025-03-18', 28000.00, 'vetomag', 'Burgonya ültetőanyag', 3, 3, 1, 3),
(10, '2025-04-01', 22000.00, 'mutragya', 'Burgonya műtrágya', 3, 3, 2, 3),
(11, '2025-04-20', 35000.00, 'munka', 'Betakarítás', 3, 3, NULL, 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `noveny`
--

CREATE TABLE `noveny` (
  `id` int(11) NOT NULL,
  `nev` varchar(100) NOT NULL,
  `fajtaja` varchar(100) DEFAULT NULL,
  `ar` decimal(10,2) DEFAULT NULL,
  `kep` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `noveny`
--

INSERT INTO `noveny` (`id`, `nev`, `fajtaja`, `ar`, `kep`) VALUES
(1, 'Búza', 'Triticum aestivum', 150.00, 'buza.jpg'),
(2, 'Kukorica', 'Zea mays', 180.00, 'kukorica.jpg'),
(3, 'Burgonya', 'Solanum tuberosum', 130.00, 'burgonya.jpg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `noveny_input`
--

CREATE TABLE `noveny_input` (
  `noveny_id` int(11) NOT NULL,
  `inputanyag_id` int(11) NOT NULL,
  `ajanlott_mennyiseg` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `noveny_input`
--

INSERT INTO `noveny_input` (`noveny_id`, `inputanyag_id`, `ajanlott_mennyiseg`) VALUES
(1, 1, 25.00),
(1, 2, 10.00),
(2, 1, 30.00),
(2, 2, 12.00),
(3, 1, 28.00),
(3, 2, 15.00);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `terv`
--

CREATE TABLE `terv` (
  `id` int(11) NOT NULL,
  `fold_id` int(11) NOT NULL,
  `noveny_id` int(11) NOT NULL,
  `vetes_idopont` date DEFAULT NULL,
  `tomeg` decimal(10,2) DEFAULT NULL,
  `osszeg` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `terv`
--

INSERT INTO `terv` (`id`, `fold_id`, `noveny_id`, `vetes_idopont`, `tomeg`, `osszeg`) VALUES
(1, 1, 1, '2025-03-20', 5200.00, 780000.00),
(2, 2, 2, '2025-04-10', 6400.00, 910000.00),
(3, 3, 3, '2025-03-25', 4800.00, 860000.00);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `fold`
--
ALTER TABLE `fold`
  ADD PRIMARY KEY (`id`),
  ADD KEY `gazda_id` (`gazda_id`);

--
-- A tábla indexei `gazda_fiok`
--
ALTER TABLE `gazda_fiok`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A tábla indexei `input_anyag`
--
ALTER TABLE `input_anyag`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `kiadas`
--
ALTER TABLE `kiadas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fold_id` (`fold_id`),
  ADD KEY `noveny_id` (`noveny_id`),
  ADD KEY `inputanyag_id` (`inputanyag_id`),
  ADD KEY `terv_id` (`terv_id`);

--
-- A tábla indexei `noveny`
--
ALTER TABLE `noveny`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `noveny_input`
--
ALTER TABLE `noveny_input`
  ADD PRIMARY KEY (`noveny_id`,`inputanyag_id`),
  ADD KEY `inputanyag_id` (`inputanyag_id`);

--
-- A tábla indexei `terv`
--
ALTER TABLE `terv`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fold_id` (`fold_id`),
  ADD KEY `noveny_id` (`noveny_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `fold`
--
ALTER TABLE `fold`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `gazda_fiok`
--
ALTER TABLE `gazda_fiok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `input_anyag`
--
ALTER TABLE `input_anyag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `kiadas`
--
ALTER TABLE `kiadas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT a táblához `noveny`
--
ALTER TABLE `noveny`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `terv`
--
ALTER TABLE `terv`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `fold`
--
ALTER TABLE `fold`
  ADD CONSTRAINT `fold_ibfk_1` FOREIGN KEY (`gazda_id`) REFERENCES `gazda_fiok` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `kiadas`
--
ALTER TABLE `kiadas`
  ADD CONSTRAINT `kiadas_ibfk_1` FOREIGN KEY (`fold_id`) REFERENCES `fold` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `kiadas_ibfk_2` FOREIGN KEY (`noveny_id`) REFERENCES `noveny` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `kiadas_ibfk_3` FOREIGN KEY (`inputanyag_id`) REFERENCES `input_anyag` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `kiadas_ibfk_4` FOREIGN KEY (`terv_id`) REFERENCES `terv` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Megkötések a táblához `noveny_input`
--
ALTER TABLE `noveny_input`
  ADD CONSTRAINT `noveny_input_ibfk_1` FOREIGN KEY (`noveny_id`) REFERENCES `noveny` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `noveny_input_ibfk_2` FOREIGN KEY (`inputanyag_id`) REFERENCES `input_anyag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `terv`
--
ALTER TABLE `terv`
  ADD CONSTRAINT `terv_ibfk_1` FOREIGN KEY (`fold_id`) REFERENCES `fold` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `terv_ibfk_2` FOREIGN KEY (`noveny_id`) REFERENCES `noveny` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
