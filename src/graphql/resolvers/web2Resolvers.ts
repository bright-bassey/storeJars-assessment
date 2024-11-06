import { User } from "../../models/userModel";

export const web2Resolvers = {
    Query: {
        users: async () => {
            return await User.find();
        },
        user: async (_: any, { id }: { id: string }) => {
            return await User.findById(id);
        }
    },
    Mutation: {
        createUser: async (_: any, { address, username }: { address: string, username: string }) => {
            const user = new User({ address, username });
            return await user.save();
        }
    }
};