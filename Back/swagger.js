const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./endpoints.js"];

const doc = {
  info: {
    version: "1.0.0",
    title: "Challenge Activity - Mercadolibre Colombia",
    description:
      "Documentación generada automáticamente por el módulo <b>swagger.autogen</b>.",
  },
  host: "nameless-stream-81570.herokuapp.com",
  basePath: "/",
  schemes: ["https", "http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "Items",
      description: "Endpoints",
    },
  ],
  definitions: {
    Items: {
      author: {
        name: "Mariangel",
        lastname: "Acosta",
      },
      categories: ["Hogar, Muebles y Jardín", "Bazar y Cocina"],
      items: [
        {
          id: "MLA751217909",
          title: "Bombillas Bombillo Luz Blanca Usado Philips 23w Luz Suave",
          price: {
            currency: "ARS",
            amount: 100,
            decimals: 0,
          },
          picture:
            "http://http2.mlstatic.com/D_965384-MLA28282915009_102018-I.jpg",
          condition: "used",
          free_shipping: false,
          location: "Capital Federal",
        },
      ],
    },
    Item: {
      author: {
        name: "Mariangel",
        lastname: "Acosta",
      },
      item: {
        id: "MLA902787566",
        title: "Shorts Hombre Deportivos Gimnasio Futbol Running Pantalon",
        price: {
          currency: "ARS",
          amount: 560,
          decimals: 0,
        },
        picture:
          "http://http2.mlstatic.com/D_660653-MLA44464129170_122020-I.jpg",
        condition: "new",
        free_shipping: false,
        sold_quantity: 1079,
        description: "Aquí va la descripción del producto",
      },
      categories: ["Ropa y Accesorios", "Ropa Deportiva", "Shorts"],
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./server.js");
});
