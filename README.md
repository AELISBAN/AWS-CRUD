# AWS Lambda CRUD MySQL
Ejecución de las pruebas:
crear y desplegar un API CRUD utilizando AWS Lambda, API Gateway y MySQL con las funciones de  POST, GET, PUT, DELETE





``` import mysql from 'mysql';

const con = mysql.createConnection({
  host: 'dbaws.cby2o2230ms.amazonaws.com',
  user: 'adm',
  port:"3308",
  password: '12',
  database: 'bd_Producto',
});

export const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const query = (sql, values) => new Promise((resolve, reject) => {
    con.query(sql, values, (err, res) => {
      if (err) {
        return reject(err);
      }
      resolve(res);
    });
  });

  try {

    switch (event.httpMethod) {
      case 'POST': {
        const { estado } = JSON.parse(event.body);
        const sql = "INSERT INTO tb_estado (estado) VALUES (?)";
        await query(sql, [estado]);
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Se registró el valor.' }),
        };
      }

      case 'GET': {
        const sql = "SELECT * FROM tb_estado";
        const results = await query(sql);
        return {
          statusCode: 200,
          body: JSON.stringify(results),
        };
      }

      case 'PUT': {
        const { id_estado, estado } = JSON.parse(event.body);
        const sql = "UPDATE tb_estado SET estado = ? WHERE id_estado = ?";
        await query(sql, [estado, id_estado]);
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Se actualizó el valor.' }),
        };
      }

      case 'DELETE': {
        const id_estado = event.queryStringParameters?.id_estado;
        if (!id_estado) {
          return {
            statusCode: 400,
            body: JSON.stringify({ message: "El ID del estado es requerido." }),
          };
        }
        const sql = "DELETE FROM tb_estado WHERE id_estado = ?";
        await query(sql, [id_estado]);
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Se eliminó el valor.' }),
        };
      }

      default: {
        return {
          statusCode: 405,
          body: JSON.stringify({ message: 'Método no permitido.' }),
        };
      }
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error: ' + err.message }),
    };
  }
}; 

```
# PRUEBAS CON  POSTMAN: POST, GET, PUT y DELETE
## Método GET

**URL:**  
`https://y4

**Ejemplo de respuesta:**
```json
[
    {
        "id_estado": 1,
        "estado": "activo"
        
    }
]
```
![image](https://github.com/user-attachments/assets/6790c4dd-d10a-4dec-95e3-67b69d30e1cc)
# Method POST

**Cuerpo de la solicitud:**

```json
{
    
    "estado" : "activo"
    

}
```
**Ejemplo de respuesta:**

```json
{
    "message": "Se registró el valor"
}
```
![image](https://github.com/user-attachments/assets/a475f779-4a2f-45a8-be12-3bdae84d84e3)
# Method PUT

**Cuerpo de la solicitud:**

```json
{
    "id_estado" : 3,
    "estado" : "activo"
    

}
```

**Ejemplo de respuesta:**

```json
{
    "message": "Se actualizó el valor"
    
}
```
![image](https://github.com/user-attachments/assets/9559bc8b-2e4d-4baf-96b9-cb79c3776b19)
# Method DELETE

**Cuerpo de la solicitud:**

```json
{
    "id" : 2
}
```

**Ejemplo de respuesta:**

```json
{
    "message": "se elimino el valor"
    
}
```
![image](https://github.com/user-attachments/assets/9e1fc6ec-295b-466c-a614-1e41e3f8f9f2)




# MYSQL
![image](https://github.com/user-attachments/assets/172938b4-303e-429f-9420-20c24c6435c4)

# CREACIÓN DE LOS METODOS
![image](https://github.com/user-attachments/assets/16490cd4-48bd-4dfe-a433-af94c15e4a7d)



