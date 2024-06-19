import { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLString, GraphQLInt, GraphQLList } from "graphql";
import User from "../models/User";
import Business from "../models/Business";
import Review from "../models/Review";
import Admin from "../models/Admin";

// GraphQL Types

const UserType: GraphQLObjectType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        createdAt: { type: GraphQLString }
    })
});

const BusinessType: GraphQLObjectType = new GraphQLObjectType({
    name: "Business",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        location: { type: GraphQLString },
        industry: { type: GraphQLString }
    })
});

const ReviewType: GraphQLObjectType = new GraphQLObjectType({
    name: "Review",
    fields: () => ({
        id: { type: GraphQLID },
        user: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.user);
            }
        },
        business: {
            type: BusinessType,
            resolve(parent, args) {
                return Business.findById(parent.business);
            }
        },
        rating: { type: GraphQLInt },
        comment: { type: GraphQLString },
        date: { type: GraphQLString }
    })
});

const AdminType: GraphQLObjectType = new GraphQLObjectType({
    name: "Admin",
    fields: () => ({
        id: { type: GraphQLID },
        fname: { type: GraphQLString },
        lname: { type: GraphQLString },
        email: { type: GraphQLString },
        createdAt: { type: GraphQLString }
    })
});

// Root Query

const RootQuery: GraphQLObjectType = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return User.findById(args.id);
            }
        },
        business: {
            type: BusinessType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Business.findById(args.id);
            }
        },
        review: {
            type: ReviewType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Review.findById(args.id);
            }
        },
        reviews: {
            type: new GraphQLList(ReviewType),
            resolve(parent, args) {
                return Review.find({});
            }
        },
        admin: {
            type: AdminType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Admin.findById(args.id);
            }
        }
    }
});

// Mutations

const Mutation: GraphQLObjectType = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parent, args) {
                const user = new User({
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
                name: { type: GraphQLString },
                location: { type: GraphQLString },
                industry: { type: GraphQLString }
            },
            resolve(parent, args) {
                const business = new Business({
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
                userId: { type: GraphQLID },
                businessId: { type: GraphQLID },
                rating: { type: GraphQLInt },
                comment: { type: GraphQLString }
            },
            resolve(parent, args) {
                const review = new Review({
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
                fname: { type: GraphQLString },
                lname: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parent, args) {
                const admin = new Admin({
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

export default new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
