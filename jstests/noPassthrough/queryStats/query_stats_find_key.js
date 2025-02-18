/**
 * This test confirms that query stats store key fields for a find command are properly nested and
 * none are missing.
 * @tags: [requires_fcv_71]
 */
import {runCommandAndValidateQueryStats} from "jstests/libs/query_stats_utils.js";

let findCommandObj = {
    find: jsTestName(),
    filter: {v: {$eq: 2}},
    oplogReplay: true,
    comment: "this is a test!!",
    min: {"v": 0},
    max: {"v": 4},
    hint: {"v": 1},
    sort: {a: -1},
    returnKey: false,
    noCursorTimeout: true,
    showRecordId: false,
    tailable: false,
    awaitData: false,
    allowPartialResults: true,
    skip: 1,
    limit: 2,
    maxTimeMS: 500,
    collation: {locale: "en_US", strength: 2},
    allowDiskUse: true,
    readConcern: {level: "local"},
    batchSize: 2,
    singleBatch: true,
    let : {},
    projection: {_id: 0},
    apiDeprecationErrors: false,
    apiVersion: "1",
    apiStrict: false,
};

const queryShapeFindFields = [
    "cmdNs",
    "command",
    "filter",
    "sort",
    "projection",
    "skip",
    "limit",
    "singleBatch",
    "max",
    "min",
    "returnKey",
    "showRecordId",
    "tailable",
    "oplogReplay",
    "awaitData",
    "collation",
    "allowDiskUse",
    "let"
];

// The outer fields not nested inside queryShape.
const findKeyFields = [
    "queryShape",
    "batchSize",
    "comment",
    "maxTimeMS",
    "noCursorTimeout",
    "readConcern",
    "allowPartialResults",
    "apiDeprecationErrors",
    "apiVersion",
    "apiStrict",
    "collectionType",
    "client",
    "hint"
];

runCommandAndValidateQueryStats({
    commandName: "find",
    commandObj: findCommandObj,
    shapeFields: queryShapeFindFields,
    keyFields: findKeyFields
});
