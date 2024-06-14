const router = require("express").Router();
const Room = require("../models/room");

router.post("/create/", async (req, res) => {
  try {
    let room = new Room({
      name: req.body.name,
      owner: req.user._id,
      description: req.body.description,
      addedUsers: req.body.addedUsers,
    });

    const newRoom = await room.save();

    res.status(200).json({
      Created: newRoom,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      Error: err,
    });
  }
});

// Display all rooms endpoint
router.get("/all", async (req, res) => {
  try {
    let results = await Room.find()
      .populate(["name", "description", "addedUsers"])
      .select({
        text: 1,
        createdAt: 1,
        updatedAt: 1,
      });

    // const newRoom = await post.save();
    res.status(200).json({
      Created: results,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      Error: err,
    });
  }
});

// [PUT] Adding Update Endpoint
router.put("/update/:name", async (req, res) => {
  try {
    //pluck the room out of available rooms
    const roomToUpdate = await Room.findOne({ name: req.params.name }).exec();
    //add a user function
    if (req.user.isAdmin || req.user._id === roomToUpdate.owner) {
      let newUsers = [...roomToUpdate.addedUsers];
      newUsers.push(...req.body.addedUsers);
      //remove a user function
      newUsers = newUsers.filter(
        (user) => !req.body.removedUsers.includes(user)
      );
      //update the room
      const roomUpdated = await roomToUpdate
        .updateOne({
          name: req.body.name,
          description: req.body.description,
          addedUsers: newUsers,
        })
        .exec();

      const roomReturnUPdated = await Room.findOne({
        name: req.body.name,
      }).exec();

      res.status(200).json({
        Updated: roomReturnUPdated,
        Results: roomReturnUPdated,
      });
    } else {
      throw new Error("You do not have the ability to update this room");
    }
  } catch (err) {
    res.status(500).json({
      Error: err,
    });
  }
});

// [DELETE] - Remove a room.
router.delete("/delete/:id", async (req, res) => {
  try {
    //find room and delete
    const room = Room.findbyId(req.params.id);
    if (room.owner === req.user._id || req.user.isAdmin) {
      await Room.findByIdAndDelete(req.params.id);

      if (!Room) throw new Error("Room not found");

      res.status(200).json({
        Deleted: 1,
      });
    } else {
      throw new Error("You do not have the ability to delete this room");
    }
  } catch (err) {
    res.status(500).json({
      Error: err,
    });
  }
});

module.exports = router;
