const { Model, DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// create new class
class Post extends Model {
}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // dateCreated: {
        //     // potential bug, DATE type
        //     type: DataTypes.DATE,
        //     allowNull: false,
        //     validate: {}
        // },
        postedBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            }
        }
    },
    {
        hooks: {
            beforeCreate: async (newPostData) => {
                // CREATE TIME STAMP FOR dateCreated here maybe?
                // newPostData.dateCreated = sequelize
                return newPostData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
    }
);

module.exports = Post;