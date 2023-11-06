const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "No Category Data" });
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!category)
      res.status(404).json({ message: "404 : Category Not Found" });
    else res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "No Category Data" });
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(400).json({ message: "WARNING : Could Not Create Category" });
  }
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
    try {
      Category.update(req.body, {
        where: {
          id: req.params.id,
        },
      }).then((updated) => {
        res.status(200).json(updated);
      });
    } catch (error) {
      res.status(400).json({ message: "WARNING : COULD NOT UPDATE TAG" });
    }
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
