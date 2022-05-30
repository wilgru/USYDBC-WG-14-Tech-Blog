const { Model, DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// create new class
class Comment extends Model {
}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        date: {
            // potential bug, DATE type
            type: DataTypes.DATEONLY,
            allowNull: false,
            // validate: {}
        },
        onPost: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'post',
                key: 'id',
            }
        },
        commentedBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
);

module.exports = Comment;