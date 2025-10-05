-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Okt 03. 09:00
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
-- Adatbázis: `mezogazd`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `fold`
--

CREATE TABLE `fold` (
  `id` int(11) NOT NULL,
  `terulet` decimal(10,2) NOT NULL,
  `muvelesi_ag` varchar(100) DEFAULT NULL,
  `helyrajzi_szam` varchar(50) NOT NULL,
  `elozo_evi_hasznositas` varchar(255) DEFAULT NULL,
  `gazda_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `fold`
--

INSERT INTO `fold` (`id`, `terulet`, `muvelesi_ag`, `helyrajzi_szam`, `elozo_evi_hasznositas`, `gazda_id`) VALUES
(1, 12.50, 'Szántó', '1234/1', 'Kukorica', 1),
(2, 8.00, 'Gyümölcsös', '5678/2', 'Búza', 2);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `gazda_fiok`
--

CREATE TABLE `gazda_fiok` (
  `id` int(11) NOT NULL,
  `nev` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `jelszo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `gazda_fiok`
--

INSERT INTO `gazda_fiok` (`id`, `nev`, `email`, `jelszo`) VALUES
(1, 'Kovács István', 'kovacs.istvan@example.com', 'jelszo123'),
(2, 'Nagy Anna', 'nagy.anna@example.com', 'titok456');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `input_anyag`
--

CREATE TABLE `input_anyag` (
  `id` int(11) NOT NULL,
  `nev` varchar(100) NOT NULL,
  `ar` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `input_anyag`
--

INSERT INTO `input_anyag` (`id`, `nev`, `ar`) VALUES
(1, 'Nitrogén műtrágya', 1500.00),
(2, 'Gyomirtó szer', 2300.00),
(3, 'Foszfor műtrágya', 1800.00);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kezeles`
--

CREATE TABLE `kezeles` (
  `id` int(11) NOT NULL,
  `noveny_id` int(11) NOT NULL,
  `input_anyag_id` int(11) NOT NULL,
  `hasznalat` varchar(255) DEFAULT NULL,
  `ajanlott_mennyiseg` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `kezeles`
--

INSERT INTO `kezeles` (`id`, `noveny_id`, `input_anyag_id`, `hasznalat`, `ajanlott_mennyiseg`) VALUES
(1, 1, 1, 'Alaptrágyázás vetés előtt', 200.00),
(2, 1, 2, 'Gyomirtás kelés után', 1.50),
(3, 2, 1, 'Műtrágyázás sorok közé', 250.00),
(4, 3, 3, 'Tápanyag pótlás', 180.00);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `noveny`
--

INSERT INTO `noveny` (`id`, `nev`, `fajtaja`, `ar`, `kep`) VALUES
(1, 'Búza', 'Őszi búza', 5000.00, 'buza.jpg'),
(2, 'Kukorica', 'Takarmány kukorica', 4200.00, 'kukorica.jpg'),
(3, 'Napraforgó', 'Olaj napraforgó', 6000.00, 'napraforgo.jpg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tervezes`
--

CREATE TABLE `tervezes` (
  `id` int(11) NOT NULL,
  `fold_id` int(11) NOT NULL,
  `noveny_id` int(11) NOT NULL,
  `tervezet_id` int(11) NOT NULL,
  `vetes_idopont` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `tervezes`
--

INSERT INTO `tervezes` (`id`, `fold_id`, `noveny_id`, `tervezet_id`, `vetes_idopont`) VALUES
(1, 1, 1, 1, '2025-03-15'),
(2, 2, 3, 2, '2025-04-10');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tervezt`
--

CREATE TABLE `tervezt` (
  `id` int(11) NOT NULL,
  `viz` decimal(10,2) DEFAULT NULL,
  `tomeg` decimal(10,2) DEFAULT NULL,
  `osszeg` decimal(10,2) DEFAULT NULL,
  `szemet` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `tervezt`
--

INSERT INTO `tervezt` (`id`, `viz`, `tomeg`, `osszeg`, `szemet`) VALUES
(1, 3000.00, 12000.00, 500000.00, 150.00),
(2, 2500.00, 8000.00, 350000.00, 120.00);

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
-- A tábla indexei `kezeles`
--
ALTER TABLE `kezeles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `noveny_id` (`noveny_id`),
  ADD KEY `input_anyag_id` (`input_anyag_id`);

--
-- A tábla indexei `noveny`
--
ALTER TABLE `noveny`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `tervezes`
--
ALTER TABLE `tervezes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fold_id` (`fold_id`),
  ADD KEY `noveny_id` (`noveny_id`),
  ADD KEY `tervezet_id` (`tervezet_id`);

--
-- A tábla indexei `tervezt`
--
ALTER TABLE `tervezt`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `fold`
--
ALTER TABLE `fold`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `gazda_fiok`
--
ALTER TABLE `gazda_fiok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `input_anyag`
--
ALTER TABLE `input_anyag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `kezeles`
--
ALTER TABLE `kezeles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `noveny`
--
ALTER TABLE `noveny`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `tervezes`
--
ALTER TABLE `tervezes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `tervezt`
--
ALTER TABLE `tervezt`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `fold`
--
ALTER TABLE `fold`
  ADD CONSTRAINT `fold_ibfk_1` FOREIGN KEY (`gazda_id`) REFERENCES `gazda_fiok` (`id`);

--
-- Megkötések a táblához `kezeles`
--
ALTER TABLE `kezeles`
  ADD CONSTRAINT `kezeles_ibfk_1` FOREIGN KEY (`noveny_id`) REFERENCES `noveny` (`id`),
  ADD CONSTRAINT `kezeles_ibfk_2` FOREIGN KEY (`input_anyag_id`) REFERENCES `input_anyag` (`id`);

--
-- Megkötések a táblához `tervezes`
--
ALTER TABLE `tervezes`
  ADD CONSTRAINT `tervezes_ibfk_1` FOREIGN KEY (`fold_id`) REFERENCES `fold` (`id`),
  ADD CONSTRAINT `tervezes_ibfk_2` FOREIGN KEY (`noveny_id`) REFERENCES `noveny` (`id`),
  ADD CONSTRAINT `tervezes_ibfk_3` FOREIGN KEY (`tervezet_id`) REFERENCES `tervezt` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
