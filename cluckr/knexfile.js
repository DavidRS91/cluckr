const sharedConfig = {
  client: 'pg',
  pool: {
    //Specifies how many db connections are open at a time to do db connections at once.
    min: 2,
    max: 10
  },
  migrations: {
    //This property configures the table used to keep
    // track of out migration files and the location of
    // the files in our project.
    tableName: 'knex_migrations',
    directory: './db/migrations'
  }

};


module.exports = {

  development: {
    ...sharedConfig,
    connection: {
      // this property tells knex where our db can be found
      // (eg username, password, id, db name, etc)
      database: 'cluckr_dev'
    }
  },

  staging: {
    ...sharedConfig,
    connection: {
      database: 'cluckr_staging'
    }
  },

  production: {
    ...sharedConfig,
    connection: {
      database: 'cluckr_production'
    }
  }

};
