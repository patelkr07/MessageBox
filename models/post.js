module.exports = function(sequelize, DataTypes) {
    const Post = sequelize.define("Post", {
        phone: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        app: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    });

    Post.associate = function(models) {
        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Post;
}