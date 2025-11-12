module.exports = (Sequelize, DataTypes) => {
    const User = Sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: { 
            type: DataTypes.STRING, 
            allowNull: false,
            validate: {
                isIn: [['Admin','User']] // Updated categories
            }
        },
    });
   /*  User.associate = models => {
        User.hasMany(models.Reservation, {
            onDelete: "cascade"
        });
        User.hasMany(models.Reclamation, {
            onDelete: "cascade"
        });
    }; */
    return User;
};