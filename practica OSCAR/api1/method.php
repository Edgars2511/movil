<?php
require "config/Conexion.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PATCH");
header("Access-Control-Allow-Headers: Content-Type");

$raw_data = file_get_contents("php://input");
$datos = json_decode($raw_data, true);
  //print_r($_SERVER['REQUEST_METHOD']);
  switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        // Consulta SQL para seleccionar datos de la tabla
        if (isset($_GET['id_rut'])) {
            $id_rut = $_GET['id_rut'];
            $sql = "SELECT * FROM rutinas WHERE id_rut = $id_rut";
        }
        else {
            $sql = "SELECT * FROM rutinas";
        }
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


    case 'POST':
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Recibir los datos del formulario HTML
            $nombre_rutina = $datos['nombre_rutina'];
            $progreso = $datos['progreso'];
            $objetivos = $datos['objetivos'];
        
        
            // Insertar los datos en la tabla
            $sql = "INSERT INTO rutinas (nombre_rutina, progreso, objetivos) VALUES ('$nombre_rutina', '$progreso', '$objetivos')"; // Reemplaza con el nombre de tu tabla
        
            if ($conexion->query($sql) === TRUE) {
                echo "Datos insertados con éxito.";
            } else {
                echo $sql;
                echo "Error al insertar datos: " . $conexion->error;
            }

        } else {
            echo "Esta API solo admite solicitudes POST.";
        }
        
        $conexion->close();
    break;
    
    case 'PATCH':
        if ($_SERVER['REQUEST_METHOD'] === 'PATCH') {
           
        
            $id_rut = $datos['id_rut'];
            $nombre_rutina = $datos['nombre_rutina'];
            $progreso = $datos['progreso'];
            $objetivos = $datos['objetivos'];
        
            if ($_SERVER['REQUEST_METHOD'] === 'PATCH') { // Método PATCH
                $actualizaciones = array();
                if (!empty($nombre_rutina)) {
                    $actualizaciones[] = "nombre_rutina = '$nombre_rutina'";
                }
                if (!empty($progreso)) {
                    $actualizaciones[] = "progreso = '$progreso'";
                }
                if (!empty($objetivos)) {
                    $actualizaciones[] = "objetivos = '$objetivos'";
                }
        
                $actualizaciones_str = implode(', ', $actualizaciones);
                $sql = "UPDATE rutinas SET $actualizaciones_str WHERE id_rut = $id_rut";
            }
        
            if ($conexion->query($sql) === TRUE) {
                echo "Registro actualizado con éxito.";
            } else {
                echo "Error al actualizar registro: " . $conexion->error;
            }
        } else {
            echo "Método de solicitud no válido.";
        }
      
        $conexion->close();
    break;

    case 'PUT':
        

        $id_rut = $datos['id_rut'];
        $nombre_rutina = $datos['nombre_rutina'];
        $progreso = $datos['progreso'];
        $objetivos = $datos['objetivos'];

        if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
            $sql = "UPDATE rutinas SET nombre_rutina = ?, progreso = ?, objetivos = ? WHERE id = ?";
        } else { // Método PATCH
            $actualizaciones = array();
            if (!empty($nombre_rutina)) {
                $actualizaciones[] = "nombre_rutina = ?";
            }
            if (!empty($progreso)) {
                $actualizaciones[] = "progreso = ?";
            }
            if (!empty($objetivos)) {
                $actualizaciones[] = "objetivos = ?";
            }

            $actualizaciones_str = implode(', ', $actualizaciones);
            $sql = "UPDATE rutinas SET $actualizaciones_str WHERE id_rut = ?";
        }

        $stmt = $conexion->prepare($sql);
        if ($stmt) {
            if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
                $stmt->bind_param('ssi', $titulo, $cuerpo, $id);
            } else { // Método PATCH
                $stmt_params = array($id);
                foreach ($actualizaciones as $param) {
                    $stmt_params[] = $$param;
                }
                $stmt->bind_param(str_repeat('s', count($actualizaciones) + 1), ...$stmt_params);
            }

            if ($stmt->execute()) {
                echo "Registro actualizado con éxito.";
            } else {
                echo "Error al actualizar registro: " . $stmt->error;
            }

            $stmt->close();
        } else {
            echo "Error de preparación de la consulta: " . $conexion->error;
        }
        $conexion->close();

    break;
  
      
    case 'DELETE':
      if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        // Procesar solicitud DELETE
        $id_rut = $_GET['id_rut'];
        //$id_rut = $datos['id_rut'];
        $sql = "DELETE FROM rutinas WHERE id_rut = $id_rut";
    
        if ($conexion->query($sql) === TRUE) {
            echo "Registro eliminado con éxito.";
        } else {
            echo "Error al eliminar registro: " . $conexion->error;
        }
    } else {
        echo "Método de solicitud no válido.";
    }
    $conexion->close();
      break;


     default:
       echo 'undefined request type!';
  }
?>