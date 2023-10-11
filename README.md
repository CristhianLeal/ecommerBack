<h1 align="center">
Challenge Equizilla API
</h1>

<div align="center">

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Eslint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

</div>

## Requirements:

Build a RESTful API for CRUD operations on products (it was created with Node.js).
Endpoint **/products** for product management.
- Product properties: id, name, description, image_url, price.
Supports list retrieval, filtering by name and description.
- Handles CRUD operations: create, read, update, delete products.
Utilizes a database to store product information.

- Database & ORM :Utilize a recommended ORM or an alternative for data storage.I chose Prisma and Mysql.

Extras

- Implement authorization for POST, PUT, DELETE methods.

- Additional Data Model: Brands, Introduce a brands model with name and logo_url.
Ensure each product is associated with a brand.

## How the App Works:
The backend functions as an API server that handles requests related to products, performs necessary CRUD operations using an ORM and interacts with a database for persistent data storage. It ensures data integrity and processes incoming requests securely to provide accurate responses to the frontend.

## Development

### Previous requirements

* Have installed a version 16.13 or higher of [Node Js](https://nodejs.org/en)

### Setup

The project repository should be cloned:
```
git clone https://github.com/CristhianLeal/ecommerBack.git
```

### Install the dependencies: 

```
npm install 
```
### Additional Information and clarifications

* In order to deploy the project, it is necessary to complete the .env file in the way it is in the .env.example example

* For the correct functioning of the project, the Frontend and the Backend are necessary


### Available Scripts

| Script         | Descripción                                         |
| -------------- | --------------------------------------------------- |
| npm run lint   | Checks for style errors                             |
| npm run build  | Compiles and prepares code for production deployment|
| npm run dev    | Start the server in development mode                |
| npm start      | Start the server in production mode                 |  


## Dependencias 
- [cors](https://github.com/expressjs/cors#readme) Proporciona un middleware para conectar express.
- [dotenv](https://github.com/motdotla/dotenv#readme) Carga las variables de entorno desde el archivo .env
- [express](https://expressjs.com/) framework para Node.js.
- [nodemon](https://www.npmjs.com/package/nodemon)Nodemon automatically restarts Node.js server on file changes, aiding in efficient development and real-time testing.
- [express-validator](https://www.npmjs.com/package/express-validator) Express-validator validates and sanitizes user input in Express applications.
- [prisma](https://www.prisma.io/) Prisma is a modern database ORM for simplified interaction.
- [JWT](https://jwt.io/) JWT (JSON Web Tokens) is a secure way to transmit information between parties in compact, URL-safe strings. It's used for authentication and authorization.

## Estructura de carpetas

```
CRIPTOTEST-BACK
├── node_modules
├── prisma
└── source
    ├── controllers
    ├── db
    ├── middlewares
    ├── routes
    ├── server.js
├── .env
├── .eslintrc.cjs
├── .gitignore
├── app.js
├── package-lock.json
├── package.json
├── README.md
```

## Deploy

The aplication has been deployed on [Render](https://render.com/) on the following link:
```
https://ecommerce-back-v671.onrender.com
```
**MySQL** has been deployed on an EC2 instance on [AWS](https://aws.amazon.com/) on the following ip:
```
100.24.70.232
```


