# Descripción funcional de la aplicación

Como primera vista se observa una caja de búsqueda la cual muestra una lista de 4 productos por página. 

Cada tarjeta al hacer click llevará a otra vista donde se observa el detalle del producto y se sigue mostrando la caja de busqueda. 

En ambas vistas se cuenta con sistemas de rutas que permiten hacer una búsqueda por nombre y por id del producto. 

Se adiciona paginación para una tener una mejor experiencia de usuario al momento de navegar en la aplicación. 


## Descripción técnica por componentes



 `AppRouter` : componente principal encargado de mostrar la caja de busqueda y arbol de rutas.\
 `SearchBox` : encargado de obtener el valor del input y cambiar la URL de acuerdo al valor obtenido.\
 `SearchResult` : encargado de hacer el llamado al servidor cada vez que cambie la URL. Rederiza el Breadcrumb, la lista de productos y la paginación.\
`ProductDetail` : encargado de hacer el llamado al servidor cada vez que cambie la URL.  Rederiza el Breadcrumb y el contenedor del detalle del producto.

 `Products` : rederiza dinámicamente cada tarjeta.\
 `Product` : arma la tarjeta por producto.\
 `ContainerDetail` : arma el contenerdor y el detalle del producto.\
 `Breadcrumb` : arma el breadcrumb por categorias.\
 `NotFound` : se renderiza si no encuentra un producto.\
 `Spinner` : se renderiza un spinner al cargar la aplicación.
 
 
## Algunas imagenes de la aplicación:

![image](https://user-images.githubusercontent.com/70062856/113529627-863af100-9589-11eb-987a-1fefd187d141.png) ![image](https://user-images.githubusercontent.com/70062856/113529500-3a884780-9589-11eb-9375-deaa455a92ad.png)



