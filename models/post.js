module.exports = function(sequelize, DataTypes) {
    const Post = sequelize.define("Post", {
        dst: {
            type: DataTypes.STRING,
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