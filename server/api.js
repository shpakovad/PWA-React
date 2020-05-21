const express = require("express");
const router = express.Router();
const Data = require("./data");

router.get("/data", (req, res) => {
        Data.find({})
            .then(data => {
                res.send(data)
            })
});
router.post("/data", (req, res) => {
    Data.create(req.body)
        .then(data => {
            res.send(data);
        })
});
router.delete("/data/:id", (req, res) => {
    Data.deleteOne({_id:req.params.id})
        .then(data => {
            res.send(data);
        })
});

module.exports = router;
