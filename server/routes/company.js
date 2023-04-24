const express = require("express");
const router = express.Router();
const Company = require("../models/Company");

// Get all companies
router.get("/", async (req, res) => {
  const { skip, limit, search } = req.query;
  const query = {};
  if (search) query.name = { $regex: search, $options: "i" }; //regex is used to search for a string in a field, $options: "i" is used to make the search case insensitive
  try {
    const companies = await Company.find(query)
      .skip(parseInt(skip)) //skip is used to skip a number of documents in a query, parseInt is used to convert the string to an integer
      .limit(limit === "-1" ? undefined : parseInt(limit));
    res.status(200).json(companies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific company
router.get("/:id", getCompany, (req, res) => {
  res.status(200).json(res.company);
});

// Create a new company
router.post("/", async (req, res) => {
  const company = new Company({
    name: req.body.name,
    legalNumber: req.body.legalNumber,
    country: req.body.country,
    website: req.body.website,
  });

  try {
    const newCompany = await company.save();
    res.status(201).json(newCompany);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a company
router.patch("/:id", getCompany, async (req, res) => {
  if (req.body.name != null) res.company.name = req.body.name;

  if (req.body.legalNumber != null)
    res.company.legalNumber = req.body.legalNumber;

  if (req.body.country != null) res.company.country = req.body.country;

  if (req.body.website != null) res.company.website = req.body.website;

  try {
    const updatedCompany = await res.company.save();
    res.status(200).json(updatedCompany);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a company
router.delete("/:id", getCompany, async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    console.log(company);
    await company.deleteOne();
    res.status(200).json({ message: "Company deleted." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a specific company by ID
async function getCompany(req, res, next) {
  try {
    const company = await Company.findById(req.params.id);
    if (company == null) {
      return res.status(404).json({ message: "Company not found!" });
    }
    res.company = company;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
