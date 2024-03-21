<?php
require "config/Conexion.php";

        // Habilitar CORS para cualquier origen
        header("Access-Control-Allow-Origin: *");

        // Permitir métodos HTTP específicos
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE, HEAD, TRACE, PATCH");

        // Permitir encabezados personalizados
        header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

        // Permitir credenciales
        header("Access-Control-Allow-Credentials: true");

  switch($_SERVER['REQUEST_METHOD']) {
 
    //este es un get, trae datos
    case 'GET':
        // Consulta SQL para seleccionar datos de la tabla
        $sql = "SELECT id_usuario, nombre, correo_electronico, rol, estado_cuenta, telefono, direccion, ciudad, estado_provincia, pais, codigo_postal, fecha_creacion, ultimo_acceso FROM usuarios";

        $query = $conexion->query($sql);

        if ($query->num_rows > 0) {
            $data = array();
            while ($row = $query->fetch_assoc()) {
                $data[] = $row;
            }
            // Devolver los resultados en formato JSON
            header('Content-Type: application/json');
            echo json_encode($data);
        } else {
            echo "No se encontraron registros en la tabla.";
        }

        $conexion->close();
    break;

        //este es un post, crea registros nuevos
    case 'POST':
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Leer el cuerpo JSON de la solicitud
            $json_data = file_get_contents('php://input');
            
            // Decodificar el JSON en un arreglo asociativo
            $data = json_decode($json_data, true);
            
            // Verificar si se pudo decodificar el JSON correctamente
            if ($data !== null) {
                // Obtener los valores del arreglo asociativo
                $nombre = $data['nombre'];
                $correo_electronico = $data['correo_electronico'];
                $contrasena = $data['contrasena'];
                $rol = $data['rol'];
                $telefono = $data['telefono'];
                $direccion = $data['direccion'];
                $ciudad = $data['ciudad'];
                $estado_provincia = $data['estado_provincia'];
                $pais = $data['pais'];
                $codigo_postal = $data['codigo_postal'];
                
                // Insertar los datos en la tabla
                $sql = "INSERT INTO usuarios (nombre, correo_electronico, contrasena, rol, telefono, direccion, ciudad, estado_provincia, pais, codigo_postal) VALUES ('$nombre', '$correo_electronico', '$contrasena', '$rol', '$telefono', '$direccion', '$ciudad', '$estado_provincia', '$pais', '$codigo_postal')";
                
                // Ejecutar la consulta SQL
                if ($conexion->query($sql) === TRUE) {
                    echo "Datos insertados con éxito.";
                } else {
                    echo "Error al insertar datos: " . $conexion->error;
                }
            } else {
                echo "Error al decodificar el JSON.";
            }
        } 
        
        // Cerrar la conexión a la base de datos
        $conexion->close();        
    break;

        //este es un put
    case 'PUT':
                // Decodificar el JSON enviado en el cuerpo de la solicitud
            $data = json_decode(file_get_contents("php://input"), true);

            // Verificar si se proporcionó un ID de usuario en el cuerpo de la solicitud
            if (!isset($data['id_usuario'])) {
                header("HTTP/1.1 400 Bad Request");
                echo json_encode(array("message" => "ID de usuario no proporcionado en el cuerpo de la solicitud"));
                exit();
            }

            // Obtener el ID del usuario
            $id_usuario = $data['id_usuario'];

            // Actualizar los datos en la base de datos
            $nombre = $data['nombre'];
            $correo_electronico = $data['correo_electronico'];
            $rol = $data['rol'];
            $telefono = $data['telefono'];
            $direccion = $data['direccion'];
            $ciudad = $data['ciudad'];
            $estado_provincia = $data['estado_provincia'];
            $pais = $data['pais'];
            $codigo_postal = $data['codigo_postal'];

            $sql = "UPDATE usuarios SET nombre='$nombre', correo_electronico='$correo_electronico', rol='$rol', telefono='$telefono', direccion='$direccion', ciudad='$ciudad', estado_provincia='$estado_provincia', pais='$pais', codigo_postal='$codigo_postal' WHERE id_usuario=$id_usuario";

            if ($conexion->query($sql) === TRUE) {
                // Devolver mensaje de éxito
                header("HTTP/1.1 200 OK");
                echo json_encode(array("message" => "Usuario actualizado correctamente"));
            } else {
                header("HTTP/1.1 500 Internal Server Error");
                echo json_encode(array("message" => "¡Upss eso no salió cómo esperábamos!: " . $conexion->error));
            }
    break;

            //Este es un patch, actualiza parcialmente el set de datos
    case 'PATCH':
        if ($_SERVER['REQUEST_METHOD'] === 'PATCH') {
            parse_str(file_get_contents("php://input"), $datos);
        
            $id_usuario = $datos['id_usuario'];
        
            // Método PATCH
            $actualizaciones = array();
            if (!empty($datos['nombre'])) {
                $actualizaciones[] = "nombre = '{$datos['nombre']}'";
            }
            if (!empty($datos['correo_electronico'])) {
                $actualizaciones[] = "correo_electronico = '{$datos['correo_electronico']}'";
            }
            if (!empty($datos['rol'])) {
                $actualizaciones[] = "rol = '{$datos['rol']}'";
            }
            if (!empty($datos['telefono'])) {
                $actualizaciones[] = "telefono = '{$datos['telefono']}'";
            }
            if (!empty($datos['direccion'])) {
                $actualizaciones[] = "direccion = '{$datos['direccion']}'";
            }
            if (!empty($datos['ciudad'])) {
                $actualizaciones[] = "ciudad = '{$datos['ciudad']}'";
            }
            if (!empty($datos['estado_provincia'])) {
                $actualizaciones[] = "estado_provincia = '{$datos['estado_provincia']}'";
            }
            if (!empty($datos['pais'])) {
                $actualizaciones[] = "pais = '{$datos['pais']}'";
            }
            if (!empty($datos['codigo_postal'])) {
                $actualizaciones[] = "codigo_postal = '{$datos['codigo_postal']}'";
            }
        
            $actualizaciones_str = implode(', ', $actualizaciones);
            $sql = "UPDATE usuarios SET $actualizaciones_str WHERE id_usuario = $id_usuario";
        
            if ($conexion->query($sql) === TRUE) {
                echo "Registro actualizado con éxito.";
            } else {
                echo "¡Upss eso no salió cómo esperábamos!: " . $conexion->error;
            }
        } 
        
        $conexion->close();        
    break;
    
    case 'DELETE':
        if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
            // Procesar solicitud DELETE
            $id_usuario = $_GET['id_usuario'];
            $sql = "DELETE FROM usuarios WHERE id_usuario = $id_usuario";
            if ($conexion->query($sql) === TRUE) {
                echo "Registro eliminado con éxito.";
            } else {
                echo "¡Upss eso no salió cómo esperábamos!: " . $conexion->error;
            }
        } 
        $conexion->close();        
    break;
    
            //options habilita a los desarrolladores obtener info del api y activa el cors
    case 'OPTIONS':
        // Habilitar CORS para cualquier origen
        header("Access-Control-Allow-Origin: *");

        // Permitir métodos HTTP específicos
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE, HEAD, TRACE, PATCH");

        // Permitir encabezados personalizados
        header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

        // Permitir credenciales
        header("Access-Control-Allow-Credentials: true");

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            // Responder a la solicitud OPTIONS sin procesar nada más
            http_response_code(200);
            exit;
        }
    break;

    case 'HEAD':
        if ($_SERVER['REQUEST_METHOD'] === 'HEAD') {
            // Establecer encabezados de respuesta
            header('Content-Type: application/json');
            header('Custom-Header: PHP 8, HTML ');

            // Puedes establecer otros encabezados necesarios aquí

            // No es necesario enviar un cuerpo en una solicitud HEAD, por lo que no se imprime nada aquí.
        } else {
            http_response_code(405); // Método no permitido
            echo 'Método de solicitud no válido';
        }
    break;



    

}
?>