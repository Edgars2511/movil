-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-03-2024 a las 01:29:58
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `moviles1`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notas`
--

CREATE TABLE `notas` (
  `id` int(10) NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `cuerpo` varchar(5000) NOT NULL,
  `fecha` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `notas`
--

INSERT INTO `notas` (`id`, `titulo`, `cuerpo`, `fecha`) VALUES
(1, 'Lorem ipsum (ELIMINAR)', 'Lorem ipsum dolor sit amet.', '0000-00-00'),
(20, 'Lorem ipsum 1', 'Lorem ipsum dolor sit amet.', '2024-02-24'),
(21, 'Lorem ipsum 2', 'Lorem ipsum dolor sit amet.', '2024-02-24'),
(24, 'hola', 'bebe', '2024-03-02'),
(25, 'hola', 'bella', '2024-03-02'),
(26, 'hola', 'preciosa', '2024-03-02'),
(27, 'hola', 'me llamo annie', '2024-03-02'),
(28, 'hola', 'me llamo anie 2', '2024-03-02'),
(29, 'hola', 'preciosa', '2024-03-02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tasks`
--

CREATE TABLE `tasks` (
  `id` int(10) NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `fecha` date NOT NULL DEFAULT current_timestamp(),
  `estado` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tasks`
--

INSERT INTO `tasks` (`id`, `titulo`, `fecha`, `estado`) VALUES
(1, 'Hola', '0000-00-00', 0),
(2, 'Pausa vv', '2024-03-03', 0),
(3, 'holavv', '2024-03-18', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `token`
--

CREATE TABLE `token` (
  `id_token` int(11) NOT NULL,
  `correo_electronico` varchar(255) COLLATE utf32_bin NOT NULL,
  `token` varchar(255) COLLATE utf32_bin NOT NULL,
  `estatus` enum('abierta','cerrada') COLLATE utf32_bin NOT NULL DEFAULT 'cerrada',
  `fecha_creacion` date DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

--
-- Volcado de datos para la tabla `token`
--

INSERT INTO `token` (`id_token`, `correo_electronico`, `token`, `estatus`, `fecha_creacion`) VALUES
(1, 'juan@example.com', '46312645259dff9712c79ad5d1cc35e3', 'cerrada', '2024-03-07'),
(3, 'juan@example.com', '88bf090657e091551531c8a76e161de4', 'cerrada', '2024-03-07'),
(4, 'maria@example.com', '70aaf519194bc7dd2be609ae12b3c128', 'cerrada', '2024-03-07');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(255) COLLATE utf32_bin NOT NULL,
  `nombre_usuario` varchar(100) COLLATE utf32_bin NOT NULL,
  `correo_electronico` varchar(255) COLLATE utf32_bin NOT NULL,
  `contrasena` varchar(255) COLLATE utf32_bin NOT NULL,
  `rol` varchar(50) COLLATE utf32_bin NOT NULL,
  `estado_cuenta` enum('activo','inactivo','suspendido') COLLATE utf32_bin NOT NULL DEFAULT 'activo',
  `fecha_creacion` date DEFAULT curdate(),
  `ultimo_acceso` date DEFAULT NULL,
  `telefono` varchar(20) COLLATE utf32_bin DEFAULT NULL,
  `direccion` varchar(255) COLLATE utf32_bin DEFAULT NULL,
  `ciudad` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  `estado_provincia` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  `pais` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  `codigo_postal` varchar(20) COLLATE utf32_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `nombre_usuario`, `correo_electronico`, `contrasena`, `rol`, `estado_cuenta`, `fecha_creacion`, `ultimo_acceso`, `telefono`, `direccion`, `ciudad`, `estado_provincia`, `pais`, `codigo_postal`) VALUES
(1, 'Juan Perez', '', 'juan@example.com', 'contraseña1', 'usuario', 'activo', '2024-03-06', '2024-03-07', '123456789', 'Calle Principal 123', 'Ciudad de México', 'CDMX', 'México', '12345'),
(2, 'María Lopez', '', 'maria@example.com', 'contraseña2', 'usuario', 'activo', '2024-03-06', '2024-03-07', '987654321', 'Avenida Principal 456', 'Guadalajara', 'Jalisco', 'México', '54321'),
(3, 'Pedro Ramirez', '', 'pedro@example.com', 'contraseña3', 'administrador', 'activo', '2024-03-06', '2024-03-06', '456789123', 'Boulevard Principal 789', 'Monterrey', 'Nuevo León', 'México', '67890'),
(4, 'Ana Martínez', '', 'ana@example.com', 'contraseña4', 'usuario', 'activo', '2024-03-06', '2024-03-06', '789123456', 'Avenida Reforma 101', 'Puebla', 'Puebla', 'México', '10101'),
(5, 'Carlos Sánchez', '', 'carlos@example.com', 'contraseña5', 'usuario', 'activo', '2024-03-06', '2024-03-06', '321654987', 'Calle Independencia 555', 'Tijuana', 'Baja California', 'México', '55555');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `notas`
--
ALTER TABLE `notas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`id_token`),
  ADD KEY `correo_electronico` (`correo_electronico`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `correo_electronico_UNIQUE` (`correo_electronico`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `notas`
--
ALTER TABLE `notas`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `token`
--
ALTER TABLE `token`
  MODIFY `id_token` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `token`
--
ALTER TABLE `token`
  ADD CONSTRAINT `token_ibfk_1` FOREIGN KEY (`correo_electronico`) REFERENCES `usuarios` (`correo_electronico`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
