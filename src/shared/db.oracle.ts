import oracledb from 'oracledb';
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const dbConfig: oracledb.ConnectionAttributes = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  connectString: process.env.CONNECTSTRING,
};

async function executeQuery(sql: string, params: any[] = []): Promise<any> {
  let connection: oracledb.Connection | null = null;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(sql, params, { autoCommit: true });

    return result.rows;
  } catch (error) {
    throw error;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error('Error al cerrar la conexión:', error);
      }
    }
  }
}

async function insertRecord(table: string, data: any): Promise<any> {
  let connection: oracledb.Connection | null = null;
  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(`ALTER SESSION SET NLS_DATE_FORMAT = 'YYYY-MM-DD'`, []);

    let sql = `INSERT INTO ${table} `;
    const columns = Object.keys(data).join(', ');
    const values = Object.values(data).map((v) => typeof v === 'string' ? `'${v}'` : v).join(', ');
    sql += `(${columns}) VALUES (${values})`;

    const result = await connection.execute(sql, [], { autoCommit: true });

    return result;
  } catch (error) {
    throw error;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error('Error al cerrar la conexión:', error);
      }
    }
  }
}

async function updateRecord(table: string, primaryKeyName: string, primaryKeyValue: any, data: any): Promise<any> {
  let connection: oracledb.Connection | null = null;
  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(`ALTER SESSION SET NLS_DATE_FORMAT = 'YYYY-MM-DD'`, []);

    let sql = `UPDATE ${table} SET `;
    const columns = Object.keys(data);
    const values = Object.values(data).map((v, i) => 
      typeof v === 'string' ? `${columns[i]} = '${v}'` : `${columns[i]} = ${v}`)
    .join(',');
    sql += `${values} WHERE ${primaryKeyName} = '${primaryKeyValue}'`;

    const result = await connection.execute(sql, [], { autoCommit: true });

    return result;
  } catch (error) {
    throw error;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error('Error al cerrar la conexión:', error);
      }
    }
  }
}

async function deleteRecord(table: string, primaryKeyName: string, primaryKeyValue: string): Promise<any> {
  let connection: oracledb.Connection | null = null;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const sql = `DELETE
      FROM ${table}
      WHERE ${primaryKeyName} = '${primaryKeyValue}'`;

    const result = await connection.execute(sql, [], { autoCommit: true });

    return result;
  } catch (error) {
    throw error;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error('Error al cerrar la conexión:', error);
      }
    }
  }
}

async function first(sql: string, params: any[] = []): Promise<any> {
  let connection: oracledb.Connection | null = null;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(sql, params);

    return (result.rows && result.rows.length) ? result.rows[0] : null;
  } catch (error) {
    throw error;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error('Error al cerrar la conexión:', error);
      }
    }
  }
}

export { executeQuery, insertRecord, updateRecord, deleteRecord, first };