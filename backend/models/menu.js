module.exports = (Sequelize, DataTypes) => {
    const Menu = Sequelize.define("Menu", {
        category: { 
            type: DataTypes.STRING, 
            allowNull: false,
            validate: {
                isIn: [['Appetizers', 'Main Course', 'Desserts', 'Beverages', 'Electronics', 'Books']] // Updated categories
            }
        },
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: true },
        image: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        isAvailable: { type: DataTypes.BOOLEAN, defaultValue: true }
    });

    return Menu;
};
