-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Dec 18. 11:29
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
(2, 'Szabó Anna', 'anna.szabo@example.com', 'titok456'),
(3, 'Koszta Máté', 'kosztika@gmail.com', 'rantotthus123'),
(4, 'Deák Levente', 'kisgugi@gmail.com', '$2b$10$hlysC1hRp601zdbPNWUzkOdP8vZAiKTryUKDcVZglaGo0g.B5zlB.'),
(5, 'Koszta', 'koszta@gmail.com', '$2b$10$.PHwj8SUkOU6HNSRmzEZmeDcWXyi58Rrww0gtoZdMhHgepNc/Oswi'),
(6, 'Lacika', 'lacika@gmail.com', '$2b$10$yz1AaRJkjX9eAMd60ieHgef7487Y1vdX8LJV0pWObcIjjBzrG/DO.'),
(7, 'godzi', 'k.bendeguz00@gmail.com', '$2b$10$JOTPC70.Fz8PD.5TDHQNMu8ah88AcfdHc2bnTo0RZX/KFXDsTfDOG'),
(8, 'Koszta Mate', 'koszta2@gmail.com', '$2b$10$DJyHwGEXQH8fsGg2Vc.YweG.Dv6qTFZQ6IKQZQlBYd806RCQZpiJG'),
(9, 'tesztfiok', 'teszt@gmail.com', '$2b$10$A.h.6Be3fwAVyeh8E0AZA.xs96lhSKZEVh63.t0.fie0YXrsHk2nG'),
(10, 'Teó', 'teoka@gmail.com', '$2b$10$Dupx9LizdEE0kSK09I07fu5B36fWlS7xHgTCIgHQAzP2byPC17MQW'),
(12, 'Teó', 'teoka2@gmail.com', '$2b$10$KgXCkb.qVrfS7XeiUom8ROUS4bukucF6Pvup7iohJV2sn1OX2GuOy');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `input_anyag`
--

