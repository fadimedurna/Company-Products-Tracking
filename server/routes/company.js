const express = require("express");
const router = express.Router();
const Company = require("../models/Company");

// Get all companies
router.get("/", async (req, res) => {
  const { skip, limit, search, sort, companyId } = req.query;
  const query = {};
  if (search) {
    query.name = { $regex: search, $options: "i" };
  }
  try {
    const companies = await Company.find(query)
      .skip(parseInt(skip))
      .limit(limit === "-1" ? undefined : parseInt(limit))
      //sorting as creating newly
      .sort({ createdAt: -1 });
    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting the total number of companies
router.get("/total", async (req, res) => {
  try {
    const count = await Company.countDocuments();
    res.status(200).json(count);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET COMPANY STATS
router.get("/stats", async (req, res) => {
  const today = new Date();
  const lastYear = new Date(today.setFullYear(today.getFullYear() - 1));

  try {
    const data = await Company.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 }, // $sum is a mongoose method that sums the total number of admins
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
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
    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCompany);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a company
router.delete("/:id", getCompany, async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    console.log("deleted company: ", company);
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
