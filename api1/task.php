<?php
require "config/Conexion.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

$raw_data = file_get_contents("php://input");
$datos = json_decode($raw_data, true);
  //print_r($_SERVER['REQUEST_METHOD']);
  switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        // Consulta SQL para seleccionar datos de la tabla
        $sql = "SELECT * FROM tasks";

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
            $titulo = $datos['titulo'];
        
        
        
            // Insertar los datos en la tabla
            $sql = "INSERT INTO tasks (titulo) VALUES ('$titulo')"; // Reemplaza con el nombre de tu tabla
        
            if ($conexion->query($sql) === TRUE) {
                echo "Datos insertados con éxito.";
            } else {
                echo "Error al insertar datos: " . $conexion->error;
            }

        } else {
            echo "Esta API solo admite solicitudes POST.";
        }
        
        $conexion->close();
    break;
    
    case 'PATCH':
        if ($_SERVER['REQUEST_METHOD'] === 'PATCH') {
           
        
            $id = $datos['id'];
            $titulo = $datos['titulo'];
            $cuerpo = $datos['cuerpo'];
        
            if ($_SERVER['REQUEST_METHOD'] === 'PATCH') { // Método PATCH
                $actualizaciones = array();
                if (!empty($titulo)) {
                    $actualizaciones[] = "titulo = '$titulo'";
                }
                if (!empty($cuerpo)) {
                    $actualizaciones[] = "cuerpo = '$cuerpo'";
                }
        
                $actualizaciones_str = implode(', ', $actualizaciones);
                $sql = "UPDATE notas SET $actualizaciones_str WHERE id = $id";
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
        

        $id = $datos['id'];
        $titulo = $datos['titulo'];
        $cuerpo = $datos['cuerpo'];

        if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
            $sql = "UPDATE notas SET titulo = ?, cuerpo = ? WHERE id = ?";
        } else { // Método PATCH
            $actualizaciones = array();
            if (!empty($titulo)) {
                $actualizaciones[] = "titulo = ?";
            }
            if (!empty($cuerpo)) {
                $actualizaciones[] = "cuerpo = ?";
            }

            $actualizaciones_str = implode(', ', $actualizaciones);
            $sql = "UPDATE notas SET $actualizaciones_str WHERE id = ?";
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
        $id = $_GET['id'];
        $sql = "DELETE FROM tasks WHERE id = $id";
    
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