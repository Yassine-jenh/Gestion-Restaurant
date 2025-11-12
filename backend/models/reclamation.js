module.exports = (Sequelize, DataTypes) => {
    const Reclamation = Sequelize.define("Reclamation", {
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        emailAddress: { type: DataTypes.STRING, allowNull: false },
        reclamation: { type: DataTypes.TEXT, allowNull: false },
        UserId: { type: DataTypes.INTEGER, allowNull: false }
    });

    Reclamation.associate = models => {
        if (models.User) {
            Reclamation.belongsTo(models.User, {
                onDelete: "cascade",
                foreignKey: { allowNull: false }
            });
        } else {
            console.error("User model is not defined in models object");
        }
    };

    return Reclamation;
};
