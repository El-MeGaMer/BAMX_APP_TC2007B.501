#### INSTALAR DEPENDENCIAS 
``` npm install ```
#### CREAR ARCHIVO .ENV
``` touch .env  ```

**Formato del archivo .env**
``` DATABASE_URL="mysql://root:PAssword@localhost:3306/api_prisma_db?schema=public" ```

#### MIGRAR DB
``` npx prisma migrate dev --name init ```

#### INICIAR:
``` npm start ```

#### UNIT TESTING
``` npm test ```

#### SEEDING: 
**NOTA:** el seeding deberia de realizarse al realizar la migración, si no ocurre se puede ejecutar el comando
``` npx prisma db seed ```