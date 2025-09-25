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
    "campaign",
    {
      id: { type: "int", primaryKey: true, autoIncrement: true },
      title: { type: "string", notNull: true, length: 255 },
      location: { type: "string", notNull: true, length: 255 },
      image: { type: "text", notNull: true },
      description: { type: "text", notNull: true },
      amount: { type: "bigint", notNull: true, defaultValue: 0 },
      expired_date: { type: "date", notNull: true },
      status: { type: "enum", value: ["open", "close"], defaultValue: "open" },
      category_id: {
        type: "int",
        notNull: true,
        foreignKey: {
          table: "category",
          mapping: "id",
        },
      },
      user_id: {
        type: "int",
        notNull: true,
        foreignKey: {
          table: "users",
          mapping: "id",
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
