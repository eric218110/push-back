
# Backend

Criado em typescript com o framework NestJS. Os endPoint estão de acordo com a documentação informada.

Tecnologia:

* [nestjs](https://nestjs.com/)
* [passport](https://www.passportjs.org/)
* [express](https://expressjs.com/pt-br/)
* [jwt](http://jwt.io/)
* [prisma](https://www.prisma.io/)
* [bcryptjs](https://www.npmjs.com/package/bcryptjs)
* [class-validator](https://www.npmjs.com/package/class-validator)
* [postgres](https://www.postgresql.org/)
* [docker](https://www.docker.com/)


Url de deploy: [backend](https://src-backend-push-notification.vercel.app/)

## Executar backend local

```bash
git clone https://github.com/eric218110/src-backend-push-notification.git
cd src-backend-push-notification

# Instalar os pactotes
yarn install or npm install

# executar migrations
yarn migrations:dev or npm run migrations:dev

#Executar o projeto
yarn start:dev or npm run dev

```

Se preferir, deixei uma collection do postman, [colletion](https://github.com/eric218110/src-backend-push-notification/blob/main/docs/push.postman_collection.json), só importar no Postman.

