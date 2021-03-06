import { Migratable } from "./helpers/Migrator";

const migration: Migratable = {
  version: "3.1.6",
  up: async (connection, datatypes, op) => {
    const transaction = await connection.transaction();
    try {
      const queryInterface = connection.getQueryInterface();

      /* Add "nitroBoost" Column To "Donator" */
      await queryInterface.addColumn(
        "Donator",
        "nitroBoost",
        {
          defaultValue: false,
          allowNull: false,
          type: datatypes.BOOLEAN
        },
        { transaction }
      );

      /* Add "nitroBoostInformed" Column To "Donator" */
      await queryInterface.addColumn(
        "Donator",
        "nitroBoostInformed",
        {
          defaultValue: false,
          allowNull: false,
          type: datatypes.BOOLEAN
        },
        { transaction }
      );

      /* Commit Transaction */
      await transaction.commit();
    } catch (error) {
      console.error("Error in migration, rolling back...");
      await transaction.rollback();
      throw error;
    }
  },
  down: async (connection, datatypes, op) => {
    const transaction = await connection.transaction();
    try {
      const queryInterface = connection.getQueryInterface();

      /* Remove "nitroBoost" Column From "Donator" */
      await queryInterface.removeColumn("Donator", "nitroBoost", {
        transaction
      });

      /* Remove "nitroBoostInformed" Column From "Donator" */
      await queryInterface.removeColumn("Donator", "nitroBoostInformed", {
        transaction
      });

      /* Commit Transaction */
      await transaction.commit();
    } catch (error) {
      console.error("Error in migration, rolling back...");
      await transaction.rollback();
      throw error;
    }
  }
};

export default migration;
