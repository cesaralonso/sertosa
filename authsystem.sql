-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-12-2017 a las 20:17:59
-- Versión del servidor: 10.1.26-MariaDB
-- Versión de PHP: 7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Estructura de tabla para la tabla `si_modulo`
--

CREATE TABLE `si_modulo` (
  `idsi_modulo` int(4) UNSIGNED NOT NULL COMMENT '0|',
  `nombre` varchar(45) DEFAULT NULL COMMENT '1|Nombre',
  `baja` tinyint(1) DEFAULT '0' COMMENT '0|',
  `created_by` int(4) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Módulos||nombre.Módulo';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `si_permiso`
--

CREATE TABLE `si_permiso` (
  `idsi_permiso` int(4) UNSIGNED NOT NULL COMMENT '0|',
  `acceso` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1|Acceso',
  `si_rol_idsi_rol` int(4) UNSIGNED NOT NULL COMMENT '1|Rol|nombre',
  `si_modulo_idsi_modulo` int(4) UNSIGNED NOT NULL COMMENT '1|Módulo|nombre',
  `readable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1|Lectura',
  `writeable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1|Escritura',
  `updateable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1|Edición',
  `deleteable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1|Eliminación',
  `read_own` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1|Leer Propios', 
  `write_own` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1|Escribir Propios', 
  `update_own` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1|Editar Propios', 
  `delete_own` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1|Eliminar Propios',
  `baja` tinyint(1) DEFAULT '0' COMMENT '0|',
  `created_by` int(4) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|2|Permisos||si_modulo_si_modulo_idsi_modulo.Módulo,si_rol_si_rol_idsi_rol.Rol';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `si_rol`
--

CREATE TABLE `si_rol` (
  `idsi_rol` int(4) UNSIGNED NOT NULL COMMENT '0|',
  `nombre` varchar(45) DEFAULT NULL COMMENT '1|Nombre',
  `baja` tinyint(1) DEFAULT '0' COMMENT '0|',
  `created_by` int(4) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|3|Roles||nombre.Rol';


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `si_user`
--


CREATE TABLE `si_user` (
  `idsi_user` int(4) UNSIGNED NOT NULL COMMENT '0|',
  `usuario` varchar(45) NOT NULL COMMENT '1|Usuario',
  `email` varchar(60) NOT NULL COMMENT '1|Email',
  `password` binary(60) DEFAULT NULL COMMENT '1|Password',
  `si_rol_idsi_rol` int(4) NOT NULL COMMENT '1|Rol|nombre',
  `status` set('NOVALIDADO','ACTIVO','PENDIENTE','SUSPENDIDO') NOT NULL DEFAULT 'NOVALIDADO' COMMENT '0|Status',
  `code` varchar(20) NOT NULL COMMENT '0|Código verificación',
  `super` tinyint(1) DEFAULT 0 COMMENT '0|',
  `code_at` timestamp NULL DEFAULT current_timestamp() COMMENT '0|Fecha de generación de código',
  `idcustomer` varchar(30) DEFAULT NULL COMMENT '1|Stripe Customer Id',
  `baja` tinyint(1) DEFAULT 0 COMMENT '0|',
  `created_by` int(4) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT current_timestamp() COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|4|Usuarios||usuario.Usuario,email.Email,si_rol_si_rol_idsi_rol.Rol,idcustomer.IDCustomer';





-- 29/07/21
-- Estructura de tabla para la tabla `si_sesion`
--

CREATE TABLE `si_sesion` (
  `idsi_sesion` int(10) UNSIGNED NOT NULL COMMENT '0|',
  `tipo` set('APPUSER','ADMINISTRADOR') DEFAULT 'APPUSER' COMMENT '1|Tipo',
  `si_user_idsi_user` int(4) UNSIGNED NOT NULL COMMENT '1|Usuario|usuario',
  `estado` set('CONSESION','SINSESION','CONECTADO','DISPONIBLE','NO-DISPONIBLE','OCUPADO','DESCONECTADO') DEFAULT NULL COMMENT '1|Estado',
  `latitude` varchar(45) DEFAULT NULL COMMENT '0|Latitude',
  `longitude` varchar(45) DEFAULT NULL COMMENT '0|Longitude',
  `accuracy` varchar(45) DEFAULT NULL COMMENT '0|Accuracy',
  `baja` tinyint(1) DEFAULT 0 COMMENT '0|',
  `created_by` int(4) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT current_timestamp() COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Sesión||estado.Estado,si_user_si_user_idsi_user.Usuario,tipo.Tipo';

--
-- Estructura de tabla para la tabla `si_sesionestado`
--

CREATE TABLE `si_sesionestado` (
  `idsi_sesionestado` int(10) UNSIGNED NOT NULL COMMENT '0|',
  `si_sesion_idsi_sesion` int(10) UNSIGNED NOT NULL COMMENT '1|Usuario|si_user_idsi_user',
  `estado` set('CONSESION','SINSESION','CONECTADO','DISPONIBLE','NO-DISPONIBLE','OCUPADO','DESCONECTADO') DEFAULT NULL COMMENT '1|Estado',
  `baja` tinyint(1) DEFAULT 0 COMMENT '0|',
  `created_by` int(4) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT current_timestamp() COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='0|1|Sesión Usuario Estado||estado.Estado,si_sesion_si_sesion_idsi_sesion.Sesion';

--
-- Estructura de tabla para la tabla `si_device`
--

CREATE TABLE `si_device` (
  `idsi_device` int(10) UNSIGNED NOT NULL COMMENT '0|',
  `token` text NOT NULL COMMENT '1|Token',
  `si_user_idsi_user` int(4) UNSIGNED NOT NULL COMMENT '1|Usuario|usuario',
  `si_rol_idsi_rol` int(4) DEFAULT NULL COMMENT '1|Rol',
  `baja` tinyint(1) DEFAULT 0 COMMENT '0|',
  `created_by` int(4) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT current_timestamp() COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Dispositivo||si_user_si_user_idsi_user.Usuario,si_rol_si_rol_idsi_rol.Rol';

-- --------------------------------------------------------



--
-- Estructura de tabla para la tabla `si_alerta`
--

CREATE TABLE `si_alerta` (
  `idsi_alerta` int(10) UNSIGNED NOT NULL COMMENT '0|',
  `si_user_idsi_user` int(4) UNSIGNED NOT NULL COMMENT '1|Usuario del Sistema|usuario',
  `tipoAlerta` set('ALERTA','AVISO','CHAT','TRACKING','OTRO') NOT NULL DEFAULT 'ALERTA' COMMENT '1|Tipo de Alerta',
  `emailRemitente` varchar(150) DEFAULT NULL COMMENT '1|Email Remitente',
  `emailDestinatario` varchar(150) DEFAULT NULL COMMENT '1|Email Destinatario',
  `mensaje` varchar(345) NOT NULL COMMENT '1|Mensaje',
  `vista` tinyint(1) DEFAULT NULL COMMENT '1|Vista',
  `leida` tinyint(1) DEFAULT NULL COMMENT '1|Leida',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(4) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Alerta||tipo.Tipo de Alerta,emailRemitente.Email Remitente,EmailDestinatario.Email Destinatario';



--
-- Estructura de tabla para la tabla `si_log`
--

CREATE TABLE `si_log` (
  `idsi_log` int(10) UNSIGNED NOT NULL COMMENT '0|',
  `si_modulo_idsi_modulo` int(10) UNSIGNED NOT NULL COMMENT '1|Módulo|nombre',
  `accion` varchar(150) NOT NULL COMMENT '1|Acción',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(4) DEFAULT NULL COMMENT '1|Credo por',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Logs||accion.Acción,si_modulo_si_modulo_idsi_modulo.Módulo';

-- --------------------------------------------------------


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `si_posicion`
--

CREATE TABLE `si_posicion` (
  `idsi_posicion` int(10) UNSIGNED NOT NULL COMMENT '0|',
  `latitude` varchar(45) NOT NULL COMMENT '1|Latitude',
  `longitude` varchar(45) NOT NULL COMMENT '1|Longitude',
  `accuracy` varchar(45) NOT NULL COMMENT '1|Accuracy',
  `baja` tinyint(1) DEFAULT 0 COMMENT '0|Baja lógica',
  `created_by` int(4) DEFAULT NULL COMMENT '0|Creado por',
  `created_at` timestamp NULL DEFAULT current_timestamp() COMMENT '0|Fecha de creación',
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '0|Fecha de moficiación'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='0|1|Posición||created_by.Usuario';

--
-- Índices para tablas volcadas
--



















--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `si_modulo`
--
ALTER TABLE `si_modulo`
  ADD PRIMARY KEY (`idsi_modulo`),
  ADD UNIQUE KEY `si_modulo_UNIQUE` (`idsi_modulo`);

--
-- Indices de la tabla `si_permiso`
--
ALTER TABLE `si_permiso`
  ADD PRIMARY KEY (`idsi_permiso`),
  ADD UNIQUE KEY `idsi_permiso_UNIQUE` (`idsi_permiso`),
  ADD UNIQUE KEY `rol_modulo_unico` (`si_rol_idsi_rol`,`si_modulo_idsi_modulo`),
  ADD KEY `si_fk_Permiso_Rol1_idx` (`si_rol_idsi_rol`),
  ADD KEY `si_fk_Permiso_Modulo1_idx` (`si_modulo_idsi_modulo`);

--
-- Indices de la tabla `si_rol`
--
ALTER TABLE `si_rol`
  ADD PRIMARY KEY (`idsi_rol`),
  ADD UNIQUE KEY `idsi_rol_UNIQUE` (`idsi_rol`);

--
-- Indices de la tabla `si_user`
--
ALTER TABLE `si_user`
  ADD PRIMARY KEY (`idsi_user`),
  ADD UNIQUE KEY `idsi_sesion_UNIQUE` (`idsi_user`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `si_fk_User_Rol_idx` (`si_rol_idsi_rol`);


--
-- Indices de la tabla `si_sesion`
--
ALTER TABLE `si_sesion`
  ADD PRIMARY KEY (`idsi_sesion`),
  ADD UNIQUE KEY `idsi_sesion_UNIQUE` (`idsi_sesion`),
  ADD UNIQUE KEY `IDUSER_UNIQUE` (`si_user_idsi_user`),
  ADD KEY `fk_sesion_si_user1_idx` (`si_user_idsi_user`);

--
-- Indices de la tabla `si_sesionestado`
--
ALTER TABLE `si_sesionestado`
  ADD PRIMARY KEY (`idsi_sesionestado`),
  ADD UNIQUE KEY `idsi_sesion_UNIQUE` (`idsi_sesionestado`),
  ADD KEY `fk_sesionestado_sesion1_idx` (`si_sesion_idsi_sesion`);

--
-- Indices de la tabla `si_device`
--
ALTER TABLE `si_device`
  ADD PRIMARY KEY (`idsi_device`),
  ADD UNIQUE KEY `idsi_device_UNIQUE` (`idsi_device`),
  ADD UNIQUE KEY `IDUSER_UNIQUE` (`si_user_idsi_user`),
  ADD KEY `fk_device_si_user1_idx` (`si_user_idsi_user`),
  ADD KEY `fk_device_si_rol1_idx` (`si_rol_idsi_rol`);



--
-- Indices de la tabla `si_alerta`
--
ALTER TABLE `si_alerta`
  ADD PRIMARY KEY (`idsi_alerta`),
  ADD UNIQUE KEY `idsi_alerta_UNIQUE` (`idsi_alerta`),
  ADD KEY `fk_alerta_si_user1_idx` (`si_user_idsi_user`);


--
-- Indices de la tabla `si_log`
--
ALTER TABLE `si_log`
  ADD PRIMARY KEY (`idsi_log`),
  ADD UNIQUE KEY `idsi_log_UNIQUE` (`idsi_log`),
  ADD KEY `fk_Log_Modulo1_idx` (`si_modulo_idsi_modulo`);


--
-- Indices de la tabla `si_posicion`
--
ALTER TABLE `si_posicion`
  ADD PRIMARY KEY (`idsi_posicion`),
  ADD UNIQUE KEY `idsi_posicion_UNIQUE` (`idsi_posicion`),
  ADD UNIQUE KEY `USER_LAT_LNG_UNIQUE` (`created_by`,`latitude`,`longitude`),
  ADD UNIQUE KEY `USER_CREATED_AT_UNIQUE` (`created_by`,`created_at`),
  ADD KEY `fk_posicion_iduser` (`created_by`);







--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `si_modulo`
--
ALTER TABLE `si_modulo`
  MODIFY `idsi_modulo` int(4) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|';
--
-- AUTO_INCREMENT de la tabla `si_permiso`
--
ALTER TABLE `si_permiso`
  MODIFY `idsi_permiso` int(4) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|';
--
-- AUTO_INCREMENT de la tabla `si_rol`
--
ALTER TABLE `si_rol`
  MODIFY `idsi_rol` int(4) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|';
--
-- AUTO_INCREMENT de la tabla `si_user`
--
ALTER TABLE `si_user`
  MODIFY `idsi_user` int(4) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|';

--
-- AUTO_INCREMENT de la tabla `si_sesion`
--
ALTER TABLE `si_sesion`
  MODIFY `idsi_sesion` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|';

--
-- AUTO_INCREMENT de la tabla `si_sesionestado`
--
ALTER TABLE `si_sesionestado`
  MODIFY `idsi_sesionestado` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|';

--
-- AUTO_INCREMENT de la tabla `si_device`
--
ALTER TABLE `si_device`
  MODIFY `idsi_device` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|';

--
-- AUTO_INCREMENT de la tabla `si_alerta`
--
ALTER TABLE `si_alerta`
  MODIFY `idsi_alerta` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|';

--
-- AUTO_INCREMENT de la tabla `si_log`
--
ALTER TABLE `si_log`
  MODIFY `idsi_log` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|';



--
-- AUTO_INCREMENT de la tabla `si_posicion`
--
ALTER TABLE `si_posicion`
  MODIFY `idsi_posicion` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|';

--
-- Restricciones para tablas volcadas
--







--
-- Filtros para la tabla `si_permiso`
--
ALTER TABLE `si_permiso`
  ADD CONSTRAINT `si_fk_Permiso_Modulo1` FOREIGN KEY (`si_modulo_idsi_modulo`) REFERENCES `si_modulo` (`idsi_modulo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `si_fk_Permiso_Rol1` FOREIGN KEY (`si_rol_idsi_rol`) REFERENCES `si_rol` (`idsi_rol`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `si_user`
--
ALTER TABLE `si_user`
  ADD CONSTRAINT `si_fk_User_Rol` FOREIGN KEY (`si_rol_idsi_rol`) REFERENCES `si_rol` (`idsi_rol`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `si_sesion`
--
ALTER TABLE `si_sesion`
  ADD CONSTRAINT `fk_sesion_si_user1` FOREIGN KEY (`si_user_idsi_user`) REFERENCES `si_user` (`idsi_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `si_device`
--
ALTER TABLE `si_device`
  ADD CONSTRAINT `fk_device_si_user1` FOREIGN KEY (`si_user_idsi_user`) REFERENCES `si_user` (`idsi_user`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_device_si_rol1` FOREIGN KEY (`si_rol_idsi_rol`) REFERENCES `si_rol` (`idsi_rol`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `si_alerta`
--
ALTER TABLE `si_alerta`
  ADD CONSTRAINT `fk_alerta_si_user1` FOREIGN KEY (`si_user_idsi_user`) REFERENCES `si_user` (`idsi_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `si_log`
--
ALTER TABLE `si_log`
  ADD CONSTRAINT `fk_Log_Modulo1` FOREIGN KEY (`si_modulo_idsi_modulo`) REFERENCES `si_modulo` (`idsi_modulo`) ON DELETE NO ACTION ON UPDATE NO ACTION;



--
-- Filtros para la tabla `si_posicion`
--
ALTER TABLE `si_posicion`
  ADD CONSTRAINT `fk_iduser_indice1` FOREIGN KEY (`created_by`) REFERENCES `si_user` (`idsi_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;







/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
