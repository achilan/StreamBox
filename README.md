### Servidor de peliculas para ver de manera local

- Para instalar tienes que usar los comandos 


```
npm run install

``` 
antes de iniciarla tienes que instalar mongodb

https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/

siguiente paso 

cambia la ip de frontend/.env.local por tu direccion local de tu maquina
si no esta creado crea ese archivo con 
REACT_APP_API_IP=192.168.100.56 # IP address of the server where the API is running
y guarda

aqui puedes verficar la ip de la maquina que va ser de servidor

```
 ifconfig #linux

 ipconfig #windows
```

luego para iniciar 

````
npm run start

````
