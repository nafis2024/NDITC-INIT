module.exports = (sequelize, DataTypes) => {
  const ParEvents = sequelize.define('parevents', {
    eventInfo: {
      type: DataTypes.TEXT,
      defaultValue: '{}',
    },
    clientQR: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    teamName: {
      type: DataTypes.TEXT,
      defaultValue: '{}',
    },
    paidEvent: {
      type: DataTypes.TEXT,
      defaultValue: '{}',
    },
    fee: {
      type: DataTypes.TEXT,
      defaultValue: '{}',
    },
    transactionID: {
      type: DataTypes.TEXT,
      defaultValue: '{}',
    },
    SubLinks: {
      type: DataTypes.TEXT,
      defaultValue: '{}',
    },
    SubNames: {
      type: DataTypes.TEXT,
      defaultValue: '{}',
    },
    transactionNum: {
      type: DataTypes.TEXT,
      defaultValue: '{}',
    },
    roll_no: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    // New column to link CA
    CAId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'cas',
        key: 'id',
      },
    },
  });

  ParEvents.associate = (models) => {
    ParEvents.belongsTo(models.CAs, {
      foreignKey: 'CAId',
      as: 'CA',
    });
  };

  return ParEvents;
};