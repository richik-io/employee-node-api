module.exports = (sequelize, Sequelize) => {
    const EmployeeDetail = sequelize.define("employee", {
      name: {
        type: Sequelize.STRING
      },
      job_title: {
        type: Sequelize.STRING
    },
      phoneno: {
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
        },
      address:{
        type: Sequelize.STRING
      },
      city:{
        type: Sequelize.STRING
      },
      state:{
        type: Sequelize.STRING
      },
    });
    const PrimaryDetail = sequelize.define("primaryDetails", {
        "phoneno": {
            type: Sequelize.INTEGER
        },
        "name": {
            type: Sequelize.STRING
        },
        "rel_phoneno":{
        type: Sequelize.INTEGER
        },
        "relationship":{
            type: Sequelize.STRING
        }
    });
  
    return EmployeeDetail,PrimaryDetail;
  };