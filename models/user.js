module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
        name: DataTypes.STRING,
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        password: DataTypes.STRING,
        accept: DataTypes.BOOLEAN
    });

    User.associate = function(models) {
        User.hasMany(models.Post, {
            onDelete: "cascade"
        });
    };
    return User;
};