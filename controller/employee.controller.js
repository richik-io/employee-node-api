const db = require("../models");
const EmployeeDetails = db.EmployeeDetail;
const PrimaryDetails = db.PrimaryDetail;
const Op = db.Sequelize.Op;

// Create and Save a new employee
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
}
    // Create a employee
  const employees = {
    name: req.body.name,
    job_title: req.body.job,
    phoneno: req.body.phoneno,
    email: req.body.email,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state
  };
  const primaryDetails = {
    phoneno: req.body.phoneno,
    name: req.body.rel_name,
    rel_phoneno: req.body.rel_phoneno,
    relationship: req.body.relationship
  }

  // Save employee in the database
  EmployeeDetails.create(employees)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Employee."
      });
    });
    PrimaryDetails.create(primaryDetails)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Primary Details."
      });
    });
};

// Retrieve all employees from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    EmployeeDetails.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving employees."
        });
      });
      PrimaryDetails.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving employees."
        });
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    EmployeeDetails.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find employee with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving employee with id=" + id
        });
      });
        
    PrimaryDetails.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find employee with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving employee with id=" + id
      });
    });
  };

  exports.update = (req, res) => {
    const id = req.params.id;
  
    EmployeeDetails.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "employee was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update employee with id=${id}. Maybe employee was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating employee with id=" + id
        });
      });
      PrimaryDetails.update(req.body, {
        where: { id: id }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "employee was updated successfully."
            });
          } else {
            res.send({
              message: `Cannot update employee with id=${id}. Maybe employee was not found or req.body is empty!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating employee with id=" + id
          });
        });
  };

// Delete a employee with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    EmployeeDetails.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "employee was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete employee with id=${id}. Maybe employee was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete employee with id=" + id
        });
      });
      PrimaryDetails.destroy({
        where: { id: id }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "employee was deleted successfully!"
            });
          } else {
            res.send({
              message: `Cannot delete employee with id=${id}. Maybe employee was not found!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Could not delete employee with id=" + id
          });
        });
  };
