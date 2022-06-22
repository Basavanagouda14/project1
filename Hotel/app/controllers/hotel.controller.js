const db = require("../models");
const Hotel = db.hotels;
const Op = db.Sequelize.Op;

// Create and Save a new Hotel
exports.create = (req, res) => {
  // Validate request
  if (!req.body.hotel_name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Hotel
  const hotel = {
    hotel_name: req.body.hotel_name,
    hotel_address: req.body.hotel_address,
    Rooms_available: req.body.Rooms_available //? req.body.rooms : false
  };

  // Save Hotel in the database
  Hotel.create(hotel)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the hotel."
      });
    });
};

// Retrieve all hotel from the database.
exports.findAll = (req, res) => {
  const hotel_name = req.query.hotel_name;
  var condition = hotel_name ? { hotel_name: { [Op.like]: `%${hotel_name}%` } } : null;

  Hotel.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving hotel."
      });
    });
};

// Find a single hotel with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Hotel.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find hotel with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving hotel with id=" + id
      });
    });
};

// Update a hotel by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Hotel.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "hotel was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update hotel with id=${id}. Maybe hotel was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating hotel with id=" + id
      });
    });
};

// Delete a hotel with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Hotel.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "hotel was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete hotel with id=${id}. Maybe hotel was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete hotel with id=" + id
      });
    });
};

// Delete all hotel from the database.
exports.deleteAll = (req, res) => {
  Hotel.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} hotel were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all hotels."
      });
    });
};

// find all  Rooms_availabel in hotel
exports.findAllRooms_availabel = (req, res) => {
  Hotel.findAll({ where: { Rooms_availabel: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving hotels."
      });
    });
};
