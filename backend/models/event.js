module.exports = (Sequelize, DataTypes) => {
    const Event = Sequelize.define("Event", {
        title: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: true },
        image: { type: DataTypes.STRING, allowNull: false },
        date: { type: DataTypes.DATEONLY, allowNull: false },
        time: { type: DataTypes.TIME, allowNull: false },
        price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }, // Optional price for paid events
        isPublic: { type: DataTypes.BOOLEAN, defaultValue: true } // Public or private event
    });

    return Event;
};
