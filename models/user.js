var bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {

    var User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };

    User.addHook("beforeCreate", function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });
    // return User;

    User.associate = function(models) {
        User.hasMany(models.Post, {
            onDelete: "cascade"
        });
    };
    return User;
    
};
    // const User = sequelize.define("User", {
    //     name: DataTypes.STRING,
    //     username: DataTypes.STRING,
    //     email: DataTypes.STRING,
    //     phone: DataTypes.STRING,
    //     password: DataTypes.STRING,
    //     accept: DataTypes.BOOLEAN
    // });

   
