import { getContract } from "../../web3";
import { SimpleStorage__factory } from "../../../typechain-types/factories/SimpleStorage__factory";

export const web3Resolvers = {
    Query: {
        getStorageValue: async () => {
            const contract = getContract(
                process.env.CONTRACT_ADDRESS!,
                SimpleStorage__factory.abi
            );
            const value = await contract.getValue();
            return { value: value.toString() };
        }
    },
    Mutation: {
        setStorageValue: async (_: any, { value }: { value: string }) => {
            const contract = getContract(
                process.env.CONTRACT_ADDRESS!,
                SimpleStorage__factory.abi
            );
            const tx = await contract.setValue(value);
            await tx.wait();
            return { value };
        }
    }
};