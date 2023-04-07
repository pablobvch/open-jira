# NextJS OpenJira App

Para correr localmente necesitamos la DB

```
docker-compose up -d
```

-d: significa **detached**

```
mongodb://localhost:27017/entriesdb
```

## Configurar las variables de entorno

**.env.template** a **.env**

## Instalar node dependencies

```
yarn install
yarn dev
```

## Llenar la db con nueva info

```
http://localhost:3000/api/seed
```
