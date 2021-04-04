const fetch = require("isomorphic-fetch");
module.exports = function (app) {
  app.get("/api/items", async (req, res) => {
    // #swagger.tags = ['Items']
    // #swagger.description = 'Consulta el endpoint: https://api.mercadolibre.com/sites/MLA/search?q=:query y devuelve los resultados en un formato indicado.<br><br> Es necesario consumir el endpoint https://api.mercadolibre.com/categories/:id_category para construir el arreglo de categorías basado en la categoría que mas resultados obtuvo'

    /* 
	#swagger.parameters['q'] = {
        description: 'Frase clave de los productos a buscar',
        type: 'string'
    } */
    const { q } = req.query;
    const resItems = {
      author: getAuthor(),
      categories: [],
      items: [],
    };
    try {
      //Llamado al API SEARCH
      const searchResponse = await (
        await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${q}`)
      ).json();

      if (searchResponse.paging.total > 0) {
        //Asignación de los items al JSON de salida
        resItems.items = searchResponse.results.map((item) => buildItem(item));

        //Se busca el category en key available_filters
        const cat_available_filters = searchResponse.available_filters.find(
          (filter) => filter.id === "category"
        );

        //Se busca el category en key filters
        const cat_filters = searchResponse.filters.find(
          (filter) => filter.id === "category"
        );

        //Se obtiene el id del category
        //Si existe el key available_filters, se obtiene el id que mas resultados obtuvo
        //caso contrario, se toma del key filters
        const idCategory =
          cat_available_filters !== undefined
            ? cat_available_filters.values.sort(
                (a, b) => b.results - a.results
              )[0].id
            : cat_filters.values[0].id;

        // Array de categorías para basado en la categoría que más resultados obtuvo
        resItems.categories = await getCategories(idCategory);
      }

      //Se retorna el JSON resultante
      /* 
	  #swagger.responses[200] = { 
			schema: { $ref: "#/definitions/Items" },
			description: 'Lista de productos encontrados.' 
      } */
      res.status(200).json(resItems);
    } catch (error) {
      res.status(400).json("Bad response from server");
    }
  });

  app.get("/api/items/:id", async (req, res) => {
    // #swagger.tags = ['Items']
    // #swagger.description = 'Debe consultar los siguientes endpoints:<br><br>https://api.mercadolibre.com/items/:id<br>https://api.mercadolibre.com/items/:id/description<br><br>Y devolver los resultados en el formato indicado. <br><br> <b>IMPORTATE:</b> Fue necesario construir el arreglo de categorías para indicar la categoría propia del producto'

    /* 
	#swagger.parameters['id'] = {
        description: 'ID del producto a consultar',
        type: 'string'
    } */

    const { id } = req.params;
    const resDetail = {
      author: getAuthor(),
      item: {},
      categories: [], //Fue necesario agregarlo para poder generar el BREADCRUM del item
    };
    try {
      //Llamado al API del detalle del ITEM
      const itemDetail = await (
        await fetch(`https://api.mercadolibre.com/items/${id}`)
      ).json();

      //Llamado al API de la descripción del ITEM
      const description = await (
        await fetch(`https://api.mercadolibre.com/items/${id}/description`)
      ).json();

      // Detalle del item
      resDetail.item = buildDetail(itemDetail, description);

      // Se obtiene el array con las categorías de un item puntual
      resDetail.categories = await getCategories(itemDetail.category_id);

      //Se retorna la respuesta
      /* 
	  #swagger.responses[200] = { 
			schema: { $ref: "#/definitions/Item" },
			description: 'Información del producto encontrado' 
      } */
      res.status(200).json(resDetail);
    } catch (error) {
      res.status(400).json("Bad response from server");
    }
  });
};

//Función que construye el objeto del autor
const getAuthor = () => {
  return {
    name: "Mariangel",
    lastname: "Acosta",
  };
};

// Función que hace Llamado al API CATEGORIES
const categoryResponse = async (id) => {
  return await (
    await fetch(`https://api.mercadolibre.com/categories/${id}`)
  ).json();
};

// Función que arma el array de categories
const getCategories = async (idCategory) => {
  const catRes = await categoryResponse(idCategory);
  return catRes.path_from_root.map((category) => category.name);
};

// Función que arma la JSON de respuesta para el ITEM
const buildItem = (item) => {
  return {
    id: item.id,
    title: item.title,
    price: {
      currency: item.currency_id,
      amount: partInt(item.price),
      decimals: partDec(item.price),
    },
    picture: item.thumbnail,
    condition: item.condition,
    free_shipping: item.shipping.free_shipping,
    location: item.address.state_name, //Este fue necesario agregarlo para poder rederizar la localidad como se muestra en el diseño de la tarjeta
  };
};

// Función que arma la JSON de respuesta para el detalle del ITEM
const buildDetail = (item, description) => {
  return {
    id: item.id,
    title: item.title,
    price: {
      currency: item.currency_id,
      amount: partInt(item.price),
      decimals: partDec(item.price),
    },
    picture: item.thumbnail,
    condition: item.condition,
    free_shipping: item.shipping.free_shipping,
    sold_quantity: item.sold_quantity,
    description: description.plain_text,
  };
};

//Funciones para obtener parte entera y decimal de un numero
const partInt = (num) => Math.trunc(num);
const partDec = (num) => Math.trunc((num - partInt(num)) * 100);
