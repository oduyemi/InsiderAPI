"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const User_1 = __importDefault(require("../models/User"));
const Business_1 = __importDefault(require("../models/Business"));
const Review_1 = __importDefault(require("../models/Review"));
const Admin_1 = __importDefault(require("../models/Admin"));
// GraphQL Types
const UserType = new graphql_1.GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        firstName: { type: graphql_1.GraphQLString },
        lastName: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        createdAt: { type: graphql_1.GraphQLString }
    })
});
const BusinessType = new graphql_1.GraphQLObjectType({
    name: "Business",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        location: { type: graphql_1.GraphQLString },
        industry: { type: graphql_1.GraphQLString }
    })
});
const ReviewType = new graphql_1.GraphQLObjectType({
    name: "Review",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        user: {
            type: UserType,
            resolve(parent, args) {
                return User_1.default.findById(parent.user);
            }
        },
        business: {
            type: BusinessType,
            resolve(parent, args) {
                return Business_1.default.findById(parent.business);
            }
        },
        rating: { type: graphql_1.GraphQLInt },
        comment: { type: graphql_1.GraphQLString },
        date: { type: graphql_1.GraphQLString }
    })
});
const AdminType = new graphql_1.GraphQLObjectType({
    name: "Admin",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        fname: { type: graphql_1.GraphQLString },
        lname: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        createdAt: { type: graphql_1.GraphQLString }
    })
});
// Root Query
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: {
            type: UserType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                return User_1.default.findById(args.id);
            }
        },
        business: {
            type: BusinessType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                return Business_1.default.findById(args.id);
            }
        },
        review: {
            type: ReviewType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                return Review_1.default.findById(args.id);
            }
        },
        reviews: {
            type: new graphql_1.GraphQLList(ReviewType),
            resolve(parent, args) {
                return Review_1.default.find({});
            }
        },
        admin: {
            type: AdminType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                return Admin_1.default.findById(args.id);
            }
        }
    }
});
// Mutations
const Mutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: { type: graphql_1.GraphQLString },
                lastName: { type: graphql_1.GraphQLString },
                email: { type: graphql_1.GraphQLString },
                password: { type: graphql_1.GraphQLString }
            },
            resolve(parent, args) {
                const user = new User_1.default({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    password: args.password
                });
                return user.save();
            }
        },
        addBusiness: {
            type: BusinessType,
            args: {
                name: { type: graphql_1.GraphQLString },
                location: { type: graphql_1.GraphQLString },
                industry: { type: graphql_1.GraphQLString }
            },
            resolve(parent, args) {
                const business = new Business_1.default({
                    name: args.name,
                    location: args.location,
                    industry: args.industry
                });
                return business.save();
            }
        },
        addReview: {
            type: ReviewType,
            args: {
                userId: { type: graphql_1.GraphQLID },
                businessId: { type: graphql_1.GraphQLID },
                rating: { type: graphql_1.GraphQLInt },
                comment: { type: graphql_1.GraphQLString }
            },
            resolve(parent, args) {
                const review = new Review_1.default({
                    user: args.userId,
                    business: args.businessId,
                    rating: args.rating,
                    comment: args.comment,
                    date: new Date()
                });
                return review.save();
            }
        },
        addAdmin: {
            type: AdminType,
            args: {
                fname: { type: graphql_1.GraphQLString },
                lname: { type: graphql_1.GraphQLString },
                email: { type: graphql_1.GraphQLString },
                password: { type: graphql_1.GraphQLString }
            },
            resolve(parent, args) {
                const admin = new Admin_1.default({
                    fname: args.fname,
                    lname: args.lname,
                    email: args.email,
                    password: args.password
                });
                return admin.save();
            }
        }
    }
});
exports.default = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
