const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    attributes: ['id', 'category_name'],
    include: [
      {
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"],
      }
    ]
  })
  .then((dbCategoryData) => res.json(dbCategoryData))
  .catch((err) => {
    console.log(err)
    res.status(500).json(err)
  })
});

router.get('/:id', (req, res) => { // get by id
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "category_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"]
      },
    ],
  })
  .then((dbCategoryData) => res.json(dbCategoryData))
  .catch((err)=> {
    console.log(err)
    res.sendStatus(500).json(err)
  })
});

router.post('/', (req, res) => { //post route
  // create a new category
  Category.create({
    id: req.body.id,
    category_name: req.body.category_name,
  })
  .then((dbCategoryData)=> res.json(dbCategoryData))
  .catch((err)=> {
    console.log(err)
    res.status(500).json(err)

  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
    
  )
  .then((dbCategoryData)=> {
    if(!dbCategoryData) {
      res.status(404).json({message: "This cannot be found"})
      return
    }
    res.json(dbCategoryData)
  })
  .catch((err)=> {
    console.lof(err)
    res.status(500).json(err)
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((dbCategoryData)=> {
    if(!dbCategoryData) {
      res.status(404).json({message: "This cannot be found"})
      return
    }
    res.json(dbCategoryData)
  })
  .catch((err)=> {
    console.lof(err)
    res.status(500).json(err)
  })
});

module.exports = router;
