"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.createTable(
    "donation",
    {
      id: { type: "int", primaryKey: true, autoIncrement: true },
      name: { type: "string", notNull: true },
      message: { type: "string", notNull: false },
      status_payment: { type: "string", notNull: true },
      donation: { type: "bigint", notNull: true },
      user_id: {
        type: "int",
        notNull: true,
        foreignKey: {
          name: "donation_users_fk",
          table: "users",
          mapping: "id",
          rules: {
            onDelete: "CASCADE",
            onUpdate: "RESTRICT",
          },
        },
      },
      campaign_id: {
        type: "int",
        notNull: true,
        foreignKey: {
          name: "donation_campaign_fk",
          table: "campaign",
          mapping: "id",
          rules: {
            onDelete: "CASCADE",
            onUpdate: "RESTRICT",
          },
        },
      },
    },
    callback
  );
};

exports.down = function (db) {
  return null;
};

exports._meta = {
  version: 1,
};
