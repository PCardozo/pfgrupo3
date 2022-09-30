const {DataTypes} = require('sequelize')


module.exports= (sequelize) => {
    sequelize.define('adoption_petition', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            allowNull: false,
            primaryKey: true,
            unique:true
        },
        topic: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true,
        },
        read: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue:false,
        }
    },{
        timeStamps:true,
        createdAt:true,
        updatedAt:false,
    })
}