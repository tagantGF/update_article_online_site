-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Mer 01 Juin 2022 à 03:04
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `edenwork`
--

-- --------------------------------------------------------

--
-- Structure de la table `demandes`
--

CREATE TABLE IF NOT EXISTS `demandes` (
  `num_demandes` int(11) NOT NULL AUTO_INCREMENT,
  `objet` varchar(100) DEFAULT NULL,
  `message` text,
  `user_num` int(4) DEFAULT NULL,
  PRIMARY KEY (`num_demandes`),
  KEY `user_num` (`user_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

CREATE TABLE IF NOT EXISTS `role` (
  `num_role` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`num_role`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `role`
--

INSERT INTO `role` (`num_role`, `type`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `num_user` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(15) DEFAULT NULL,
  `prenom` varchar(15) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `pwd` text,
  `role_num` int(3) DEFAULT NULL,
  `token` varchar(200) NOT NULL,
  PRIMARY KEY (`num_user`),
  KEY `role_num` (`role_num`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=17 ;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`num_user`, `nom`, `prenom`, `email`, `pwd`, `role_num`, `token`) VALUES
(16, 'zz', 'zz', 'zz@aa', '7b52009b64fd0a2a49e6d8a939753077792b0554', 2, '');

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `demandes`
--
ALTER TABLE `demandes`
  ADD CONSTRAINT `demandes_ibfk_1` FOREIGN KEY (`user_num`) REFERENCES `users` (`num_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_num`) REFERENCES `role` (`num_role`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
