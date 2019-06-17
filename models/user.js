module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
        fname: DataTypes.STRING,
        lname: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        social_type: DataTypes.STRING,
        profile_image: DataTypes.BLOB
    });
    return User;
};