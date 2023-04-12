-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-04-2023 a las 15:38:55
-- Versión del servidor: 10.4.18-MariaDB
-- Versión de PHP: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `si_sertosa2_6411ce4229fd4`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `company`
--

CREATE TABLE `company` (
  `idcompany` int(10) UNSIGNED NOT NULL COMMENT '0|',
  `name` varchar(45) COLLATE utf8_bin NOT NULL COMMENT '1|Nombre',
  `companygroup_idcompanygroup` int(10) UNSIGNED NOT NULL COMMENT '1|Grupo|name',
  `logo` varchar(300) COLLATE utf8_bin DEFAULT NULL COMMENT '1|Logotipo',
  `is_deleted` tinyint(1) DEFAULT 0 COMMENT '0|Baja lógica',
  `created_at` timestamp NULL DEFAULT current_timestamp() COMMENT '0|Fecha de creación',
  `created_by` int(11) DEFAULT NULL COMMENT '0|Creado por',
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '0|Fecha de actualización'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='1|1|Empresa||';

--
-- Volcado de datos para la tabla `company`
--

INSERT INTO `company` (`idcompany`, `name`, `companygroup_idcompanygroup`, `logo`, `is_deleted`, `created_at`, `created_by`, `modified_at`) VALUES
(1, 'SERTOSA', 1, NULL, 0, '2023-03-15 14:46:00', 1, '2023-03-15 15:02:21'),
(9, 'AFRISA', 1, NULL, 0, '2023-03-15 16:58:39', 1, '2023-03-15 16:58:39'),
(10, 'USA MEX', 1, NULL, 0, '2023-03-15 16:58:49', 1, '2023-03-15 16:58:49'),
(11, 'XXX', 1, 'http://localhost:3000/company/blob', 0, '2023-04-02 18:44:21', 1, '2023-04-02 18:44:21'),
(12, 'sfdgdfsgdsg', 1, 'http://localhost:3000/company/blob', 0, '2023-04-04 02:30:44', 1, '2023-04-04 02:30:44');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `companygroup`
--

CREATE TABLE `companygroup` (
  `idcompanygroup` int(10) UNSIGNED NOT NULL COMMENT '0|',
  `name` varchar(45) COLLATE utf8_bin NOT NULL COMMENT '1|Nombre',
  `is_deleted` tinyint(1) DEFAULT 0 COMMENT '0|Baja lógica',
  `created_at` timestamp NULL DEFAULT current_timestamp() COMMENT '0|Fecha de creación',
  `created_by` int(11) DEFAULT NULL COMMENT '0|Creado por',
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '0|Fecha de actualización'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='1|1|Empresa grupo||';

--
-- Volcado de datos para la tabla `companygroup`
--

INSERT INTO `companygroup` (`idcompanygroup`, `name`, `is_deleted`, `created_at`, `created_by`, `modified_at`) VALUES
(1, 'SERTOSA', 0, '2023-03-15 14:45:38', 1, '2023-03-15 15:02:11');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `companyunits`
--

CREATE TABLE `companyunits` (
  `idcompanyunits` int(10) UNSIGNED NOT NULL COMMENT '0|',
  `name` varchar(45) COLLATE utf8_bin NOT NULL COMMENT '1|Nombre',
  `company_idcompany` int(10) UNSIGNED NOT NULL COMMENT '0|Compañia|name',
  `is_deleted` tinyint(1) DEFAULT 0 COMMENT '0|Baja lógica',
  `created_at` timestamp NULL DEFAULT current_timestamp() COMMENT '0|Fecha de creación',
  `created_by` int(11) DEFAULT NULL COMMENT '0|Creado por',
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '0|Fecha de actualización'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='1|1|Unidad de negocio||';

--
-- Volcado de datos para la tabla `companyunits`
--

INSERT INTO `companyunits` (`idcompanyunits`, `name`, `company_idcompany`, `is_deleted`, `created_at`, `created_by`, `modified_at`) VALUES
(1, 'AFRISA TALLER', 1, 0, '2023-03-15 14:46:12', 1, '2023-03-15 17:00:17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `employee`
--

CREATE TABLE `employee` (
  `idemployee` int(10) UNSIGNED NOT NULL COMMENT '0|',
  `name` varchar(145) COLLATE utf8_bin NOT NULL COMMENT '1|Nombre completo',
  `email` varchar(85) COLLATE utf8_bin NOT NULL COMMENT '1|Email',
  `si_user_idsi_user` int(10) UNSIGNED NOT NULL COMMENT '1|Usuario|email',
  `companyunits_idcompanyunits` int(10) UNSIGNED NOT NULL COMMENT '1|Unidad de negocio|name',
  `code` varchar(45) COLLATE utf8_bin DEFAULT '0' COMMENT '1|Código interno opcional',
  `is_deleted` tinyint(1) DEFAULT 0 COMMENT '0|Baja lógica',
  `created_at` timestamp NULL DEFAULT current_timestamp() COMMENT '0|Fecha de creación',
  `created_by` int(11) DEFAULT NULL COMMENT '0|Creado por',
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '0|Fecha de actualización'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='1|1|Empleado||';

--
-- Volcado de datos para la tabla `employee`
--

INSERT INTO `employee` (`idemployee`, `name`, `email`, `si_user_idsi_user`, `companyunits_idcompanyunits`, `code`, `is_deleted`, `created_at`, `created_by`, `modified_at`) VALUES
(44, 'PANCHO LOPEZ', 'pancho@lopez.com', 1, 1, '4321', 0, '2023-04-02 17:44:15', 1, '2023-04-02 17:44:15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `family`
--

CREATE TABLE `family` (
  `idfamily` int(10) UNSIGNED NOT NULL COMMENT '0|',
  `name` varchar(45) COLLATE utf8_bin NOT NULL COMMENT '1|Nombre',
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0|Eliminado',
  `created_by` int(10) UNSIGNED ZEROFILL NOT NULL COMMENT '0|Creado por',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '0|Fecha de creación',
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '0|Fecha de modificación'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='1|1|Familia de producto||';

--
-- Volcado de datos para la tabla `family`
--

INSERT INTO `family` (`idfamily`, `name`, `is_deleted`, `created_by`, `created_at`, `modified_at`) VALUES
(1, 'BUJIAS', 0, 0000000001, '2023-03-28 14:57:47', '2023-03-28 14:57:47');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orderin`
--

CREATE TABLE `orderin` (
  `idorderin` int(10) UNSIGNED NOT NULL COMMENT '0|',
  `warehouse_idwarehouse` int(10) UNSIGNED NOT NULL,
  `product_idproduct` int(10) UNSIGNED NOT NULL COMMENT '1|Producto|name',
  `quantity` int(11) NOT NULL COMMENT '1|Cantidad',
  `motive` set('AJUSTE DE INVENTARIO','ROBO','DAÑO','CADUCIDAD') COLLATE utf8_bin NOT NULL COMMENT '1|Motivo',
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0|Eliminado',
  `created_by` int(10) UNSIGNED ZEROFILL NOT NULL COMMENT '0|Creado por',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '0|Fecha de creación',
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '0|Fecha de modificación'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='1|1|Orden de entrada||';

--
-- Volcado de datos para la tabla `orderin`
--

INSERT INTO `orderin` (`idorderin`, `warehouse_idwarehouse`, `product_idproduct`, `quantity`, `motive`, `is_deleted`, `created_by`, `created_at`, `modified_at`) VALUES
(1, 2, 1, 50, 'AJUSTE DE INVENTARIO', 0, 0000000001, '2023-04-02 19:05:02', '2023-04-07 02:58:42'),
(2, 1, 3, 123213, 'CADUCIDAD', 0, 0000000001, '2023-04-05 03:38:40', '2023-04-07 02:58:53'),
(3, 1, 1, 999, 'ROBO', 0, 0000000001, '2023-04-06 18:07:11', '2023-04-07 02:58:47'),
(4, 1, 1, 802, 'AJUSTE DE INVENTARIO', 0, 0000000001, '2023-04-07 23:40:09', '2023-04-07 23:40:09'),
(5, 1, 1, 3, 'DAÑO', 0, 0000000001, '2023-04-07 23:48:05', '2023-04-07 23:48:05');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orderout`
--

CREATE TABLE `orderout` (
  `idorderout` int(10) UNSIGNED NOT NULL COMMENT '0|',
  `warehouse_idwarehouse` int(10) UNSIGNED NOT NULL COMMENT '1|Almacen|name',
  `product_idproduct` int(10) UNSIGNED NOT NULL COMMENT '1|Producto|name',
  `quantity` int(11) NOT NULL COMMENT '1|Cantidad',
  `motive` set('AJUSTE DE INVENTARIO','ROBO','DAÑO','CADUCIDAD') COLLATE utf8_bin NOT NULL COMMENT '1|Motivo',
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0|Eliminado',
  `created_by` int(10) UNSIGNED ZEROFILL NOT NULL COMMENT '0|Creado por',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '0|Fecha de creación',
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '0|Fecha de modificación'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='1|1|Orden de salida||';

--
-- Volcado de datos para la tabla `orderout`
--

INSERT INTO `orderout` (`idorderout`, `warehouse_idwarehouse`, `product_idproduct`, `quantity`, `motive`, `is_deleted`, `created_by`, `created_at`, `modified_at`) VALUES
(1, 1, 1, 679, 'DAÑO', 0, 0000000001, '2023-04-02 19:05:43', '2023-04-07 02:58:36'),
(2, 1, 1, 998, 'ROBO', 0, 0000000001, '2023-04-06 18:07:59', '2023-04-07 02:58:31'),
(3, 1, 1, 123, 'AJUSTE DE INVENTARIO', 0, 0000000001, '2023-04-07 02:57:14', '2023-04-07 02:58:24'),
(4, 1, 1, 3, 'CADUCIDAD', 0, 0000000001, '2023-04-07 23:48:17', '2023-04-07 23:48:17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product`
--

CREATE TABLE `product` (
  `idproduct` int(10) UNSIGNED NOT NULL COMMENT '0|',
  `name` varchar(45) COLLATE utf8_bin NOT NULL COMMENT '1|Nombre',
  `description` varchar(345) COLLATE utf8_bin DEFAULT NULL COMMENT '1|Descripción',
  `provider_idprovider` int(10) UNSIGNED NOT NULL COMMENT '1|Proveedor|name',
  `family_idfamily` int(10) UNSIGNED NOT NULL COMMENT '1|Familia|name',
  `sku` varchar(16) COLLATE utf8_bin NOT NULL COMMENT '1|SKU',
  `aka` varchar(100) COLLATE utf8_bin NOT NULL COMMENT '1|AKA',
  `type` set('ORIGINAL','GENÉRICA','HUESO','') COLLATE utf8_bin NOT NULL COMMENT '1|Tipo',
  `cost` int(11) NOT NULL COMMENT '1|Costo',
  `min` int(11) NOT NULL COMMENT '1|Mínimo en inventario',
  `id` varchar(20) COLLATE utf8_bin NOT NULL COMMENT '1|ID por Proveedor',
  `reorderpoint` int(11) NOT NULL COMMENT '1|Punto de reorden',
  `max` int(11) NOT NULL COMMENT '1|Cantidad máxima en inventario',
  `caducity` date DEFAULT NULL COMMENT '1|Fecha caducidad',
  `unitin` set('PIEZA','GRAMO','UNIDAD','KIT') COLLATE utf8_bin NOT NULL COMMENT '1|Unidad de compra',
  `unitout` set('PIEZA','GRAMO','UNIDAD','KIT') COLLATE utf8_bin NOT NULL COMMENT '1|Unidad de salida',
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0|Eliminado',
  `created_by` int(10) UNSIGNED ZEROFILL NOT NULL COMMENT '0|Creado por',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '0|Fecha de creación',
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '0|Fecha de modificación'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='1|1|Refacción||';

--
-- Volcado de datos para la tabla `product`
--

INSERT INTO `product` (`idproduct`, `name`, `description`, `provider_idprovider`, `family_idfamily`, `sku`, `aka`, `type`, `cost`, `min`, `id`, `reorderpoint`, `max`, `caducity`, `unitin`, `unitout`, `is_deleted`, `created_by`, `created_at`, `modified_at`) VALUES
(1, 'BUJIA 1/2', 'X', 1, 1, '', '', '', 0, 0, '', 0, 0, NULL, '', '', 0, 0000000001, '2023-03-28 14:58:01', '2023-03-28 14:58:01'),
(2, 'sdfgd', 'rtsergstres', 1, 1, '', '', '', 0, 0, '', 0, 0, NULL, '', '', 0, 0000000001, '2023-04-04 01:48:06', '2023-04-04 01:48:06'),
(3, 'VALERO', 'X', 1, 1, '', '', '', 0, 0, '', 0, 0, NULL, '', '', 0, 0000000001, '2023-04-05 03:38:02', '2023-04-05 03:38:02'),
(4, 'XXXX', 'XXX', 1, 1, '468898', 'XXXX', 'ORIGINAL', 577, 567, 'CHKHK758', 7, 897, '2023-04-07', 'PIEZA', 'KIT', 0, 0000000001, '2023-04-06 18:04:42', '2023-04-06 18:04:42');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `project`
--

CREATE TABLE `project` (
  `idproject` int(10) UNSIGNED NOT NULL COMMENT '0|',
  `name` varchar(45) COLLATE utf8_bin NOT NULL COMMENT '1|Nombre',
  `companyunits_idcompanyunits` int(10) UNSIGNED NOT NULL COMMENT '1|Unidad de negocio|name',
  `status` set('EN PROCESO','COMPLETADO','VACIO') COLLATE utf8_bin NOT NULL COMMENT '1|Estatus',
  `is_deleted` tinyint(1) DEFAULT 0 COMMENT '0|Baja lógica',
  `created_at` timestamp NULL DEFAULT current_timestamp() COMMENT '0|Fecha de creación',
  `created_by` int(11) DEFAULT NULL COMMENT '0|Creado por',
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '0|Fecha de actualización',
  `vehicle_idvehicle` int(10) UNSIGNED NOT NULL COMMENT '1|Vehículo|name'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='1|1|Reparaciones||';

--
-- Volcado de datos para la tabla `project`
--

INSERT INTO `project` (`idproject`, `name`, `companyunits_idcompanyunits`, `status`, `is_deleted`, `created_at`, `created_by`, `modified_at`, `vehicle_idvehicle`) VALUES
(12, 'SERVICIO X', 1, 'VACIO', 0, '2023-03-28 14:52:41', 1, '2023-04-07 22:54:47', 1),
(13, 'test 2', 1, 'COMPLETADO', 0, '2023-04-07 22:54:32', 1, '2023-04-07 22:54:32', 1),
(14, 'xxxxxxxxxxxxx', 1, 'COMPLETADO', 0, '2023-04-08 00:16:44', 1, '2023-04-08 00:16:44', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `project_service`
--

CREATE TABLE `project_service` (
  `idproject_service` int(10) UNSIGNED NOT NULL COMMENT '0|',
  `project_idproject` int(10) UNSIGNED NOT NULL COMMENT '1|Reparación|name',
  `service_idservice` int(10) UNSIGNED NOT NULL COMMENT '1|Servicio|name',
  `is_deleted` tinyint(1) DEFAULT 0 COMMENT '0|Baja lógica',
  `created_at` timestamp NULL DEFAULT current_timestamp() COMMENT '0|Fecha de creación',
  `created_by` int(11) DEFAULT NULL COMMENT '0|Creado por',
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '0|Fecha de actualización'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='1|1|Orden servicio||';

--
-- Volcado de datos para la tabla `project_service`
--

INSERT INTO `project_service` (`idproject_service`, `project_idproject`, `service_idservice`, `is_deleted`, `created_at`, `created_by`, `modified_at`) VALUES
(1, 12, 71, 0, '2023-04-02 17:35:20', 1, '2023-04-02 17:43:25'),
(2, 12, 71, 0, '2023-04-05 05:15:27', 1, '2023-04-07 04:20:00'),
(3, 12, 72, 0, '2023-04-12 02:06:21', 1, '2023-04-12 02:06:21'),
(4, 12, 73, 0, '2023-04-12 02:06:29', 1, '2023-04-12 02:06:29');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `provider`
--

CREATE TABLE `provider` (
  `idprovider` int(10) UNSIGNED NOT NULL COMMENT '0|',
  `name` varchar(45) COLLATE utf8_bin NOT NULL COMMENT '1|Nombre',
  `status` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '1|Status',
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0|Eliminado',
  `created_by` int(10) UNSIGNED ZEROFILL NOT NULL COMMENT '0|Creado por',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '0|Fecha de creación',
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '0|Fecha de modificación'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='1|1|Proveedor||';

--
-- Volcado de datos para la tabla `provider`
--

INSERT INTO `provider` (`idprovider`, `name`, `status`, `is_deleted`, `created_by`, `created_at`, `modified_at`) VALUES
(1, 'GOODYEAR', 'ACTIVO', 0, 0000000001, '2023-03-28 14:51:17', '2023-03-28 14:51:17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `service`
--

CREATE TABLE `service` (
  `idservice` int(10) UNSIGNED NOT NULL COMMENT '0|',
  `name` varchar(145) COLLATE utf8_bin NOT NULL COMMENT '1|Nombre',
  `initialMessage` text COLLATE utf8_bin DEFAULT NULL COMMENT '1|Mensaje inicial',
  `finalMessage` text COLLATE utf8_bin DEFAULT NULL COMMENT '1|Mensaje final',
  `emailMessage` text COLLATE utf8_bin DEFAULT NULL COMMENT '1|Mensaje email',
  `downloable` tinyint(1) DEFAULT 0 COMMENT '1|Descargable',
  `showEmployee` tinyint(1) NOT NULL COMMENT '1|Muestra empleado',
  `target` set('companygroup','company','companyunits','usergroup') COLLATE utf8_bin DEFAULT 'companyunits' COMMENT '1|Target',
  `time` int(11) DEFAULT 0 COMMENT '1|Tiempo para contestar',
  `saveAsTemplate` tinyint(1) DEFAULT 0 COMMENT '1|Elegible como plantilla',
  `is_deleted` tinyint(1) DEFAULT 0 COMMENT '0|Baja lógica',
  `created_at` timestamp NULL DEFAULT current_timestamp() COMMENT '0|Fecha de creación',
  `created_by` int(11) DEFAULT NULL COMMENT '0|Creado por',
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '0|Fecha de actualización'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='1|1|Servicio||';

--
-- Volcado de datos para la tabla `service`
--

INSERT INTO `service` (`idservice`, `name`, `initialMessage`, `finalMessage`, `emailMessage`, `downloable`, `showEmployee`, `target`, `time`, `saveAsTemplate`, `is_deleted`, `created_at`, `created_by`, `modified_at`) VALUES
(71, 'CAMBIO DE BUJIAS', 'DESCRIPCION INICIAL', 'DESCRIPCION FINAL', 'MENSAJE DIRECTO DEL JEFE', 1, 1, 'companygroup', 34265, 1, 0, '2023-03-28 14:55:31', 1, '2023-03-28 14:55:31'),
(72, 'MI SEGUNDO SERVICO', 'DESC DE SEGUNDO SERVICO', NULL, NULL, 0, 0, 'companyunits', 0, 0, 0, '2023-04-12 02:05:46', 1, '2023-04-12 02:05:46'),
(73, 'TERCER SERVICO', 'DESC. DE TERCER SERVICIO', NULL, NULL, 0, 0, 'companyunits', 0, 0, 0, '2023-04-12 02:06:02', 1, '2023-04-12 02:06:02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `service_employee`
--

CREATE TABLE `service_employee` (
  `idservice_employee` int(10) UNSIGNED NOT NULL COMMENT '0|',
  `status` set('SIN INICIAR','INICIADA','COMPLETADA','TIEMPO AGOTADO') COLLATE utf8_bin NOT NULL DEFAULT 'SIN INICIAR' COMMENT '1|Estatus',
  `employee_idemployee` int(10) UNSIGNED NOT NULL COMMENT '1|Empleado|name',
  `project_service_idproject_service` int(10) UNSIGNED NOT NULL COMMENT '1|Orden de reparación|**name campaign.idcampaign campaign_survey.campaign_idcampaign',
  `ponderationFinal` float NOT NULL COMMENT '1|Resultado final',
  `observations` varchar(145) COLLATE utf8_bin DEFAULT NULL COMMENT '1|Observaciones',
  `url` varchar(300) COLLATE utf8_bin DEFAULT NULL COMMENT '1|Url Pdf',
  `time` double DEFAULT NULL COMMENT '1|Tiempo en comtestar encuesta',
  `is_deleted` tinyint(1) DEFAULT 0 COMMENT '0|Baja lógica',
  `created_at` timestamp NULL DEFAULT current_timestamp() COMMENT '0|Fecha de creación',
  `created_by` int(11) DEFAULT NULL COMMENT '0|Creado por',
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '0|Fecha de actualización'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='1|1|Trabajando||';

--
-- Volcado de datos para la tabla `service_employee`
--

INSERT INTO `service_employee` (`idservice_employee`, `status`, `employee_idemployee`, `project_service_idproject_service`, `ponderationFinal`, `observations`, `url`, `time`, `is_deleted`, `created_at`, `created_by`, `modified_at`) VALUES
(120, 'SIN INICIAR', 44, 1, 0, 'test', NULL, NULL, 0, '2023-04-02 18:02:23', 1, '2023-04-02 18:02:23'),
(121, 'SIN INICIAR', 44, 1, 0, 'test2', NULL, NULL, 0, '2023-04-02 18:04:18', 1, '2023-04-02 18:04:18'),
(122, 'SIN INICIAR', 44, 1, 0, NULL, NULL, NULL, 0, '2023-04-05 05:15:38', 1, '2023-04-05 05:15:38');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `service_product`
--

CREATE TABLE `service_product` (
  `idservice_product` int(10) UNSIGNED NOT NULL COMMENT '0|',
  `service_idservice` int(10) UNSIGNED NOT NULL COMMENT '1|Servicio|name',
  `product_idproduct` int(10) UNSIGNED NOT NULL COMMENT '1|Refacción|name',
  `quantity` int(11) NOT NULL DEFAULT 1 COMMENT '1|Cantidad',
  `is_deleted` tinyint(1) DEFAULT 0 COMMENT '0|Baja lógica',
  `created_at` timestamp NULL DEFAULT current_timestamp() COMMENT '0|Fecha de creación',
  `created_by` int(11) DEFAULT NULL COMMENT '0|Creado por',
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '0|Fecha de actualización'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='1|1|Servicio Refacción||';

--
-- Volcado de datos para la tabla `service_product`
--

INSERT INTO `service_product` (`idservice_product`, `service_idservice`, `product_idproduct`, `quantity`, `is_deleted`, `created_at`, `created_by`, `modified_at`) VALUES
(1, 71, 1, 888, 0, '2023-04-10 19:10:15', 1, '2023-04-10 19:10:15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `si_alerta`
--

CREATE TABLE `si_alerta` (
  `idsi_alerta` int(10) UNSIGNED NOT NULL COMMENT '0|',
  `si_user_idsi_user` int(4) UNSIGNED NOT NULL COMMENT '1|Usuario del Sistema|email',
  `tipoAlerta` set('ALERTA','AVISO','CHAT','TRACKING','OTRO') NOT NULL DEFAULT 'ALERTA' COMMENT '1|Tipo de Alerta',
  `emailRemitente` varchar(150) DEFAULT NULL COMMENT '1|Email Remitente',
  `emailDestinatario` varchar(150) DEFAULT NULL COMMENT '1|Email Destinatario',
  `mensaje` varchar(345) NOT NULL COMMENT '1|Mensaje',
  `vista` tinyint(1) DEFAULT NULL COMMENT '1|Vista',
  `leida` tinyint(1) DEFAULT NULL COMMENT '1|Leida',
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0|Eliminado',
  `created_by` int(10) NOT NULL COMMENT '0|Creado por',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '0|Fecha de creación',
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '0|Fecha de modificación'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Alerta||';

--
-- Volcado de datos para la tabla `si_alerta`
--

INSERT INTO `si_alerta` (`idsi_alerta`, `si_user_idsi_user`, `tipoAlerta`, `emailRemitente`, `emailDestinatario`, `mensaje`, `vista`, `leida`, `is_deleted`, `created_by`, `created_at`, `modified_at`) VALUES
(117, 1, 'ALERTA', NULL, 'cesar.desarrollo.web@gmail.com', 'Registro creado: 9', 0, 0, 0, 1, '2023-03-15 16:58:39', '2023-03-15 16:58:39'),
(118, 1, 'ALERTA', NULL, 'cesar.desarrollo.web@gmail.com', 'Registro creado: 10', 0, 0, 0, 1, '2023-03-15 16:58:49', '2023-03-15 16:58:49'),
(119, 1, 'ALERTA', NULL, 'cesar.desarrollo.web@gmail.com', 'Registro actualizado: 1', 0, 0, 0, 1, '2023-03-15 17:00:17', '2023-03-15 17:00:17'),
(120, 1, 'ALERTA', NULL, 'cesar.desarrollo.web@gmail.com', 'Registro creado: 1', 0, 0, 0, 1, '2023-03-27 23:28:11', '2023-03-27 23:28:11'),
(121, 1, 'ALERTA', NULL, 'cesar.desarrollo.web@gmail.com', 'Registro creado: 2', 0, 0, 0, 1, '2023-03-27 23:28:42', '2023-03-27 23:28:42'),
(122, 1, 'ALERTA', NULL, 'cesar.desarrollo.web@gmail.com', 'Registro creado: 2', 0, 0, 0, 1, '2023-03-28 14:47:25', '2023-03-28 14:47:25'),
(123, 1, 'ALERTA', NULL, 'cesar.desarrollo.web@gmail.com', 'Registro creado: 3', 0, 0, 0, 1, '2023-03-28 14:47:35', '2023-03-28 14:47:35'),
(124, 1, 'ALERTA', NULL, 'cesar.desarrollo.web@gmail.com', 'Registro creado: 1', 0, 0, 0, 1, '2023-03-28 14:51:18', '2023-03-28 14:51:18'),
(125, 1, 'ALERTA', NULL, 'cesar.desarrollo.web@gmail.com', 'Registro creado: 1', 0, 0, 0, 1, '2023-03-28 14:52:29', '2023-03-28 14:52:29'),
(126, 1, 'ALERTA', NULL, 'cesar.desarrollo.web@gmail.com', 'Registro creado: 12', 0, 0, 0, 1, '2023-03-28 14:52:41', '2023-03-28 14:52:41'),
(127, 1, 'ALERTA', NULL, 'cesar.desarrollo.web@gmail.com', 'Registro creado: 71', 0, 0, 0, 1, '2023-03-28 14:55:31', '2023-03-28 14:55:31'),
(128, 1, 'ALERTA', NULL, 'cesar.desarrollo.web@gmail.com', 'Registro creado: 1', 0, 0, 0, 1, '2023-03-28 14:57:47', '2023-03-28 14:57:47'),
(129, 1, 'ALERTA', NULL, 'cesar.desarrollo.web@gmail.com', 'Registro creado: 1', 0, 0, 0, 1, '2023-03-28 14:58:01', '2023-03-28 14:58:01'),
(130, 1, 'ALERTA', NULL, 'cesar.desarrollo.web@gmail.com', 'Registro creado: 0', 0, 0, 0, 1, '2023-04-02 17:35:20', '2023-04-02 17:35:20'),
(131, 1, 'ALERTA', NULL, 'cesar.desarrollo.web@gmail.com', 'Registro creado: 44', 0, 0, 0, 1, '2023-04-02 17:44:15', '2023-04-02 17:44:15'),
(132, 1, 'ALERTA', NULL, 'cesar.desarrollo.web@gmail.com', 'Registro creado: 120', 0, 0, 0, 1, '2023-04-02 18:02:23', '2023-04-02 18:02:23'),
(133, 1, 'ALERTA', NULL, 'cesar.desarrollo.web@gmail.com', 'Registro creado: 121', 0, 0, 0, 1, '2023-04-02 18:04:18', '2023-04-02 18:04:18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `si_device`
--

CREATE TABLE `si_device` (
  `idsi_device` int(10) UNSIGNED NOT NULL COMMENT '0|',
  `codigo` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '1|Código',
  `descripcion` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '0|Descripción',
  `token` text COLLATE utf8_bin NOT NULL COMMENT '1|Token',
  `si_user_idsi_user` int(10) UNSIGNED NOT NULL COMMENT '1|Usuario|email',
  `si_rol_idsi_rol` int(10) UNSIGNED NOT NULL COMMENT '1|Rol|nombre',
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0|Eliminado',
  `created_by` int(10) NOT NULL COMMENT '0|Creado por',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '0|Fecha de creación',
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '0|Fecha de modificación'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='1|1|Device||';

--
-- Volcado de datos para la tabla `si_device`
--

INSERT INTO `si_device` (`idsi_device`, `codigo`, `descripcion`, `token`, `si_user_idsi_user`, `si_rol_idsi_rol`, `is_deleted`, `created_by`, `created_at`, `modified_at`) VALUES
(1, 'r567', NULL, '4567890', 1, 2, 0, 1, '2023-04-04 03:56:26', '2023-04-04 03:56:26');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `si_log`
--

CREATE TABLE `si_log` (
  `idsi_log` int(10) UNSIGNED NOT NULL COMMENT '0|',
  `si_modulo_idsi_modulo` int(10) UNSIGNED NOT NULL COMMENT '1|Módulo|nombre',
  `accion` varchar(150) NOT NULL COMMENT '1|Acción',
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0|Eliminado',
  `created_by` int(10) UNSIGNED ZEROFILL NOT NULL COMMENT '0|Creado por',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '0|Fecha de creación',
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '0|Fecha de modificación'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Logs||';

--
-- Volcado de datos para la tabla `si_log`
--

INSERT INTO `si_log` (`idsi_log`, `si_modulo_idsi_modulo`, `accion`, `is_deleted`, `created_by`, `created_at`, `modified_at`) VALUES
(947, 31, 'Registro creado: 1', 0, 0000000001, '2023-03-27 23:28:11', '2023-03-27 23:28:11'),
(948, 31, 'Registro creado: 2', 0, 0000000001, '2023-03-27 23:28:41', '2023-03-27 23:28:41'),
(952, 30, 'Registro creado: 1', 0, 0000000001, '2023-03-28 14:52:29', '2023-03-28 14:52:29'),
(965, 17, 'Registro actualizado: 5', 0, 0000000001, '2023-04-02 19:29:18', '2023-04-02 19:29:18'),
(966, 18, 'Registro creado: 58', 0, 0000000001, '2023-04-02 19:31:23', '2023-04-02 19:31:23'),
(967, 20, 'Registro creado: 1', 0, 0000000001, '2023-04-02 19:33:40', '2023-04-02 19:33:40'),
(968, 24, 'Registro creado: 1', 0, 0000000001, '2023-04-02 19:51:41', '2023-04-02 19:51:41'),
(969, 25, 'Registro creado: 1', 0, 0000000001, '2023-04-02 19:51:53', '2023-04-02 19:51:53'),
(970, 27, 'Registro creado: 1', 0, 0000000001, '2023-04-02 19:52:02', '2023-04-02 19:52:02'),
(971, 25, 'Registro creado: 2', 0, 0000000001, '2023-04-03 04:45:28', '2023-04-03 04:45:28'),
(972, 26, 'Registro creado: 1', 0, 0000000001, '2023-04-03 05:03:47', '2023-04-03 05:03:47'),
(973, 27, 'Registro creado: 2', 0, 0000000001, '2023-04-03 05:10:15', '2023-04-03 05:10:15'),
(974, 27, 'Registro creado: 3', 0, 0000000001, '2023-04-03 05:12:47', '2023-04-03 05:12:47'),
(975, 28, 'Registro creado: 1', 0, 0000000001, '2023-04-03 05:15:33', '2023-04-03 05:15:33'),
(976, 30, 'Registro actualizado: 1', 0, 0000000001, '2023-04-04 01:44:33', '2023-04-04 01:44:33'),
(977, 8, 'Registro creado: 2', 0, 0000000001, '2023-04-04 01:48:06', '2023-04-04 01:48:06'),
(978, 27, 'Registro creado: 4', 0, 0000000001, '2023-04-04 01:51:56', '2023-04-04 01:51:56'),
(979, 19, 'Registro creado: 4', 0, 0000000001, '2023-04-04 01:58:06', '2023-04-04 01:58:06'),
(980, 19, 'Registro creado: 5', 0, 0000000001, '2023-04-04 01:58:18', '2023-04-04 01:58:18'),
(981, 19, 'Registro creado: 6', 0, 0000000001, '2023-04-04 01:58:34', '2023-04-04 01:58:34'),
(982, 18, 'Registro creado: 59', 0, 0000000001, '2023-04-04 02:02:07', '2023-04-04 02:02:07'),
(983, 19, 'Registro creado: 7', 0, 0000000001, '2023-04-04 02:06:55', '2023-04-04 02:06:55'),
(984, 1, 'Registro creado con archivo adjunto: 12', 0, 0000000001, '2023-04-04 02:30:44', '2023-04-04 02:30:44'),
(985, 15, 'Registro creado: 1', 0, 0000000001, '2023-04-04 03:56:26', '2023-04-04 03:56:26'),
(986, 8, 'Registro creado: 3', 0, 0000000001, '2023-04-05 03:38:02', '2023-04-05 03:38:02'),
(987, 6, 'Registro creado: 2', 0, 0000000001, '2023-04-05 03:38:40', '2023-04-05 03:38:40'),
(988, 10, 'Registro creado: 0', 0, 0000000001, '2023-04-05 05:15:27', '2023-04-05 05:15:27'),
(989, 13, 'Registro creado: 122', 0, 0000000001, '2023-04-05 05:15:38', '2023-04-05 05:15:38'),
(990, 8, 'Registro creado: 4', 0, 0000000001, '2023-04-06 18:04:42', '2023-04-06 18:04:42'),
(991, 6, 'Registro creado: 3', 0, 0000000001, '2023-04-06 18:07:11', '2023-04-06 18:07:11'),
(992, 7, 'Registro creado: 2', 0, 0000000001, '2023-04-06 18:07:59', '2023-04-06 18:07:59'),
(993, 7, 'Registro actualizado: 2', 0, 0000000001, '2023-04-07 02:57:00', '2023-04-07 02:57:00'),
(994, 7, 'Registro creado: 3', 0, 0000000001, '2023-04-07 02:57:14', '2023-04-07 02:57:14'),
(995, 7, 'Registro actualizado: 3', 0, 0000000001, '2023-04-07 02:58:24', '2023-04-07 02:58:24'),
(996, 7, 'Registro actualizado: 2', 0, 0000000001, '2023-04-07 02:58:31', '2023-04-07 02:58:31'),
(997, 7, 'Registro actualizado: 1', 0, 0000000001, '2023-04-07 02:58:36', '2023-04-07 02:58:36'),
(998, 6, 'Registro actualizado: 1', 0, 0000000001, '2023-04-07 02:58:42', '2023-04-07 02:58:42'),
(999, 6, 'Registro actualizado: 3', 0, 0000000001, '2023-04-07 02:58:47', '2023-04-07 02:58:47'),
(1000, 6, 'Registro actualizado: 2', 0, 0000000001, '2023-04-07 02:58:54', '2023-04-07 02:58:54'),
(1001, 9, 'Registro actualizado: 12', 0, 0000000001, '2023-04-07 16:16:23', '2023-04-07 16:16:23'),
(1002, 9, 'Registro actualizado: 12', 0, 0000000001, '2023-04-07 16:17:42', '2023-04-07 16:17:42'),
(1003, 28, 'Registro creado: 2', 0, 0000000001, '2023-04-07 21:41:06', '2023-04-07 21:41:06'),
(1004, 28, 'Registro creado: 3', 0, 0000000001, '2023-04-07 21:43:41', '2023-04-07 21:43:41'),
(1005, 28, 'Registro creado: 4', 0, 0000000001, '2023-04-07 21:43:51', '2023-04-07 21:43:51'),
(1006, 28, 'Registro creado: 5', 0, 0000000001, '2023-04-07 21:44:02', '2023-04-07 21:44:02'),
(1007, 28, 'Registro creado: 6', 0, 0000000001, '2023-04-07 21:49:54', '2023-04-07 21:49:54'),
(1008, 28, 'Registro actualizado: 6', 0, 0000000001, '2023-04-07 21:50:05', '2023-04-07 21:50:05'),
(1009, 28, 'Registro eliminado: 6', 0, 0000000001, '2023-04-07 21:52:04', '2023-04-07 21:52:04'),
(1010, 28, 'Registro eliminado: 3', 0, 0000000001, '2023-04-07 21:54:54', '2023-04-07 21:54:54'),
(1011, 28, 'Registro actualizado: 2', 0, 0000000001, '2023-04-07 21:54:59', '2023-04-07 21:54:59'),
(1012, 28, 'Registro creado: 7', 0, 0000000001, '2023-04-07 22:51:02', '2023-04-07 22:51:02'),
(1013, 28, 'Registro creado: 8', 0, 0000000001, '2023-04-07 22:51:41', '2023-04-07 22:51:41'),
(1014, 9, 'Registro creado: 13', 0, 0000000001, '2023-04-07 22:54:32', '2023-04-07 22:54:32'),
(1015, 9, 'Registro actualizado: 12', 0, 0000000001, '2023-04-07 22:54:47', '2023-04-07 22:54:47'),
(1016, 30, 'Registro actualizado: 1', 0, 0000000001, '2023-04-07 23:00:08', '2023-04-07 23:00:08'),
(1017, 25, 'Registro actualizado: 1', 0, 0000000001, '2023-04-07 23:08:53', '2023-04-07 23:08:53'),
(1018, 25, 'Registro actualizado: 1', 0, 0000000001, '2023-04-07 23:08:58', '2023-04-07 23:08:58'),
(1019, 31, 'Registro actualizado: 1', 0, 0000000001, '2023-04-07 23:39:40', '2023-04-07 23:39:40'),
(1020, 6, 'Registro creado: 4', 0, 0000000001, '2023-04-07 23:40:09', '2023-04-07 23:40:09'),
(1021, 6, 'Registro creado: 5', 0, 0000000001, '2023-04-07 23:48:05', '2023-04-07 23:48:05'),
(1022, 7, 'Registro creado: 4', 0, 0000000001, '2023-04-07 23:48:17', '2023-04-07 23:48:17'),
(1023, 9, 'Registro creado: 14', 0, 0000000001, '2023-04-08 00:16:44', '2023-04-08 00:16:44'),
(1024, 27, 'Registro actualizado: 1', 0, 0000000001, '2023-04-08 15:07:14', '2023-04-08 15:07:14'),
(1025, 27, 'Registro actualizado: 1', 0, 0000000001, '2023-04-08 15:08:43', '2023-04-08 15:08:43'),
(1026, 26, 'Registro creado: 2', 0, 0000000001, '2023-04-08 15:12:17', '2023-04-08 15:12:17'),
(1027, 26, 'Registro creado: 3', 0, 0000000001, '2023-04-08 15:12:33', '2023-04-08 15:12:33'),
(1028, 29, 'Registro creado: 2', 0, 0000000001, '2023-04-09 15:11:47', '2023-04-09 15:11:47'),
(1029, 28, 'Registro creado: 10', 0, 0000000001, '2023-04-10 17:18:05', '2023-04-10 17:18:05'),
(1030, 17, 'Registro actualizado: 32', 0, 0000000001, '2023-04-10 19:09:36', '2023-04-10 19:09:36'),
(1031, 1, 'Registro creado: 1', 0, 0000000001, '2023-04-10 19:10:15', '2023-04-10 19:10:15'),
(1032, 12, 'Registro creado: 72', 0, 0000000001, '2023-04-12 02:05:46', '2023-04-12 02:05:46'),
(1033, 12, 'Registro creado: 73', 0, 0000000001, '2023-04-12 02:06:02', '2023-04-12 02:06:02'),
(1034, 10, 'Registro creado: 3', 0, 0000000001, '2023-04-12 02:06:21', '2023-04-12 02:06:21'),
(1035, 10, 'Registro creado: 4', 0, 0000000001, '2023-04-12 02:06:30', '2023-04-12 02:06:30'),
(1036, 27, 'Registro creado: 5', 0, 0000000001, '2023-04-12 02:45:21', '2023-04-12 02:45:21'),
(1037, 28, 'Registro creado: 13', 0, 0000000001, '2023-04-12 02:49:45', '2023-04-12 02:49:45'),
(1038, 28, 'Registro creado: 14', 0, 0000000001, '2023-04-12 02:49:50', '2023-04-12 02:49:50'),
(1039, 27, 'Registro creado: 6', 0, 0000000001, '2023-04-12 02:50:01', '2023-04-12 02:50:01'),
(1040, 27, 'Registro creado: 7', 0, 0000000001, '2023-04-12 02:54:39', '2023-04-12 02:54:39'),
(1041, 28, 'Registro creado: 15', 0, 0000000001, '2023-04-12 02:54:51', '2023-04-12 02:54:51'),
(1042, 17, 'Registro creado: 33', 0, 0000000001, '2023-04-12 03:25:05', '2023-04-12 03:25:05'),
(1043, 17, 'Registro actualizado: 33', 0, 0000000001, '2023-04-12 03:25:18', '2023-04-12 03:25:18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `si_modulo`
--

CREATE TABLE `si_modulo` (
  `idsi_modulo` int(10) UNSIGNED NOT NULL COMMENT '0|',
  `codigo` varchar(15) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '1|Código',
  `descripcion` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '0|Descripción',
  `nombre` varchar(55) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '1|Nombre',
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0|Eliminado',
  `created_by` int(10) NOT NULL COMMENT '0|Creado por',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '0|Fecha de creación',
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '0|Fecha de modificación'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `si_modulo`
--

INSERT INTO `si_modulo` (`idsi_modulo`, `codigo`, `descripcion`, `nombre`, `is_deleted`, `created_by`, `created_at`, `modified_at`) VALUES
(1, '', NULL, 'company', 0, 1, '2023-03-15 19:56:10', '2023-04-02 19:27:10'),
(2, '', NULL, 'companygroup', 0, 1, '2023-03-15 19:56:10', '2023-04-02 19:27:34'),
(3, '', NULL, 'companyunits', 0, 1, '2023-03-15 19:56:10', '2023-04-02 19:27:34'),
(4, '', NULL, 'employee', 0, 1, '2023-03-15 19:56:10', '2023-04-02 19:27:34'),
(5, 'FAMILIA', NULL, 'family', 0, 1, '2023-03-15 19:56:11', '2023-04-02 19:29:18'),
(6, '', NULL, 'orderin', 0, 1, '2023-03-15 19:56:11', '2023-04-02 19:27:34'),
(7, '', NULL, 'orderout', 0, 1, '2023-03-15 19:56:11', '2023-04-02 19:27:34'),
(8, '', NULL, 'product', 0, 1, '2023-03-15 19:56:11', '2023-04-02 19:27:34'),
(9, '', NULL, 'project', 0, 1, '2023-03-15 19:56:11', '2023-04-02 19:27:34'),
(10, '', NULL, 'project_service', 0, 1, '2023-03-15 19:56:11', '2023-04-02 19:27:34'),
(11, '', NULL, 'provider', 0, 1, '2023-03-15 19:56:11', '2023-04-02 19:27:34'),
(12, '', NULL, 'service', 0, 1, '2023-03-15 19:56:11', '2023-04-02 19:27:34'),
(13, '', NULL, 'service_employee', 0, 1, '2023-03-15 19:56:12', '2023-04-02 19:27:34'),
(14, '', NULL, 'si_alerta', 0, 1, '2023-03-15 19:56:12', '2023-04-02 19:27:34'),
(15, '', NULL, 'si_device', 0, 1, '2023-03-15 19:56:12', '2023-04-02 19:27:34'),
(16, '', NULL, 'si_log', 0, 1, '2023-03-15 19:56:12', '2023-04-02 19:27:34'),
(17, '', NULL, 'si_modulo', 0, 1, '2023-03-15 19:56:12', '2023-04-02 19:27:34'),
(18, '', NULL, 'si_permiso', 0, 1, '2023-03-15 19:56:12', '2023-04-02 19:27:34'),
(19, '', NULL, 'si_rol', 0, 1, '2023-03-15 19:56:12', '2023-04-02 19:27:34'),
(20, '', NULL, 'si_rol_permiso', 0, 1, '2023-03-15 19:56:12', '2023-04-02 19:27:34'),
(21, '', NULL, 'si_sesion', 0, 1, '2023-03-15 19:56:13', '2023-04-02 19:27:34'),
(22, '', NULL, 'si_sesionestado', 0, 1, '2023-03-15 19:56:13', '2023-04-02 19:27:34'),
(23, '', NULL, 'si_user', 0, 1, '2023-03-15 19:56:13', '2023-04-02 19:27:34'),
(24, '', NULL, 'si_user_rol', 0, 1, '2023-03-15 19:56:13', '2023-04-02 19:27:34'),
(25, '', NULL, 'solicitudeprovider', 0, 1, '2023-03-15 19:56:13', '2023-04-02 19:27:34'),
(26, '', NULL, 'solicitudeprovider_product', 0, 1, '2023-03-15 19:56:13', '2023-04-03 05:06:26'),
(27, '', NULL, 'solicitudewarehouse', 0, 1, '2023-03-15 19:56:13', '2023-04-02 19:27:34'),
(28, '', NULL, 'solicitudewarehouse_product', 0, 1, '2023-03-15 19:56:13', '2023-04-03 05:06:26'),
(29, '', NULL, 'validation', 0, 1, '2023-03-15 19:56:14', '2023-04-02 19:27:34'),
(30, '', NULL, 'vehicle', 0, 1, '2023-03-15 19:56:14', '2023-04-02 19:27:34'),
(31, '', NULL, 'warehouse', 0, 1, '2023-03-15 19:56:14', '2023-04-02 19:27:34'),
(32, 'Ref. de Serv.', NULL, 'service_product', 0, 1, '2023-04-07 21:56:15', '2023-04-10 19:09:36'),
(33, 'Reportes', NULL, 'report', 0, 1, '2023-04-12 03:25:05', '2023-04-12 03:25:18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `si_permiso`
--

CREATE TABLE `si_permiso` (
  `idsi_permiso` int(10) UNSIGNED NOT NULL COMMENT '0|',
  `codigo` varchar(15) COLLATE utf8_bin DEFAULT NULL COMMENT '1|Código',
  `descripcion` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '0|Descripción',
  `nombre` varchar(45) COLLATE utf8_bin NOT NULL COMMENT '1|Nombre',
  `si_rol_idsi_rol` int(10) UNSIGNED NOT NULL COMMENT '1|Rol|nombre',
  `si_modulo_idsi_modulo` int(10) UNSIGNED NOT NULL COMMENT '1|Módulo|nombre',
  `acceso` tinyint(1) DEFAULT 0 COMMENT '1|Acceso',
  `readable` tinyint(1) DEFAULT 0 COMMENT '1|Lectura',
  `writeable` tinyint(1) DEFAULT 0 COMMENT '1|Escritura',
  `updateable` tinyint(1) DEFAULT 0 COMMENT '1|Edición',
  `deleteable` tinyint(1) DEFAULT 0 COMMENT '1|Eliminación',
  `read_own` tinyint(1) DEFAULT 0 COMMENT '1|Leer Propios',
  `write_own` tinyint(1) DEFAULT 0 COMMENT '1|Escribir Propios',
  `update_own` tinyint(1) DEFAULT 0 COMMENT '1|Editar Propios',
  `delete_own` tinyint(1) DEFAULT 0 COMMENT '1|Eliminar Propios',
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0|Eliminado',
  `created_by` int(10) NOT NULL COMMENT '0|Creado por',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '0|Fecha de creación',
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '0|Fecha de modificación'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='1|1|Permiso||';

--
-- Volcado de datos para la tabla `si_permiso`
--

INSERT INTO `si_permiso` (`idsi_permiso`, `codigo`, `descripcion`, `nombre`, `si_rol_idsi_rol`, `si_modulo_idsi_modulo`, `acceso`, `readable`, `writeable`, `updateable`, `deleteable`, `read_own`, `write_own`, `update_own`, `delete_own`, `is_deleted`, `created_by`, `created_at`, `modified_at`) VALUES
(58, NULL, NULL, 'x', 3, 5, 1, 1, 1, 1, NULL, NULL, NULL, NULL, NULL, 0, 1, '2023-04-02 19:31:23', '2023-04-02 19:31:23'),
(59, NULL, NULL, 'ACCESO A ALMACEN', 3, 31, 1, 1, 1, 1, 1, NULL, NULL, NULL, NULL, 0, 1, '2023-04-04 02:02:07', '2023-04-04 02:02:07');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `si_rol`
--

CREATE TABLE `si_rol` (
  `idsi_rol` int(10) UNSIGNED NOT NULL COMMENT '0|',
  `codigo` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '1|Código',
  `descripcion` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '0|Descripción',
  `nombre` varchar(45) COLLATE utf8_bin NOT NULL COMMENT '1|Nombre',
  `is_deleted` tinyint(1) DEFAULT 0 COMMENT '0|',
  `created_by` int(10) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT current_timestamp() COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='1|1|Roles||';

--
-- Volcado de datos para la tabla `si_rol`
--

INSERT INTO `si_rol` (`idsi_rol`, `codigo`, `descripcion`, `nombre`, `is_deleted`, `created_by`, `created_at`, `modified_at`) VALUES
(1, '', NULL, 'ADMINISTRADOR', 0, NULL, '2023-03-15 13:56:10', '2023-03-15 13:56:10'),
(2, '1', NULL, 'ADMINISTRADOR', 0, 1, '2023-03-28 14:47:25', '2023-03-28 14:47:25'),
(3, '2', NULL, 'JEFE ALMACEN', 0, 1, '2023-03-28 14:47:35', '2023-03-28 14:47:35'),
(4, 'Jefe de taller', NULL, 'Jefe de taller', 0, 1, '2023-04-04 01:58:06', '2023-04-04 01:58:06'),
(5, 'Supervisor', NULL, 'Supervisor', 0, 1, '2023-04-04 01:58:18', '2023-04-04 01:58:18'),
(6, 'Mecánico', NULL, 'Mecánico', 0, 1, '2023-04-04 01:58:34', '2023-04-04 01:58:34'),
(7, 'Encargado', NULL, 'Encargado', 0, 1, '2023-04-04 02:06:55', '2023-04-04 02:06:55');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `si_rol_permiso`
--

CREATE TABLE `si_rol_permiso` (
  `idsi_rol_permiso` int(10) UNSIGNED NOT NULL COMMENT '0|',
  `codigo` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '1|Código',
  `descripcion` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '0|Descripción',
  `si_rol_idsi_rol` int(10) UNSIGNED NOT NULL COMMENT '1|Rol|nombre',
  `si_permiso_idsi_permiso` int(10) UNSIGNED NOT NULL COMMENT '1|Permiso|nombre',
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0|Eliminado',
  `created_by` int(10) NOT NULL COMMENT '0|Creado por',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '0|Fecha de creación',
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '0|Fecha de modificación'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='1|1|Rol Permiso||';

--
-- Volcado de datos para la tabla `si_rol_permiso`
--

INSERT INTO `si_rol_permiso` (`idsi_rol_permiso`, `codigo`, `descripcion`, `si_rol_idsi_rol`, `si_permiso_idsi_permiso`, `is_deleted`, `created_by`, `created_at`, `modified_at`) VALUES
(1, 'TEST', NULL, 3, 58, 0, 1, '2023-04-02 19:33:40', '2023-04-02 19:33:40');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `si_sesion`
--

CREATE TABLE `si_sesion` (
  `idsi_sesion` int(10) UNSIGNED NOT NULL COMMENT '0|',
  `codigo` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '1|Código',
  `descripcion` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '0|Descripción',
  `tipo` set('APPUSER','ADMINISTRADOR') COLLATE utf8_bin NOT NULL DEFAULT 'APPUSER' COMMENT '1|Tipo',
  `si_user_idsi_user` int(10) UNSIGNED NOT NULL COMMENT '1|Usuario|email',
  `estado` set('CONSESION','SINSESION','CONECTADO','DISPONIBLE','NODISPONIBLE','OCUPADO','DESCONECTADO') COLLATE utf8_bin DEFAULT NULL COMMENT '1|Estado',
  `latitude` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '0|Latitude',
  `longitude` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '0|Longitude',
  `accuracy` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '0|Accuracy',
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0|Eliminado',
  `created_by` int(10) NOT NULL COMMENT '0|Creado por',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '0|Fecha de creación',
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '0|Fecha de modificación'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='1|1|Registro de accesos a la app||';

--
-- Volcado de datos para la tabla `si_sesion`
--

INSERT INTO `si_sesion` (`idsi_sesion`, `codigo`, `descripcion`, `tipo`, `si_user_idsi_user`, `estado`, `latitude`, `longitude`, `accuracy`, `is_deleted`, `created_by`, `created_at`, `modified_at`) VALUES
(57, '', NULL, 'APPUSER', 1, 'CONECTADO', NULL, NULL, NULL, 0, 1, '2023-03-15 14:46:53', '2023-04-12 03:42:45');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `si_sesionestado`
--

CREATE TABLE `si_sesionestado` (
  `idsi_sesionestado` int(10) UNSIGNED NOT NULL COMMENT '0|',
  `si_sesion_idsi_sesion` int(10) UNSIGNED NOT NULL COMMENT '1|Sesion|idsi_sesion',
  `estado` set('CONSESION','SINSESION','CONECTADO','DISPONIBLE','NODISPONIBLE','OCUPADO','DESCONECTADO') DEFAULT NULL COMMENT '1|Estado',
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0|Eliminado',
  `created_by` int(10) NOT NULL COMMENT '0|Creado por',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '0|Fecha de creación',
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '0|Fecha de modificación'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='0|1|Sesión Usuario Estado||';

--
-- Volcado de datos para la tabla `si_sesionestado`
--

INSERT INTO `si_sesionestado` (`idsi_sesionestado`, `si_sesion_idsi_sesion`, `estado`, `is_deleted`, `created_by`, `created_at`, `modified_at`) VALUES
(88, 57, 'CONECTADO', 0, 1, '2023-03-15 14:46:53', '2023-03-15 14:46:53'),
(89, 57, 'CONECTADO', 0, 1, '2023-03-15 14:48:18', '2023-03-15 14:48:18'),
(90, 57, 'CONECTADO', 0, 1, '2023-03-15 15:11:01', '2023-03-15 15:11:01'),
(91, 57, 'CONECTADO', 0, 1, '2023-03-27 23:27:17', '2023-03-27 23:27:17'),
(92, 57, 'CONECTADO', 0, 1, '2023-03-27 23:39:54', '2023-03-27 23:39:54'),
(93, 57, 'CONECTADO', 0, 1, '2023-03-27 23:47:47', '2023-03-27 23:47:47'),
(94, 57, 'DESCONECTADO', 0, 1, '2023-03-28 14:48:16', '2023-03-28 14:48:16'),
(95, 57, 'CONECTADO', 0, 1, '2023-03-28 14:48:28', '2023-03-28 14:48:28'),
(96, 57, 'CONECTADO', 0, 1, '2023-04-02 16:42:15', '2023-04-02 16:42:15'),
(97, 57, 'DESCONECTADO', 0, 1, '2023-04-03 05:07:51', '2023-04-03 05:07:51'),
(98, 57, 'CONECTADO', 0, 1, '2023-04-03 05:09:53', '2023-04-03 05:09:53'),
(99, 57, 'DESCONECTADO', 0, 1, '2023-04-05 03:52:30', '2023-04-05 03:52:30'),
(100, 57, 'CONECTADO', 0, 1, '2023-04-05 03:52:32', '2023-04-05 03:52:32'),
(101, 57, 'DESCONECTADO', 0, 1, '2023-04-05 04:09:10', '2023-04-05 04:09:10'),
(102, 57, 'CONECTADO', 0, 1, '2023-04-05 04:09:12', '2023-04-05 04:09:12'),
(103, 57, 'DESCONECTADO', 0, 1, '2023-04-07 23:50:23', '2023-04-07 23:50:23'),
(104, 57, 'CONECTADO', 0, 1, '2023-04-07 23:50:26', '2023-04-07 23:50:26'),
(105, 57, 'CONECTADO', 0, 1, '2023-04-10 16:38:28', '2023-04-10 16:38:28'),
(106, 57, 'DESCONECTADO', 0, 1, '2023-04-10 17:13:38', '2023-04-10 17:13:38'),
(107, 57, 'CONECTADO', 0, 1, '2023-04-10 17:13:40', '2023-04-10 17:13:40'),
(108, 57, 'DESCONECTADO', 0, 1, '2023-04-10 19:09:41', '2023-04-10 19:09:41'),
(109, 57, 'CONECTADO', 0, 1, '2023-04-10 19:09:43', '2023-04-10 19:09:43'),
(110, 57, 'CONECTADO', 0, 1, '2023-04-12 01:18:55', '2023-04-12 01:18:55'),
(111, 57, 'DESCONECTADO', 0, 1, '2023-04-12 03:25:44', '2023-04-12 03:25:44'),
(112, 57, 'CONECTADO', 0, 1, '2023-04-12 03:25:46', '2023-04-12 03:25:46'),
(113, 57, 'DESCONECTADO', 0, 1, '2023-04-12 03:42:42', '2023-04-12 03:42:42'),
(114, 57, 'CONECTADO', 0, 1, '2023-04-12 03:42:45', '2023-04-12 03:42:45');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `si_user`
--

CREATE TABLE `si_user` (
  `idsi_user` int(10) UNSIGNED NOT NULL COMMENT '0|',
  `nombre` varchar(95) COLLATE utf8_bin NOT NULL COMMENT '1|Nombre',
  `apmat` varchar(45) COLLATE utf8_bin NOT NULL COMMENT '1|Apellido paterno',
  `appat` varchar(45) COLLATE utf8_bin NOT NULL COMMENT '1|Apellido materno',
  `email` varchar(45) COLLATE utf8_bin NOT NULL COMMENT '1|Email para acceso',
  `password` binary(60) NOT NULL COMMENT '1|Password',
  `si_rol_idsi_rol` int(10) UNSIGNED NOT NULL COMMENT '1|Rol|nombre',
  `companyunits_idcompanyunits` int(10) UNSIGNED NOT NULL COMMENT '1|Unidad de negocio|nombre',
  `status` set('NOVALIDADO','ACTIVO','PENDIENTE','SUSPENDIDO') COLLATE utf8_bin NOT NULL DEFAULT 'NOVALIDADO' COMMENT '0|Status',
  `code` varchar(20) COLLATE utf8_bin NOT NULL COMMENT '0|Código verificación',
  `super` tinyint(1) DEFAULT 0 COMMENT '0|',
  `code_at` timestamp NULL DEFAULT current_timestamp() COMMENT '0|Fecha de generación de código',
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0|Eliminado',
  `created_by` int(10) DEFAULT 0 COMMENT '0|Creado por',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '0|Fecha de creación',
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '0|Fecha de modificación'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='1|1|Usuarios de App|si_user_rol.si_user_idsi_user.si_rol_idsi_rol.si_rol.idsi_rol.nombre.Roles|';

--
-- Volcado de datos para la tabla `si_user`
--

INSERT INTO `si_user` (`idsi_user`, `nombre`, `apmat`, `appat`, `email`, `password`, `si_rol_idsi_rol`, `companyunits_idcompanyunits`, `status`, `code`, `super`, `code_at`, `is_deleted`, `created_by`, `created_at`, `modified_at`) VALUES
(1, 'Admin', 'x', 'y', 'admin@sertosa.com', 0x243261243130246362766c3943474b4d525146327a564a4a577945747549676c4f4651384f5056517951436c4c6d344e50314e386e4d4a6175476b47, 2, 1, 'ACTIVO', '', 1, '2022-04-06 02:30:12', 0, 1, '2022-04-06 02:30:12', '2023-04-03 05:09:49');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `si_user_rol`
--

CREATE TABLE `si_user_rol` (
  `idsi_user_rol` int(10) UNSIGNED NOT NULL COMMENT '0|',
  `codigo` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '1|Código',
  `descripcion` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '0|Descripción',
  `si_user_idsi_user` int(10) UNSIGNED NOT NULL COMMENT '1|Usuario|email',
  `si_rol_idsi_rol` int(10) UNSIGNED NOT NULL COMMENT '1|Rol|nombre',
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0|Eliminado',
  `created_by` int(10) NOT NULL COMMENT '0|Creado por',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '0|Fecha de creación',
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '0|Fecha de modificación'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='1|1|Usuario Rol||';

--
-- Volcado de datos para la tabla `si_user_rol`
--

INSERT INTO `si_user_rol` (`idsi_user_rol`, `codigo`, `descripcion`, `si_user_idsi_user`, `si_rol_idsi_rol`, `is_deleted`, `created_by`, `created_at`, `modified_at`) VALUES
(1, '1', NULL, 1, 3, 0, 1, '2023-04-02 19:51:41', '2023-04-02 19:51:41');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudeprovider`
--

CREATE TABLE `solicitudeprovider` (
  `idsolicitudeprovider` int(10) UNSIGNED NOT NULL COMMENT '0|',
  `provider_idprovider` int(10) UNSIGNED NOT NULL COMMENT '1|Proveedor|name',
  `project_service_idproject_service` int(10) UNSIGNED NOT NULL COMMENT '1|Reparación|idproject_service',
  `warehouse_idwarehouse` int(10) UNSIGNED NOT NULL COMMENT '1|Almacen|name',
  `status` set('NUEVA','ABIERTA','CERRADA','EN REVISIÓN','CANCELADA') COLLATE utf8_bin NOT NULL COMMENT '1|Status',
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0|Eliminado',
  `created_by` int(10) UNSIGNED ZEROFILL NOT NULL COMMENT '0|Creado por',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '0|Fecha de creación',
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '0|Fecha de modificación'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='1|1|Solicitud a proveedor||';

--
-- Volcado de datos para la tabla `solicitudeprovider`
--

INSERT INTO `solicitudeprovider` (`idsolicitudeprovider`, `provider_idprovider`, `project_service_idproject_service`, `warehouse_idwarehouse`, `status`, `is_deleted`, `created_by`, `created_at`, `modified_at`) VALUES
(1, 1, 1, 1, 'EN REVISIÓN', 0, 0000000001, '2023-04-02 19:51:53', '2023-04-07 23:08:58'),
(2, 1, 1, 1, 'CERRADA', 0, 0000000001, '2023-04-03 04:45:28', '2023-04-05 04:38:46');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudeprovider_product`
--

CREATE TABLE `solicitudeprovider_product` (
  `idsolicitudeprovider_product` int(10) UNSIGNED NOT NULL COMMENT '0|',
  `solicitudeprovider_idsolicitudeprovider` int(10) UNSIGNED NOT NULL COMMENT '1|Solicitud|idsolicitudeprovider',
  `product_idproduct` int(10) UNSIGNED NOT NULL COMMENT '1|Producto|name',
  `quantity` int(11) NOT NULL COMMENT '1|Cantidad',
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0|Eliminado',
  `created_by` int(10) UNSIGNED ZEROFILL NOT NULL COMMENT '0|Creado por',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '0|Fecha de creación',
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '0|Fecha de modificación'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='1|1|Solicitud proveedor producto||';

--
-- Volcado de datos para la tabla `solicitudeprovider_product`
--

INSERT INTO `solicitudeprovider_product` (`idsolicitudeprovider_product`, `solicitudeprovider_idsolicitudeprovider`, `product_idproduct`, `quantity`, `is_deleted`, `created_by`, `created_at`, `modified_at`) VALUES
(1, 1, 1, 1234, 0, 0000000001, '2023-04-03 05:03:47', '2023-04-03 05:03:47'),
(2, 2, 1, 6789, 0, 0000000001, '2023-04-08 15:12:17', '2023-04-08 15:12:17'),
(3, 2, 4, 333, 0, 0000000001, '2023-04-08 15:12:33', '2023-04-08 15:12:33');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudewarehouse`
--

CREATE TABLE `solicitudewarehouse` (
  `idsolicitudewarehouse` int(10) UNSIGNED NOT NULL COMMENT '0|',
  `project_service_idproject_service` int(10) UNSIGNED NOT NULL COMMENT '1|Reparación|idproject_service',
  `warehouse_idwarehouse` int(10) UNSIGNED NOT NULL COMMENT '1|Almacen|nombre',
  `status` set('NUEVA','ABIERTA','CERRADA','EN REVISIÓN','CANCELADA') COLLATE utf8_bin NOT NULL DEFAULT 'NUEVA' COMMENT '1|Status',
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0|Eliminado',
  `created_by` int(10) UNSIGNED ZEROFILL NOT NULL COMMENT '0|Creado por',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '0|Fecha de creación',
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '0|Fecha de modificación'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='1|1|Solicitud de almacen||';

--
-- Volcado de datos para la tabla `solicitudewarehouse`
--

INSERT INTO `solicitudewarehouse` (`idsolicitudewarehouse`, `project_service_idproject_service`, `warehouse_idwarehouse`, `status`, `is_deleted`, `created_by`, `created_at`, `modified_at`) VALUES
(1, 1, 1, 'CERRADA', 0, 0000000001, '2023-04-02 19:52:02', '2023-04-08 15:08:43'),
(2, 1, 1, 'ABIERTA', 0, 0000000001, '2023-04-03 05:10:15', '2023-04-03 05:10:15'),
(3, 1, 1, 'ABIERTA', 0, 0000000001, '2023-04-03 05:12:47', '2023-04-03 05:12:47'),
(4, 1, 1, 'ABIERTA', 0, 0000000001, '2023-04-04 01:51:56', '2023-04-04 01:51:56'),
(5, 4, 2, 'NUEVA', 0, 0000000001, '2023-04-12 02:45:21', '2023-04-12 02:45:21'),
(6, 4, 1, 'NUEVA', 0, 0000000001, '2023-04-12 02:50:01', '2023-04-12 02:50:01'),
(7, 4, 2, 'NUEVA', 0, 0000000001, '2023-04-12 02:54:39', '2023-04-12 02:54:39');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudewarehouse_product`
--

CREATE TABLE `solicitudewarehouse_product` (
  `idsolicitudewarehouse_product` int(10) UNSIGNED NOT NULL COMMENT '0|',
  `solicitudewarehouse_idsolicitudewarehouse` int(10) UNSIGNED NOT NULL COMMENT '1|Solicitud|idsolicitudewarehouse',
  `product_idproduct` int(10) UNSIGNED NOT NULL COMMENT '1|Producto|name',
  `quantity` int(11) NOT NULL COMMENT '1|Cantidad',
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0|Eliminado',
  `created_by` int(10) UNSIGNED ZEROFILL NOT NULL COMMENT '0|Creado por',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '0|Fecha de creación',
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '0|Fecha de modificación'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='1|1|Solicitud almacen producto||';

--
-- Volcado de datos para la tabla `solicitudewarehouse_product`
--

INSERT INTO `solicitudewarehouse_product` (`idsolicitudewarehouse_product`, `solicitudewarehouse_idsolicitudewarehouse`, `product_idproduct`, `quantity`, `is_deleted`, `created_by`, `created_at`, `modified_at`) VALUES
(1, 1, 1, 453253225, 0, 0000000001, '2023-04-03 05:15:33', '2023-04-03 05:15:33'),
(2, 1, 1, 3, 0, 0000000001, '2023-04-07 21:41:06', '2023-04-07 21:54:59'),
(3, 1, 3, 2, 1, 0000000001, '2023-04-07 21:43:41', '2023-04-07 21:54:54'),
(4, 1, 4, 7, 0, 0000000001, '2023-04-07 21:43:51', '2023-04-07 21:43:51'),
(5, 3, 4, 3, 0, 0000000001, '2023-04-07 21:44:02', '2023-04-07 21:44:02'),
(6, 1, 4, 6, 1, 0000000001, '2023-04-07 21:49:54', '2023-04-07 21:52:04'),
(7, 1, 1, 4, 0, 0000000001, '2023-04-07 22:51:02', '2023-04-07 22:51:02'),
(8, 1, 3, 4, 0, 0000000001, '2023-04-07 22:51:41', '2023-04-07 22:51:41'),
(10, 1, 3, 55, 0, 0000000001, '2023-04-10 17:18:05', '2023-04-10 17:18:05'),
(13, 5, 1, 2, 0, 0000000001, '2023-04-12 02:49:45', '2023-04-12 02:49:45'),
(14, 5, 3, 4, 0, 0000000001, '2023-04-12 02:49:50', '2023-04-12 02:49:50'),
(15, 7, 4, 666, 0, 0000000001, '2023-04-12 02:54:51', '2023-04-12 02:54:51');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `validation`
--

CREATE TABLE `validation` (
  `idvalidation` int(10) UNSIGNED NOT NULL COMMENT '0|',
  `validated` tinyint(4) DEFAULT NULL COMMENT '1|Validado',
  `service_employee_idservice_employee` int(10) UNSIGNED NOT NULL COMMENT '1|Empleado|name',
  `is_deleted` tinyint(1) DEFAULT 0 COMMENT '0|Baja lógica',
  `created_at` timestamp NULL DEFAULT current_timestamp() COMMENT '0|Fecha de creación',
  `created_by` int(11) DEFAULT NULL COMMENT '0|Creado por',
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '0|Fecha de actualización'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='1|1|Servicio validado||';

--
-- Volcado de datos para la tabla `validation`
--

INSERT INTO `validation` (`idvalidation`, `validated`, `service_employee_idservice_employee`, `is_deleted`, `created_at`, `created_by`, `modified_at`) VALUES
(1, 1, 120, 0, '2023-04-02 18:50:35', 1, '2023-04-02 18:50:35'),
(2, 1, 120, 0, '2023-04-09 15:11:47', 1, '2023-04-09 15:11:47');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehicle`
--

CREATE TABLE `vehicle` (
  `idvehicle` int(10) UNSIGNED NOT NULL COMMENT '0|',
  `number` int(4) UNSIGNED ZEROFILL NOT NULL COMMENT '1|Número de unidad',
  `company_idcompany` int(10) UNSIGNED NOT NULL COMMENT '1|Compañia|name',
  `model` varchar(45) COLLATE utf8_bin NOT NULL COMMENT '1|Modelo',
  `type` varchar(45) COLLATE utf8_bin NOT NULL COMMENT '1|Tipo',
  `km` int(11) NOT NULL COMMENT '1|Kilometraje',
  `trade` varchar(45) COLLATE utf8_bin NOT NULL COMMENT '1|Marca',
  `year` int(4) DEFAULT NULL COMMENT '1|Año',
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0|Eliminado',
  `created_by` int(10) UNSIGNED ZEROFILL NOT NULL COMMENT '0|Creado por',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '0|Fecha de creación',
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '0|Fecha de modificación'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='1|1|Vehículo||';

--
-- Volcado de datos para la tabla `vehicle`
--

INSERT INTO `vehicle` (`idvehicle`, `number`, `company_idcompany`, `model`, `type`, `km`, `trade`, `year`, `is_deleted`, `created_by`, `created_at`, `modified_at`) VALUES
(1, 0001, 9, 'RANGER', 'TRACTOCAMIÓN', 2000, 'FORD', 2019, 0, 0000000001, '2023-03-28 14:52:29', '2023-04-07 23:00:08');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `warehouse`
--

CREATE TABLE `warehouse` (
  `idwarehouse` int(10) UNSIGNED NOT NULL COMMENT '0|',
  `company_idcompany` int(10) UNSIGNED NOT NULL COMMENT '1|Compañia',
  `name` varchar(45) COLLATE utf8_bin NOT NULL COMMENT '1|Nombre',
  `status` varchar(45) COLLATE utf8_bin NOT NULL COMMENT '1|Status',
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0|Eliminado',
  `created_by` int(10) UNSIGNED ZEROFILL NOT NULL COMMENT '0|Creado por',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '0|Fecha de creación',
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '0|Fecha de modificación'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='1|1|Almacen||';

--
-- Volcado de datos para la tabla `warehouse`
--

INSERT INTO `warehouse` (`idwarehouse`, `company_idcompany`, `name`, `status`, `is_deleted`, `created_by`, `created_at`, `modified_at`) VALUES
(1, 1, 'ALMACEN PRINCIPAL', 'ACTIVO', 0, 0000000001, '2023-03-27 23:28:11', '2023-04-07 23:39:40'),
(2, 9, 'X', 'X', 0, 0000000001, '2023-03-27 23:28:41', '2023-03-27 23:28:41');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`idcompany`),
  ADD UNIQUE KEY `idcompany_UNIQUE` (`idcompany`),
  ADD KEY `fk_company_companygroup1_idx` (`companygroup_idcompanygroup`);

--
-- Indices de la tabla `companygroup`
--
ALTER TABLE `companygroup`
  ADD PRIMARY KEY (`idcompanygroup`),
  ADD UNIQUE KEY `idcompanygroup_UNIQUE` (`idcompanygroup`);

--
-- Indices de la tabla `companyunits`
--
ALTER TABLE `companyunits`
  ADD PRIMARY KEY (`idcompanyunits`),
  ADD UNIQUE KEY `idcompanyunits_UNIQUE` (`idcompanyunits`),
  ADD KEY `fk_companyunits_company1_idx` (`company_idcompany`);

--
-- Indices de la tabla `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`idemployee`),
  ADD KEY `fk_employee_companyunits1_idx` (`companyunits_idcompanyunits`),
  ADD KEY `fk_employee_si_user1_idx` (`si_user_idsi_user`);

--
-- Indices de la tabla `family`
--
ALTER TABLE `family`
  ADD PRIMARY KEY (`idfamily`),
  ADD UNIQUE KEY `idfamily_UNIQUE` (`idfamily`);

--
-- Indices de la tabla `orderin`
--
ALTER TABLE `orderin`
  ADD PRIMARY KEY (`idorderin`),
  ADD UNIQUE KEY `idorderin_UNIQUE` (`idorderin`),
  ADD KEY `fk_orderin_warehouse1_idx` (`warehouse_idwarehouse`),
  ADD KEY `fk_orderin_product1_idx` (`product_idproduct`);

--
-- Indices de la tabla `orderout`
--
ALTER TABLE `orderout`
  ADD PRIMARY KEY (`idorderout`),
  ADD UNIQUE KEY `idorderin_UNIQUE` (`idorderout`),
  ADD KEY `fk_orderout_warehouse1_idx` (`warehouse_idwarehouse`),
  ADD KEY `fk_orderout_product1_idx` (`product_idproduct`);

--
-- Indices de la tabla `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`idproduct`),
  ADD UNIQUE KEY `idproduct_UNIQUE` (`idproduct`),
  ADD KEY `fk_product_provider1_idx` (`provider_idprovider`),
  ADD KEY `fk_product_family1_idx` (`family_idfamily`);

--
-- Indices de la tabla `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`idproject`),
  ADD UNIQUE KEY `idcampaign_UNIQUE` (`idproject`),
  ADD KEY `fk_campaign_companyunits1_idx` (`companyunits_idcompanyunits`),
  ADD KEY `fk_project_vehicle1_idx` (`vehicle_idvehicle`);

--
-- Indices de la tabla `project_service`
--
ALTER TABLE `project_service`
  ADD PRIMARY KEY (`idproject_service`),
  ADD UNIQUE KEY `idcampaign_survey_UNIQUE` (`idproject_service`),
  ADD KEY `fk_campaign_has_survey_survey1_idx` (`service_idservice`),
  ADD KEY `fk_campaign_has_survey_campaign1_idx` (`project_idproject`);

--
-- Indices de la tabla `provider`
--
ALTER TABLE `provider`
  ADD PRIMARY KEY (`idprovider`),
  ADD UNIQUE KEY `idprovider_UNIQUE` (`idprovider`);

--
-- Indices de la tabla `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`idservice`),
  ADD UNIQUE KEY `idsurvey_UNIQUE` (`idservice`);

--
-- Indices de la tabla `service_employee`
--
ALTER TABLE `service_employee`
  ADD PRIMARY KEY (`idservice_employee`),
  ADD UNIQUE KEY `idsurvey_employe_UNIQUE` (`idservice_employee`),
  ADD KEY `fk_survey_has_employee_employee1_idx` (`employee_idemployee`),
  ADD KEY `fk_survey_employee_campaign_survey1_idx` (`project_service_idproject_service`);

--
-- Indices de la tabla `service_product`
--
ALTER TABLE `service_product`
  ADD PRIMARY KEY (`idservice_product`),
  ADD UNIQUE KEY `idservice_product_UNIQUE` (`idservice_product`),
  ADD KEY `fk_service_has_product_product1_idx` (`product_idproduct`),
  ADD KEY `fk_service_has_product_service1_idx` (`service_idservice`);

--
-- Indices de la tabla `si_alerta`
--
ALTER TABLE `si_alerta`
  ADD PRIMARY KEY (`idsi_alerta`),
  ADD UNIQUE KEY `idsi_alerta_UNIQUE` (`idsi_alerta`),
  ADD KEY `fk_alerta_si_user1_idx` (`si_user_idsi_user`);

--
-- Indices de la tabla `si_device`
--
ALTER TABLE `si_device`
  ADD PRIMARY KEY (`idsi_device`),
  ADD UNIQUE KEY `idsi_device_UNIQUE` (`idsi_device`),
  ADD KEY `fk_device_user1_idx` (`si_user_idsi_user`),
  ADD KEY `fk_device_si_rol1_idx` (`si_rol_idsi_rol`);

--
-- Indices de la tabla `si_log`
--
ALTER TABLE `si_log`
  ADD PRIMARY KEY (`idsi_log`),
  ADD UNIQUE KEY `idsi_log_UNIQUE` (`idsi_log`),
  ADD KEY `fk_Log_Modulo1_idx` (`si_modulo_idsi_modulo`),
  ADD KEY `si_user_log1_idx` (`created_by`);

--
-- Indices de la tabla `si_modulo`
--
ALTER TABLE `si_modulo`
  ADD PRIMARY KEY (`idsi_modulo`),
  ADD UNIQUE KEY `idsi_modulo_UNIQUE` (`idsi_modulo`);

--
-- Indices de la tabla `si_permiso`
--
ALTER TABLE `si_permiso`
  ADD PRIMARY KEY (`idsi_permiso`),
  ADD UNIQUE KEY `idsi_permiso_UNIQUE` (`idsi_permiso`),
  ADD KEY `fk_permiso_modulo1_idx` (`si_modulo_idsi_modulo`),
  ADD KEY `fx_permiso_rol1_idx` (`si_rol_idsi_rol`);

--
-- Indices de la tabla `si_rol`
--
ALTER TABLE `si_rol`
  ADD PRIMARY KEY (`idsi_rol`),
  ADD UNIQUE KEY `idsi_rol_UNIQUE` (`idsi_rol`);

--
-- Indices de la tabla `si_rol_permiso`
--
ALTER TABLE `si_rol_permiso`
  ADD PRIMARY KEY (`idsi_rol_permiso`),
  ADD UNIQUE KEY `idsi_rol_permisos_UNIQUE` (`idsi_rol_permiso`),
  ADD KEY `fk_rol_permiso_permiso1_idx` (`si_permiso_idsi_permiso`),
  ADD KEY `fk_rol_permiso_rol1_idx` (`si_rol_idsi_rol`);

--
-- Indices de la tabla `si_sesion`
--
ALTER TABLE `si_sesion`
  ADD PRIMARY KEY (`idsi_sesion`),
  ADD UNIQUE KEY `idsi_sesion_UNIQUE` (`idsi_sesion`),
  ADD UNIQUE KEY `iduser1_unique` (`si_user_idsi_user`),
  ADD KEY `fk_sesion_user1_idx` (`si_user_idsi_user`);

--
-- Indices de la tabla `si_sesionestado`
--
ALTER TABLE `si_sesionestado`
  ADD PRIMARY KEY (`idsi_sesionestado`),
  ADD UNIQUE KEY `idsi_sesion_UNIQUE` (`idsi_sesionestado`),
  ADD KEY `fk_sesionestado_sesion1_idx` (`si_sesion_idsi_sesion`);

--
-- Indices de la tabla `si_user`
--
ALTER TABLE `si_user`
  ADD PRIMARY KEY (`idsi_user`),
  ADD UNIQUE KEY `idadminuser_UNIQUE` (`idsi_user`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`) USING BTREE,
  ADD KEY `fk_user_company1_idx` (`companyunits_idcompanyunits`) USING BTREE,
  ADD KEY `fk_user_si_rol` (`si_rol_idsi_rol`);

--
-- Indices de la tabla `si_user_rol`
--
ALTER TABLE `si_user_rol`
  ADD PRIMARY KEY (`idsi_user_rol`),
  ADD UNIQUE KEY `idsi_user_rol_UNIQUE` (`idsi_user_rol`),
  ADD KEY `fk_user_rol_rol1_idx` (`si_rol_idsi_rol`),
  ADD KEY `fk_user_rol_user1_idx` (`si_user_idsi_user`);

--
-- Indices de la tabla `solicitudeprovider`
--
ALTER TABLE `solicitudeprovider`
  ADD PRIMARY KEY (`idsolicitudeprovider`),
  ADD UNIQUE KEY `idsolicitudeprovider_UNIQUE` (`idsolicitudeprovider`),
  ADD KEY `fk_solicitudeprovider_provider1_idx` (`provider_idprovider`),
  ADD KEY `fk_solicitudeprovider_project_service1_idx` (`project_service_idproject_service`),
  ADD KEY `warehouse1` (`idsolicitudeprovider`),
  ADD KEY `fk_solicitudeprovider_warehouse11` (`warehouse_idwarehouse`);

--
-- Indices de la tabla `solicitudeprovider_product`
--
ALTER TABLE `solicitudeprovider_product`
  ADD PRIMARY KEY (`idsolicitudeprovider_product`),
  ADD UNIQUE KEY `idsolicitudeprovider_product_UNIQUE` (`idsolicitudeprovider_product`),
  ADD KEY `fk_solicitudeprovider_has_product_product1_idx` (`product_idproduct`),
  ADD KEY `fk_solicitudeprovider_has_product_solicitudeprovider1_idx` (`solicitudeprovider_idsolicitudeprovider`);

--
-- Indices de la tabla `solicitudewarehouse`
--
ALTER TABLE `solicitudewarehouse`
  ADD PRIMARY KEY (`idsolicitudewarehouse`),
  ADD UNIQUE KEY `idsolicitudeprovider_UNIQUE` (`idsolicitudewarehouse`),
  ADD KEY `fk_solicitudeprovider_project_service1_idx` (`project_service_idproject_service`),
  ADD KEY `fk_solicitudewarehouse_warehouse1_idx` (`warehouse_idwarehouse`);

--
-- Indices de la tabla `solicitudewarehouse_product`
--
ALTER TABLE `solicitudewarehouse_product`
  ADD PRIMARY KEY (`idsolicitudewarehouse_product`),
  ADD UNIQUE KEY `idsolicitudewarehouse_product_UNIQUE` (`idsolicitudewarehouse_product`),
  ADD KEY `fk_solicitudewarehouse_has_product_product1_idx` (`product_idproduct`),
  ADD KEY `fk_solicitudewarehouse_has_product_solicitudewarehouse1_idx` (`solicitudewarehouse_idsolicitudewarehouse`);

--
-- Indices de la tabla `validation`
--
ALTER TABLE `validation`
  ADD PRIMARY KEY (`idvalidation`),
  ADD UNIQUE KEY `idvalidation_UNIQUE` (`idvalidation`),
  ADD KEY `fk_service_task_has_service_employee_service_employee1_idx` (`service_employee_idservice_employee`);

--
-- Indices de la tabla `vehicle`
--
ALTER TABLE `vehicle`
  ADD PRIMARY KEY (`idvehicle`),
  ADD UNIQUE KEY `idvehicle_UNIQUE` (`idvehicle`),
  ADD KEY `fk_vehicle_company1_idx` (`company_idcompany`);

--
-- Indices de la tabla `warehouse`
--
ALTER TABLE `warehouse`
  ADD PRIMARY KEY (`idwarehouse`),
  ADD UNIQUE KEY `idwarehouse_UNIQUE` (`idwarehouse`),
  ADD KEY `fk_warehouse_company_idx` (`company_idcompany`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `company`
--
ALTER TABLE `company`
  MODIFY `idcompany` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `companygroup`
--
ALTER TABLE `companygroup`
  MODIFY `idcompanygroup` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `companyunits`
--
ALTER TABLE `companyunits`
  MODIFY `idcompanyunits` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `employee`
--
ALTER TABLE `employee`
  MODIFY `idemployee` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT de la tabla `family`
--
ALTER TABLE `family`
  MODIFY `idfamily` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `orderin`
--
ALTER TABLE `orderin`
  MODIFY `idorderin` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `orderout`
--
ALTER TABLE `orderout`
  MODIFY `idorderout` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `product`
--
ALTER TABLE `product`
  MODIFY `idproduct` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `project`
--
ALTER TABLE `project`
  MODIFY `idproject` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `project_service`
--
ALTER TABLE `project_service`
  MODIFY `idproject_service` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `provider`
--
ALTER TABLE `provider`
  MODIFY `idprovider` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `service`
--
ALTER TABLE `service`
  MODIFY `idservice` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT de la tabla `service_employee`
--
ALTER TABLE `service_employee`
  MODIFY `idservice_employee` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=123;

--
-- AUTO_INCREMENT de la tabla `service_product`
--
ALTER TABLE `service_product`
  MODIFY `idservice_product` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `si_alerta`
--
ALTER TABLE `si_alerta`
  MODIFY `idsi_alerta` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=134;

--
-- AUTO_INCREMENT de la tabla `si_device`
--
ALTER TABLE `si_device`
  MODIFY `idsi_device` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `si_log`
--
ALTER TABLE `si_log`
  MODIFY `idsi_log` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=1044;

--
-- AUTO_INCREMENT de la tabla `si_modulo`
--
ALTER TABLE `si_modulo`
  MODIFY `idsi_modulo` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `si_permiso`
--
ALTER TABLE `si_permiso`
  MODIFY `idsi_permiso` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT de la tabla `si_rol`
--
ALTER TABLE `si_rol`
  MODIFY `idsi_rol` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `si_rol_permiso`
--
ALTER TABLE `si_rol_permiso`
  MODIFY `idsi_rol_permiso` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `si_sesion`
--
ALTER TABLE `si_sesion`
  MODIFY `idsi_sesion` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT de la tabla `si_sesionestado`
--
ALTER TABLE `si_sesionestado`
  MODIFY `idsi_sesionestado` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=115;

--
-- AUTO_INCREMENT de la tabla `si_user`
--
ALTER TABLE `si_user`
  MODIFY `idsi_user` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `si_user_rol`
--
ALTER TABLE `si_user_rol`
  MODIFY `idsi_user_rol` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `solicitudeprovider`
--
ALTER TABLE `solicitudeprovider`
  MODIFY `idsolicitudeprovider` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `solicitudeprovider_product`
--
ALTER TABLE `solicitudeprovider_product`
  MODIFY `idsolicitudeprovider_product` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `solicitudewarehouse`
--
ALTER TABLE `solicitudewarehouse`
  MODIFY `idsolicitudewarehouse` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `solicitudewarehouse_product`
--
ALTER TABLE `solicitudewarehouse_product`
  MODIFY `idsolicitudewarehouse_product` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `validation`
--
ALTER TABLE `validation`
  MODIFY `idvalidation` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `vehicle`
--
ALTER TABLE `vehicle`
  MODIFY `idvehicle` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `warehouse`
--
ALTER TABLE `warehouse`
  MODIFY `idwarehouse` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `company`
--
ALTER TABLE `company`
  ADD CONSTRAINT `fk_company_companygroup1` FOREIGN KEY (`companygroup_idcompanygroup`) REFERENCES `companygroup` (`idcompanygroup`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `companyunits`
--
ALTER TABLE `companyunits`
  ADD CONSTRAINT `fk_companyunits_company1` FOREIGN KEY (`company_idcompany`) REFERENCES `company` (`idcompany`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `fk_employee_companyunits1` FOREIGN KEY (`companyunits_idcompanyunits`) REFERENCES `companyunits` (`idcompanyunits`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_employee_si_user1` FOREIGN KEY (`si_user_idsi_user`) REFERENCES `si_user` (`idsi_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `orderin`
--
ALTER TABLE `orderin`
  ADD CONSTRAINT `fk_orderin_product1` FOREIGN KEY (`product_idproduct`) REFERENCES `product` (`idproduct`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_orderin_warehouse1` FOREIGN KEY (`warehouse_idwarehouse`) REFERENCES `warehouse` (`idwarehouse`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `orderout`
--
ALTER TABLE `orderout`
  ADD CONSTRAINT `fk_orderout_product1` FOREIGN KEY (`product_idproduct`) REFERENCES `product` (`idproduct`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_orderout_warehouse1` FOREIGN KEY (`warehouse_idwarehouse`) REFERENCES `warehouse` (`idwarehouse`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `fk_product_family1` FOREIGN KEY (`family_idfamily`) REFERENCES `family` (`idfamily`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_product_provider1` FOREIGN KEY (`provider_idprovider`) REFERENCES `provider` (`idprovider`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `fk_campaign_companyunits1` FOREIGN KEY (`companyunits_idcompanyunits`) REFERENCES `companyunits` (`idcompanyunits`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_project_vehicle1` FOREIGN KEY (`vehicle_idvehicle`) REFERENCES `vehicle` (`idvehicle`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `project_service`
--
ALTER TABLE `project_service`
  ADD CONSTRAINT `fk_campaign_has_survey_campaign1` FOREIGN KEY (`project_idproject`) REFERENCES `project` (`idproject`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_campaign_has_survey_survey1` FOREIGN KEY (`service_idservice`) REFERENCES `service` (`idservice`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `service_employee`
--
ALTER TABLE `service_employee`
  ADD CONSTRAINT `fk_survey_employee_campaign_survey1` FOREIGN KEY (`project_service_idproject_service`) REFERENCES `project_service` (`idproject_service`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_survey_employee_employee1` FOREIGN KEY (`employee_idemployee`) REFERENCES `employee` (`idemployee`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `service_product`
--
ALTER TABLE `service_product`
  ADD CONSTRAINT `fk_service_has_product_product1` FOREIGN KEY (`product_idproduct`) REFERENCES `product` (`idproduct`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_service_has_product_service1` FOREIGN KEY (`service_idservice`) REFERENCES `service` (`idservice`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `si_alerta`
--
ALTER TABLE `si_alerta`
  ADD CONSTRAINT `si_user` FOREIGN KEY (`si_user_idsi_user`) REFERENCES `si_user` (`idsi_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `si_device`
--
ALTER TABLE `si_device`
  ADD CONSTRAINT `si_rol` FOREIGN KEY (`si_rol_idsi_rol`) REFERENCES `si_rol` (`idsi_rol`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `si_user1` FOREIGN KEY (`si_user_idsi_user`) REFERENCES `si_user` (`idsi_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `si_log`
--
ALTER TABLE `si_log`
  ADD CONSTRAINT `si_log_modulo1` FOREIGN KEY (`si_modulo_idsi_modulo`) REFERENCES `si_modulo` (`idsi_modulo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `si_user_log1` FOREIGN KEY (`created_by`) REFERENCES `si_user` (`idsi_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `si_permiso`
--
ALTER TABLE `si_permiso`
  ADD CONSTRAINT `fk_permiso_modulo1` FOREIGN KEY (`si_modulo_idsi_modulo`) REFERENCES `si_modulo` (`idsi_modulo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fx_permiso_rol1` FOREIGN KEY (`si_rol_idsi_rol`) REFERENCES `si_rol` (`idsi_rol`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `si_rol_permiso`
--
ALTER TABLE `si_rol_permiso`
  ADD CONSTRAINT `fk_rol_permiso_permiso1` FOREIGN KEY (`si_permiso_idsi_permiso`) REFERENCES `si_permiso` (`idsi_permiso`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_rol_permiso_rol1` FOREIGN KEY (`si_rol_idsi_rol`) REFERENCES `si_rol` (`idsi_rol`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `si_sesion`
--
ALTER TABLE `si_sesion`
  ADD CONSTRAINT `fk_sesion_user1` FOREIGN KEY (`si_user_idsi_user`) REFERENCES `si_user` (`idsi_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `si_sesionestado`
--
ALTER TABLE `si_sesionestado`
  ADD CONSTRAINT `si_session1` FOREIGN KEY (`si_sesion_idsi_sesion`) REFERENCES `si_sesion` (`idsi_sesion`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `si_user`
--
ALTER TABLE `si_user`
  ADD CONSTRAINT `fk_user_companyunits` FOREIGN KEY (`companyunits_idcompanyunits`) REFERENCES `companyunits` (`idcompanyunits`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_user_si_rol` FOREIGN KEY (`si_rol_idsi_rol`) REFERENCES `si_rol` (`idsi_rol`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `si_user_rol`
--
ALTER TABLE `si_user_rol`
  ADD CONSTRAINT `si_rol_user1` FOREIGN KEY (`si_rol_idsi_rol`) REFERENCES `si_rol` (`idsi_rol`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `si_user_rol1` FOREIGN KEY (`si_user_idsi_user`) REFERENCES `si_user` (`idsi_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `solicitudeprovider`
--
ALTER TABLE `solicitudeprovider`
  ADD CONSTRAINT `fk_solicitudeprovider_project_service1` FOREIGN KEY (`project_service_idproject_service`) REFERENCES `project_service` (`idproject_service`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_solicitudeprovider_provider1` FOREIGN KEY (`provider_idprovider`) REFERENCES `provider` (`idprovider`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_solicitudeprovider_warehouse11` FOREIGN KEY (`warehouse_idwarehouse`) REFERENCES `warehouse` (`idwarehouse`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `solicitudeprovider_product`
--
ALTER TABLE `solicitudeprovider_product`
  ADD CONSTRAINT `fk_solicitudeprovider_has_product_product1` FOREIGN KEY (`product_idproduct`) REFERENCES `product` (`idproduct`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_solicitudeprovider_has_product_solicitudeprovider1` FOREIGN KEY (`solicitudeprovider_idsolicitudeprovider`) REFERENCES `solicitudeprovider` (`idsolicitudeprovider`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `solicitudewarehouse`
--
ALTER TABLE `solicitudewarehouse`
  ADD CONSTRAINT `fk_solicitudeprovider_project_service10` FOREIGN KEY (`project_service_idproject_service`) REFERENCES `project_service` (`idproject_service`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_solicitudewarehouse_warehouse1` FOREIGN KEY (`warehouse_idwarehouse`) REFERENCES `warehouse` (`idwarehouse`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `solicitudewarehouse_product`
--
ALTER TABLE `solicitudewarehouse_product`
  ADD CONSTRAINT `fk_solicitudewarehouse_has_product_product1` FOREIGN KEY (`product_idproduct`) REFERENCES `product` (`idproduct`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_solicitudewarehouse_has_product_solicitudewarehouse1` FOREIGN KEY (`solicitudewarehouse_idsolicitudewarehouse`) REFERENCES `solicitudewarehouse` (`idsolicitudewarehouse`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `validation`
--
ALTER TABLE `validation`
  ADD CONSTRAINT `fk_service_task_has_service_employee_service_employee1` FOREIGN KEY (`service_employee_idservice_employee`) REFERENCES `service_employee` (`idservice_employee`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `vehicle`
--
ALTER TABLE `vehicle`
  ADD CONSTRAINT `fk_vehicle_company1` FOREIGN KEY (`company_idcompany`) REFERENCES `company` (`idcompany`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `warehouse`
--
ALTER TABLE `warehouse`
  ADD CONSTRAINT `fk_warehouse_company` FOREIGN KEY (`company_idcompany`) REFERENCES `company` (`idcompany`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
