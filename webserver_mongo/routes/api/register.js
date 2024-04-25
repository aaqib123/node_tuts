const express = require("express");
const router = express.Router();
const { handleNewUser } = require("../../controllers/registerController");

router.post("/", handleNewUser);

// router.all("*", (req, res) => {
//     res.status(404);
//     res.json({ error: "invalid" });
// });

module.exports = router;
