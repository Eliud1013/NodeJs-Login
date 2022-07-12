const mariadb = require("mariadb");
const config = require("../config/index");
require("colors");

const pool = mariadb.createPool({
  host: config.dbHost,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.db,
  port: config.dbPort,
  connectionLimit: 5,
});

class Database {
  async connect() {
    let conn;
    if (!Database.conn) {
      try {
        Database.conn = await pool.getConnection();
        console.log("Connected to the Database".bold);
      } catch (error) {
        console.log(error);
      }
    }
    return Database.conn;
  }

  async getUsers(TABLE) {
    return await this.connect().then((db) => {
      return db.query(`SELECT * FROM ${TABLE};`);
    });
  }

  async getUser(TABLE, id) {
    return await this.connect().then((db) => {
      return db.query(`SELECT  * FROM ${TABLE} WHERE user_id = "${id}";`);
    });
  }

  async createUser(TABLE, data) {
    const { user_id, name, username, email, gender } = data;
    return this.connect().then((db) => {
      return db.query(
        `INSERT INTO ${TABLE} (user_id, name, username, email, gender) VALUES("${user_id}","${name}","${username}","${email}","${gender}");`
      );
    });
  }
  async createUserAuth(TABLE, data) {
    const { user_id, username, email, password } = data;

    return this.connect().then((db) => {
      return db.query(
        `INSERT INTO ${TABLE} (user_id, username, email, password) VALUES("${user_id}","${username}","${email}","${password}");`
      );
    });
  }

  async updateUser(TABLE, id, data) {
    let { name, username, email, gender } = data;

    const exists = await this.connect().then((db) =>
      db.query(`SELECT * FROM ${TABLE} WHERE user_id = "${id}"`)
    );

    if (exists.length != 0) {
      //Asignar todos los valores actualizables
      if (name == undefined) {
        name = await this.connect().then((db) =>
          db.query(`SELECT name FROM ${TABLE} WHERE user_id = "${id}";`)
        );
      }
      if (username == undefined) {
        username = await this.connect().then((db) =>
          db.query(`SELECT username FROM ${TABLE} WHERE user_id = "${id}";`)
        );

        username = username[0].username;
      }
      if (email == undefined) {
        email = await this.connect().then((db) =>
          db.query(`SELECT email FROM ${TABLE} WHERE user_id = "${id}";`)
        );
        email = email[0].email;
      }
      if (gender == undefined) {
        gender = await this.connect().then((db) =>
          db.query(`SELECT gender FROM ${TABLE} WHERE user_id = "${id}";`)
        );
        gender = gender[0].gender;
      }

      return await this.connect().then((db) => {
        return db.query(
          `UPDATE ${TABLE} SET name = "${name}", username = "${username}", email = "${email}", gender = "${gender}" WHERE user_id = "${id}";`
        );
      });
    } else {
      return {
        message: "User ID not found",
        found: false,
      };
    }
  }

  async deleteUser(TABLE, id) {
    return await this.connect().then((db) =>
      db.query(`DELETE FROM ${TABLE} where user_id = "${id}"`)
    );
  }

  async customQuery(query) {
    return await this.connect().then((db) => db.query(query));
  }
}

module.exports = Database;
