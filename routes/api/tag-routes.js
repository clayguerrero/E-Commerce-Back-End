const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");
const { findAll } = require("../../models/Product");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json({ message: "No Tag Data Avalible" });
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tagData) res.status(404).json({ message: "404 : Tag Not Found" });
    else res.status(200).json(tagData);
  } catch (error) {}
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (error) {
    res.status(400).json({ message: "WARNING : Could Not Create Tag" });
  }
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  try {
    Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    }).then((updated) => {
      res.status(200).json(updated);
    });
  } catch (error) {
    res.status(400).json({message : 'WARNING : COULD NOT UPDATE TAG'});
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) res.status(404).json({ message: "404 : Tag Not Found" });
    else res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json({ message: "WARNING : Tag Could Not Be Deleted!" });
  }
});

module.exports = router;
