
#### INSTALAR DEPENDENCIAS 

``` 
npm install
```

---

#### CREAR ARCHIVO .ENV

Crea un archivo .env con el siguiente formato: <br>

``` 
DATABASE_URL="mysql://root:Password@localhost:3306/api_prisma_db schema=public" 
```

Para probar en tu base de datos local reemplaza "root" y "password" por las de tu db local, también reemplaza "api_prisma_db?schema=public" por el schema que tengas en tu db local.

---

#### MIGRAR DATABASE

```
npx prisma migrate dev --name init 
```

---

#### INICIAR DACKEND

```
npm start 
```

---

#### UNIT TESTING
```
npm test
```

---
#### SEEDING 
El seeding debería de realizarse al realizar la migración, si no ocurre se puede ejecutar el comando: <br>

``` 
npx prisma db seed
```

---

#### DOCUMENTACIÓN DE PRISMA
**https://www.prisma.io/docs**
