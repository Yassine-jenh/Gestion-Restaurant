module.exports = (Sequelize, DataTypes) => {
    const Reservation = Sequelize.define("Reservation", {
        fname: { type: DataTypes.STRING, allowNull: false },
        lname: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        phone: { type: DataTypes.STRING, allowNull: false },
        date: { type: DataTypes.DATEONLY, allowNull: false },
        time: { type: DataTypes.TIME, allowNull: false },
        guests: { type: DataTypes.INTEGER, allowNull: false },
        message: { type: DataTypes.TEXT, allowNull: true }
    });
    Reservation.associate = models => {
        if (models.User) {
            Reservation.belongsTo(models.User, {
                onDelete: "cascade"
            });
        } else {
            console.error("User model is not defined in models object");
        }
    };
    return Reservation;
};