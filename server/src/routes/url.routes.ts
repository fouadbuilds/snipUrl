import { Router } from "express";
import mongoose from "mongoose";
import Url from "../db/Url.js";
import { convertToBase62, decodeBase62 } from "../utils/urlConversion.js";
import isUrlValid from "../utils/validateUrl.js";

const router = Router();

router.post("/shorten", async (req, res) => {
  try {
    const { longUrl } = req.body;

    if (!isUrlValid(longUrl)) {
      return res.status(400).json({ success: false, message: "Invalid Url" });
    }

    const newEntry = new Url({ longUrl });
    // save to mongo
    const savedEntry = await newEntry.save();

    const numericId = parseInt(savedEntry._id.toString().slice(-8), 16);
    const storedCode = convertToBase62(numericId);

    savedEntry.shortUrl = storedCode;
    await savedEntry.save();

    res.status(201).json({
      success: true,
      data: {
        id: savedEntry._id,
        longUrl: savedEntry.longUrl,
        shortUrl: storedCode,
        message: "Successfully updated with short code!",
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  }
});

router.get("/:shortCode", async (req, res) => {
  try {
    const shortCode = req.params.shortCode;
    const urlCode = await Url.findOne({ shortUrl: shortCode });

    if (!urlCode) {
      return res.status(404).send("<h1>URL not found</h1>");
    }
    res.redirect(301, urlCode.longUrl);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

export default router;
