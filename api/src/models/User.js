const {DataTypes} = require('sequelize')



module.exports= (sequelize) => {
    sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            allowNull: false,
            primaryKey: true,
            unique:true
        },
        name: {
            type:DataTypes.STRING,
            allowNull:true,
        },
        lastName: {
            type:DataTypes.STRING,
            allowNull:true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: true,
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue:'No phone number added'
        },
        location: {
            type: DataTypes.STRING,
            defaultValue: 'No location added',
            allowNull: true,
        }
    })
}