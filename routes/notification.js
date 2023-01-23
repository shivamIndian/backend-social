const router = require("express").Router();
const Notification = require("../models/Notification");


//create a post
router.post("/save-notification", async (req, res) => {
    const newNotification = new Notification(req.body);
    try {
        const savedNotification = await newNotification.save();
        res.status(200).json(savedNotification);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get notifications
// get a post
router.get("/get-notification/:id", async (req, res) => {
    try {

        const notification = await Notification.find({
            recevierId: req.params.id,
        });

        res.status(200).json(notification);
    } catch (err) {
        res.status(500).json(err);
    }

});


//notification read
router.put("/read-notification/:id", async (req, res) => {
    try {
        // create a filter to update all movies with a 'G' rating
        const filter = { recevierId: req.params.id };
        // increment every document matching the filter with 2 more comments
        const updateNotfication = {
            $set: { read: 1 },
        };
        const result = await Notification.updateMany(filter, updateNotfication);
        res.status(200).json("read the notification");
    } catch (err) {
        res.status(500).json(err);
    }
});




module.exports = router
