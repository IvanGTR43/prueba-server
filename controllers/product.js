const Product = require("../models/product");

function addProduct(req, res) {
  const body = req.body;
  const product = new Product(body);
  product.save((err, productStared) => {
    console.log("---------------------" + productStared);
    if (err) {
      res.status(500).send({
        code: 500,
        message: "Error del Servidor",
      });
    } else {
      if (!productStared) {
        res.status(400).send({
          code: 400,
          message: "No se ha agregado el producto",
        });
      } else {
        res.status(200).send({
          code: 200,
          message: "Producto Creado Correctamente",
          product: productStared,
        });
      }
    }
  });
}
function getProducts(req, res) {
  const { page = 1, limit = 10 } = req.query;

  Product.find()
    .then((products) => {
      if (!products) {
        res.status(404).send({ message: "No se ha encontrado productos" });
      } else {
        res.status(200).send({ products });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error del Servidor" });
    });
}
function updateProduct(req, res) {
  const productData = req.body;
  const { id } = req.params;

  Product.findByIdAndUpdate(id, productData, (err, productUpdated) => {
    if (err) {
      res.status(500).send({
        code: 500,
        message: "Error del Servidor",
      });
    } else {
      if (!productUpdated) {
        res.status(404).send({
          code: 404,
          message: "product No encontrado",
        });
      } else {
        res.status(200).send({
          code: 200,
          message: "Producto Actualizado Correctamente",
        });
      }
    }
  });
}
function deleteProduct(req, res) {
  const { id } = req.params;
  Product.findByIdAndRemove(id, (err, productDeleted) => {
    if (err) {
      res.status(500).send({
        code: 500,
        message: "Error del Servidor",
      });
    } else {
      if (!productDeleted) {
        res.status(404).send({
          code: 404,
          message: "NO se encontro ningun product",
        });
      } else {
        res.status(200).send({
          code: 200,
          message: "Producto Eliminado",
        });
      }
    }
  });
}
function getProduct(req, res) {
  const { url } = req.params;

  Product.findOne({ url }, (err, productStored) => {
    if (err) {
      res.status(500).send({
        code: 500,
        message: "Error del Servidor",
      });
    } else {
      if (!productStored) {
        res.status(404).send({
          code: 404,
          message: "No se encontro ningun producto",
        });
      } else {
        res.status(200).send({
          code: 200,
          product: productStored,
        });
      }
    }
  });
}

function uploadImageProduct(req, res) {
  const params = req.params;
  Product.findById({ _id: params.id }, (err, productData) => {
    if (err) {
      res.status(500).send({ message: "Error del Servidor" });
    } else {
      if (!productData) {
        res
          .status(404)
          .send({ message: "NO se ha encontrado ningun producto" });
      } else {
        let product = productData;
        if (req.files) {
          let filePath = req.files.url.path;
          console.log("gfgfgf" + filePath);
          let fileSplit = filePath.split("\\");
          let fileName = fileSplit[2];
          let extSplit = fileName.split(".");

          let fileExt = extSplit[1];
          //console.log(fileExt);
          if (fileExt !== "png" && fileExt !== "jpg") {
            res
              .status(400)
              .send({ message: "La extension de la Imagen no es Valida" });
          } else {
            product.image = fileName;
            Product.findByIdAndUpdate(
              { _id: params.id },
              product,
              (err, userResult) => {
                if (err) {
                  res.status(500).send({ message: "Error del Servidor" });
                } else {
                  if (!userResult) {
                    res
                      .status(404)
                      .send({ message: "No Se ha encontrado ningun Producto" });
                  } else {
                    res.status(200).send({ user: userResult });
                    console.log(userResult);
                  }
                }
              }
            );
          }
        }
      }
    }
  });
}

function getImageProduct(req, res) {
  const image = req.params.avatarName;
  //console.log(avatar);
  const filePath = "./uploads/images/" + image;
  fs.access(filePath, (exists) => {
    if (exists) {
      res.status(404).send({ message: "La Imagen que buscas no existe" });
    } else {
      res.sendFile(path.resolve(filePath));
    }
  });
}

module.exports = {
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getImageProduct,
  uploadImageProduct,
  getProducts,
};
