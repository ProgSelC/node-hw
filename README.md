# node-hw

## BEFORE RUNNING THE CODE

 - install PostgreSQL
 - update connection parameters in src/config/dbConfig.js and config/config.json
 - run `npm run seed` to create users table and populate it with demo data

## API endpoints:

[https://localhost:3000/](https://localhost:3000/)

_Important_: after adding jwt authentication, only `login` endpoint returns result in swagger
             all other endpoints require token authorization

To be able to run other endpoints perform following steps:
* run the login endpoint with exaple credetials (which are already populated)
* copy the token text from response
* push `Autorize` button at the top of the page and paste the token to the corresponding field
* after that all other endpoints become available for about 1 hour befor the token expires
