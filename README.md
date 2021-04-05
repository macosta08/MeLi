# MeLi Challenge Activity - Mercadolibre Colombia 

Ejercicio práctico para evaluar conocimientos en `React` y `NodeJs`. 
> Los requerimientos del ejercicio se encuentran en el siguiente [LINK][1].

A continuación podras interactuar con la aplicación construida:  [Ver DEMO][2].

## Documentación: 

- Ver documentación del [Front End][3]. 
- Ver documentación de [Back End][4]. 


### Instalación de ambiente local: 

Para ejecutar la aplicación en el ambiente local seguir los siguientes pasos:

1. git clone https://github.com/macosta08/MeLi.git

2. cd `MeLi/`

3. Ejecutar el comando `npm install` en el directorio `Front/` y `Back/`

4. Para levantar el server de forma local hacer lo siguiente:

- Ubicarse en el directorio `MeLi/Back/`
- Ejecutar el comando `npm run dev`

![image](https://user-images.githubusercontent.com/70062856/113530621-11b58180-958c-11eb-895f-b26c41cfad1c.png)

- Realizar una petición GET de prueba, desde un cliente API de su preferencia, al siguiente endpoint: `http://localhost:8000/api/items?q=alimento para perros`
- Debe obtener un response exitoso

![image](https://user-images.githubusercontent.com/70062856/113530668-2a259c00-958c-11eb-9418-2fa0d3ec04b4.png)

5. Para levantar la app de forma local hacer lo siguiente:

- Ubicarse en el directorio `MeLi/Front/`
- Ejecutar el comando `npm start`
- Deberá abrirse la aplicación en Localhost

![image](https://user-images.githubusercontent.com/70062856/113530779-7d97ea00-958c-11eb-9e03-9e50e59395ae.png)

**Nota:** Tener en cuenta, que por defecto las peticiones que realiza la aplicación web lo hace al API desplegada en Heroku. Si desea realizar las peticiones al API de su ambiente local, hacer lo siguiente:

- Abrir el archivo `httpMethod.js` que se encuentra en el directorio `MeLi/Front/src/utils/`
- Actualizar el valor de la constante `URL` con `"http://localhost:8000"`


[1]: https://bit.ly/2IGzCtS
[2]: https://mercadolibre-macosta08.netlify.app
[3]: https://github.com/macosta08/MeLi/tree/master/Front#readme
[4]: https://nameless-stream-81570.herokuapp.com/doc
