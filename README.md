# ROOMUSU APP

App que nos muestra un listado de viviendas para alquilar.

##DEPLOY
Puede ver la aplicación desplegada en: <br>
https://victorious-forest-0cf3b0510.1.azurestaticapps.net/

### Frontend
```
Frontend = {
    technologies: [
        React,
        Axios,
        MaterialUI,
    ]
}
```
---
Para la parte de frontend he seleccionado React.

La App se compone de un componente central que sería la tabla de datos _DataTable_ a la que se le pasan los datos obtenidos a través de Axios en su petición a la API.
La visualización de datos cuanta con paginación y ordenación (en este caso sólo por dirección).
Tanto el componente de ordenación como el de paginación se han obtenido de Material UI, y se ha implementado la lógica necesaria para su correcto funcionamiento.

La aplicación se integra en el componente _APP_ ya que no re quería de una arquitectura de componente muy compleja.


### Backend
```
Backend = {
    technologies: [
        NodeJs, 
        MongoDB Cloud,
        Express
    ]
}
```
---
Se solicita una pequeña API que contiene un único endpoint que devuelve los datos en JSON.

Los datos se han volcado de un json alojado en:
__http://feeds.spotahome.com/ads-housinganywhere.json__

Posteriormente se ejecuta un script que vuelca el json a una base de datos, en este caso MongoDB, haciendo uso de su servicio cloud, con la intención de facilitar su uso sin tener que depender de instalaciones de Mongo en el equipo.

Tanto el script que obitene el json como el que lo carga en la BD forman parte de un CRON que se ejecuta cada hora, con la intención de tener siempre los datos en la BD actualizados en caso de que el archivo json original sufra modificaciones.

Se actua de esta forma ya que se desconoce si el archivo json proporcionado se mantendrá inmutable a lo largo del tiempo o sufrirá cambios. 


## DESPLIEGUE

Para arrancar la app y funcione correctamente:
1. Clonar repositorio: 
    ```
    git clone https://github.com/NandoLT/erasmusu_challenge.git
    ```
2. En el directorio __backend__ (terminal):
    -   ```
        $~backend/
            npm start
        ```
3. En el directorio __frontend__ (terminal):
    -   ```
        $~frontend/
            npm start
        ```
4. Interactuar con la aplicación frontend en nuestro navegador.

## TESTING
### Frontend
Run test:
```
$~ npm run test
```

Se ha realizado con Jest y testing-library/React.
Se ha testeado lo que sería en este caso el componente más crítico como es _DataTable_, en sus dos casuísticas, esto es, que le lleguen datos y que no.

```
 PASS  src/test/components/DataTable.test.js
  Testing DataTable Component
    √ <DataTable /> must show message 'No results in DB' if adverts is empty (36 ms)
    √ <DataTable /> must show a table if adverts is not empty (92 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        7.68 s
Ran all test suites.
```
### Backend
Run test:
```
$~ npm run test
```

Se ha realizado con Mocha y Chai.
Se ha testeado el endpoint al que se solicitan los datos.
Se han planteado dos casuisticas, caso de pasar paginación que nos devuelva el número de items solicitados y en caso de no pasar paginación que nos retorne todos los datos.


```
  Housing Adverts
    CRUD OPERATIONS
      ✔ Should Fetch 10 Adverts when we use pagination
      ✔ Should Fetch all Adverts when we dont use pagination


  2 passing (36ms)

Connected to mongodb at test
GET /?limit=10&skip=1 200 984.811 ms - 3509
RESULT STATUS : 200
RESULT LENGTH:  10
Fetch Data Succesfully
GET / 200 11335.581 ms - 11320278
RESULT STATUS : 200
RESULT LENGTH:  30957 
Fetch Data Succesfully
```
