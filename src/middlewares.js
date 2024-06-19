"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_graphql_1 = require("express-graphql");
const schema_1 = __importDefault(require("./schema/schema"));
const graphqlMiddleware = (0, express_graphql_1.graphqlHTTP)({
    schema: schema_1.default,
    graphiql: true
});
exports.default = graphqlMiddleware;
