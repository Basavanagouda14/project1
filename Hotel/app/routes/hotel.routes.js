module.exports = app => {
    const hotels = require("../controllers/hotel.controller.js");
  
    var router = require("express").Router();
  
    // Create a new hotels
    router.post("/", hotels.create);
  
    // Retrieve all hotels
    router.get("/", hotels.findAll);
  
    // Retrieve all Rooms_availabel hotels
    router.get("/Rooms_availabel", hotels.findAllRooms_availabel);
  
    // Retrieve a single hotels with id
    router.get("/:id", hotels.findOne);
  
    // Update a hotels with id
    router.put("/:id", hotels.update);
  
    // Delete a hotels with id
    router.delete("/:id", hotels.delete);
  
    // Delete all hotels
    router.delete("/", hotels.deleteAll);
  
    app.use('/api/hotels', router);
  };
  