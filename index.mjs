import mysql from 'mysql';

const con = mysql.createConnection({
  host: 'dbaws.cby22o20mozn6.us-east-223.rds.amazonaws.com',
  user: 'admi1n',
  port:"3306",
  password: '123456789',
  database: 'bd_producto',
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
