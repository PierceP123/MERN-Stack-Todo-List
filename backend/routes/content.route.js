const express = require("express");
const Content = require("../models/content.model.js");
const router = express.Router();
const { getAllContent, getContent, createContent, updateContent, deleteContent } = require("../controllers/content.controller.js");


router.get('/', getAllContent);
router.get("/:id", getContent);
router.post("/", createContent);
router.put("/:id", updateContent);
router.delete("/:id", deleteContent);


module.exports = router;
