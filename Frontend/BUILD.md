### Instalar dependencias
```
npm install
```

### Cuenta EAS-cli
Para poder subir nuestra build, necesitamos utilizar la herramienta eas-cli, por lo que necesitamos tener una cuenta en Expo Go 

#### Instalación del cliente
Una vez tenemos nuestra cuenta, podemos utilizar el siguiente comando
```
npm install -g eas-cli
```
Este sirve para instalar eas-cli.

#### Login to eas
Una vez instalado, podemos usar
```
eas login
```
Si este código no encuentra a eas en el sistema, intenta con `npx eas login`.

Para saber si estamos logeados, podemos usar `eas whoami`, esto nos devuelve nuestro usuario

#### Si no existe el archivo _eas.json_
Nuestro archivo eas.json le explica a eas-cli como se utilizará el código, es necesario para especificarle que nuestra build será una apk.
lo podemos crear con:
```
eas build:configure
```
Una vez creado, para poder utilizar la aplicación como .apk, es necesario reescribir este archivo con el siguiente código:

eas.json:
``` json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "preview2": {
      "android": {
        "gradleCommand": ":app:assembleRelease"
      }
    },
    "preview3": {
      "developmentClient": true
    },
    "production": {}
  }
}
```
[Mas información sobre setup de nuestra build](https://docs.expo.dev/build/setup/)
### Creación de APK
Una vez configurado eas (y nuestro archivo eas.json), podemos utilizar el siguiente comando para correr nuestra build
```
eas build -p android --profile preview
```
En este caso, el perfil se llama `preview` , pero puede ser el nombre que sea.

### Instalando nuestra build
Una vez tenemos nuestra build configurada y creamos nuestro perfil, podemos crear un link de instalación con el siguiente comando: 
```
eas build:run -p android
```
Este comando empezará un proceso de subir la app y crear un link para nosotros descargarla.
Al terminar la instalación, se nos mostrará en consola un mensaje que dice si queremos instalar la app en un emulador, podemos seleccionar `no`.
Al terminar, la consola nos dará un link con terminación `.apk`, podemos ingresar este link en un celular android para instalar la app.

[Información sobre la instalación de la build](https://docs.expo.dev/build-reference/apk/)