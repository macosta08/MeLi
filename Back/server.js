const express = require("express");
const fetch = require("isomorphic-fetch");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 8000;
app.use(cors());

//Funciones para obtener parte entera y decimal de un numero
const partInt = (num) => Math.trunc(num);
const partDec = (num) => Math.trunc((num - partInt(num)) * 100);

app.get("/api/items", async (req, res) => {
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
    res.json(resItems);
  } catch (error) {
    res.status(400).json("Bad response from server");
  }
});

app.get("/api/items/:id", async (req, res) => {
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
    res.json(resDetail);
  } catch (error) {
    res.status(400).json("Bad response from server");
  }
});

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

const getCategories = async (idCategory) => {
  //Llamado al API Categories
  const catRes = await categoryResponse(idCategory);

  return catRes.path_from_root.map((category) => category.name);
};

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

app.listen(PORT, () => {
  console.log(`Escuchando sobre el puerto ${PORT}`);
});