CREATE TABLE `input_anyag` (
  `id` int(11) NOT NULL,
  `inev` varchar(100) NOT NULL,
  `ar` decimal(10,2) NOT NULL,
  `fajta` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `input_anyag`
--

INSERT INTO `input_anyag` (`id`, `inev`, `ar`, `fajta`) VALUES
(1, 'Vetőmag', 176.00, 'Activus'),
(2, 'Műtrágya', 18000.00, ''),
(3, 'Növényvédőszer', 12000.00, ''),
(5, 'Vetőmag', 178.00, 'AG Hurem'),
(6, 'Vetőmag', 1300.00, 'KWS Advisio'),
(7, 'Vetőmag', 1300.00, 'KWS Advisio'),
(8, 'Vetőmag', 1290.00, 'KWS Akustika'),
(9, 'Vetőmag', 1100.00, 'KWS Casak Duo'),
(10, 'Vetőmag', 700.00, 'KWS Achilles CLP'),
(11, 'Vetőmag', 740.00, 'KWS Arnetes SU'),
(12, 'Vetőmag', 690.00, 'KWS Arnoldes CL'),
(13, 'Vetőmag', 675.00, 'ADELFIA'),
(14, 'Vetőmag', 675.00, 'ALTONA'),
(15, 'Vetőmag', 675.00, 'ES MENTOR'),
(16, 'Vetőmag', 409.00, 'Agria'),
(17, 'Vetőmag', 374.00, 'Ambrine'),
(18, 'Vetőmag', 748.00, 'Belami'),
(19, 'Vetőmag', 173.00, 'Fredro'),
(20, 'Vetőmag', 182.00, 'GK Maros'),
(21, 'Vetőmag', 170.00, 'GK Temes'),
(22, 'Vetőmag', 1070.00, 'KWS DEMOS'),
(23, 'Vetőmag', 1050.00, 'KWS GRANOS'),
(24, 'Vetőmag', 1100.00, 'Syngenta SY SAVEO'),
(25, 'Vetőmag', 163.00, 'GK Arany'),
(26, 'Vetőmag', 375.00, 'Őszi zab'),
(27, 'Vetőmag', 189.00, 'IS Maltigo'),
(28, 'Vetőmag', 227.00, 'Julia'),
(29, 'Vetőmag', 177.00, 'Mascott'),
(30, 'Vetőmag', 314.00, 'Bonfire'),
(31, 'Vetőmag', 220.00, 'Dankowskie Diament'),
(32, 'Vetőmag', 4850.00, 'Szarvasi AS3'),
(33, 'Vetőmag', 1210.00, 'Bíborhere-Oriana'),
(34, 'Vetőmag', 4200.00, 'Asolo Bis BMR'),
(35, 'Vetőmag', 4200.00, 'Asolo Tris BMR'),
(36, 'Vetőmag', 2500.00, 'Big Texan BMR'),
(37, 'Műtrágya', 15875.00, 'Genezis Kalászos levéltrágya 10L'),
(38, 'Műtrágya', 15875.00, 'Genezis Kukorica levéltrágya 10L'),
(39, 'Műtrágya', 15875.00, 'Genezis Olajosnöveny levéltrágya 10L'),
(40, 'Műtrágya', 7940.00, 'Genezis Pétisó 25kg'),
(41, 'Vegyszer', 2860.00, 'Gombaölő Folicur Solo 50ml'),
(42, 'Vegyszer', 1160.00, 'Lamdex Extra rovarölő 5g');

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
  `inputanyag_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `kiadas`
--

INSERT INTO `kiadas` (`id`, `datum`, `osszeg`, `tipus`, `leiras`, `fold_id`, `noveny_id`, `inputanyag_id`) VALUES
(1, '2025-03-10', 25000.00, 'vetomag', 'Búza vetőmag', 1, 4, 1),
(2, '2025-03-22', 18000.00, 'mutragya', 'NPK kijuttatás', 1, 4, 2),
(3, '2025-04-01', 12000.00, 'novenyvedoszer', 'Gyomirtás', 1, 4, 3),
(4, '2025-04-15', 30000.00, 'munka', 'Aratás', 1, 4, NULL),
(5, '2025-04-05', 30000.00, 'vetomag', 'Kukorica vetőmag', 2, 6, 1),
(6, '2025-04-20', 20000.00, 'mutragya', 'Kukorica tápanyag', 2, 6, 2),
(7, '2025-05-10', 15000.00, 'ontozes', 'Kukorica öntözés', 2, 6, NULL),
(8, '2025-06-01', 18000.00, 'uzemanyag', 'Traktor szántás', 2, 6, NULL),
(9, '2025-03-18', 28000.00, 'vetomag', 'Burgonya ültetőanyag', 3, 4, 1),
(10, '2025-04-01', 22000.00, 'mutragya', 'Burgonya műtrágya', 3, 4, 2),
(11, '2025-04-20', 35000.00, 'munka', 'Betakarítás', 3, 4, NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `noveny`
--

CREATE TABLE `noveny` (
  `id` int(11) NOT NULL,
  `nnev` varchar(100) NOT NULL,
  `kep` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `noveny`
--

INSERT INTO `noveny` (`id`, `nnev`, `kep`) VALUES
(1, 'napraforgó', 'https://attic.sh/5jdhbrp2s777nlebkm3yshgmjt96'),
(2, 'szója', 'https://static.vecteezy.com/system/resources/previews/038/035/195/non_2x/ai-generated-soya-beans-isolated-on-transparent-background-free-png.png'),
(3, 'cukorrépa', 'https://attic.sh/4r1fptt64lh3tpy406xiw0ncn3ug'),
(4, 'Búza', 'https://attic.sh/zbuguftuwt7hqm8woxzxfzvxx9hi'),
(5, 'burgonya', 'https://static.vecteezy.com/system/resources/previews/040/211/346/non_2x/ai-generated-potato-clip-art-free-png.png'),
(6, 'Kukorica', 'https://attic.sh/xu8f67d8jbj9f0njuzvdrxjjrcpg'),
(7, 'tritikálé', 'https://static.vecteezy.com/system/resources/previews/035/656/186/non_2x/ai-generated-ear-of-wheat-spikelet-isolated-on-transparent-background-free-png.png'),
(8, 'repce', 'https://static.vecteezy.com/system/resources/previews/023/234/791/non_2x/yellow-canola-flower-transparent-free-png.png'),
(10, 'zab', 'https://imgproxy.attic.sh/insecure/f:webp/q:90/w:1200/plain/https://attic.sh/yggfrsgzwb41931w2redj846c1ro'),
(11, 'árpa', 'https://cdn-icons-png.flaticon.com/512/3657/3657064.png'),
(12, 'rozs', 'https://imgproxy.attic.sh/insecure/f:webp/q:90/w:1200/plain/https://attic.sh/m0me7n0r2g7gasxzctrfysffwha0'),
(13, 'lucerna', 'https://imgproxy.attic.sh/insecure/f:webp/q:90/w:384/plain/https://attic.sh/9ctfnarry2gfqj5ogxcor55m0snz'),
(15, 'cirok', 'https://thumbs.dreamstime.com/b/crop-sign-emoji-icon-illustration-wheat-vector-symbol-emoticon-design-clip-art-sign-comic-style-crop-sign-emoji-icon-illustration-408222366.jpg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `noveny_input`
--

CREATE TABLE `noveny_input` (
  `noveny_id` int(11) NOT NULL,
  `inputanyag_id` int(11) NOT NULL,
  `termes_per_kilo` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `noveny_input`
--

INSERT INTO `noveny_input` (`noveny_id`, `inputanyag_id`, `termes_per_kilo`) VALUES
(1, 10, 700.00),
(1, 11, 740.00),
(1, 12, 690.00),
(2, 13, 675.00),
(2, 14, 675.00),
(2, 15, 675.00),
(4, 1, 5.00),
(4, 5, 5.00),
(5, 16, 409.00),
(5, 17, 374.00),
(5, 18, 748.00),
(6, 6, 1300.00),
(6, 8, 1290.00),
(6, 9, 1100.00),
(7, 19, 173.00),
(7, 20, 182.00),
(7, 21, 170.00),
(8, 22, 1070.00),
(8, 23, 1050.00),
(8, 24, 1100.00),
(10, 25, 163.00),
(10, 26, 375.00),
(11, 27, 189.00),
(11, 28, 227.00),
(11, 29, 177.00),
(12, 30, 314.00),
(12, 31, 220.00),
(13, 32, 4850.00),
(13, 33, 1210.00),
(15, 34, 4200.00),
(15, 35, 4200.00),
(15, 36, 2500.00);

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
(1, 1, 4, '2025-11-19', 15.00, 13200.00);

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
  ADD KEY `inputanyag_id` (`inputanyag_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT a táblához `input_anyag`
--
ALTER TABLE `input_anyag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT a táblához `kiadas`
--
ALTER TABLE `kiadas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT a táblához `noveny`
--
ALTER TABLE `noveny`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

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
  ADD CONSTRAINT `kiadas_ibfk_3` FOREIGN KEY (`inputanyag_id`) REFERENCES `input_anyag` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

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
