const mysql = require('mysql');

const addcontent = async (req, res) => {
  try {
    console.log(req.body);
    const { content } = req.body;
    const message = {
      content
    }

    console.log(message);
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Jyot@123',
      database: 'sys',
      authSwitchHandler: function ({pluginName, pluginData}, cb) {
        if (pluginName === 'mysql_native_password') {
          const password = 'Jyot@123';
          const token = mysql.auth.generateToken(password);
          return cb(null, token);
        }
        return cb(new Error('Unsupported auth plugin'));
      }
    });
    

    connection.connect();

    const insertQuery = `INSERT INTO message VALUES (?)`;

    connection.query(insertQuery, [
      message.content
    ], (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(results);
        res.send(student);
      }
    });

    connection.end();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = { addcontent };
