# Hestia Back-end API

This project is a RESTFull API used to share data with the declaration module and the visualiser module.
The API communicates with a PostgreSQL database.

To start this API server :

- Clone this repository

- Run ```npm install``` in the root directory of the project to download all dependencies

- Make sure you have a PostgreSQL service running on your computer

- In your PostgreSQL console, enter this SQL commands :

 ```sql
CREATE USER hestia SUPERUSER with password 'TT829';
```
```sql
CREATE DATABASE hestiadb OWNER hestia;
```

- Run ```npm start``` in the root directory of the project to run the server.