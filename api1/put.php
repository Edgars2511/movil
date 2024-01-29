<!DOCTYPE html>
<html>
<head>
    <title>Actualizar Registro</title>
</head>
<body>
    <h1>Actualizar Registro</h1>
    
    <form id="updateForm">
        <label for="id_mae">ID del Registro a Actualizar:</label>
        <input type="text" id="id_mae" name="id_mae" required><br>

        <label for="tituloEdit">Nuevo Titulo:</label>
        <input type="text" id="tituloEdit" name="tituloEdit"><br>

        <label for="cuerpoEdit">Nuevo Cuerpo:</label>
        <input type="text" id="cuerpoEdit" name="cuerpoEdit"><br>


        <button type="button" id="putButton">Actualizar con PUT</button>
        <button type="button" id="patchButton">Actualizar con PATCH</button>
    </form>

    <div id="response"></div>

    <script>
        document.getElementById('putButton').addEventListener('click', function () {
            actualizarRegistro('PUT');
        });

        document.getElementById('patchButton').addEventListener('click', function () {
            actualizarRegistro('PATCH');
        });

        function actualizarRegistro(metodo) {
            var id_mae = document.getElementById('id_mae').value;
            var titulo = document.getElementById('tituloEdit').value;
            var cuerpo = document.getElementById('cuerpoEdit').value;

            var data = new URLSearchParams();
            data.append('id_mae', id_mae);
            data.append('titulo', titulo);
            data.append('cuerpo', cuerpo);

            fetch('method.php', {
                method: metodo,
                body: data
            })
            .then(function(response) {
                return response.text();
            })
            .then(function(data) {
                document.getElementById('response').textContent = data;
            })
            .catch(function(error) {
                console.error('Error:', error);
            });
        }
    </script>
</body>
</html>
