import HeaderHome from "./components/HeaderHome";
import { prisma } from "../lib/prisma";
import BranchCard from "./components/BranchCard";

export interface IBranch {
    branchId: number;
    city: string;
    area: string;
    restaurantId: number;
    restaurant: {
        name: string;
        description: string | null;
        priceRange: string | null;
        openingTime: Date | null;
        closingTime: Date | null;
        status: string | null;
    };
    cuisines: Array<{
        cuisine: {
            name: string;
        };
    }>;
    reviews: Array<{
        rating: number;
    }>;
}

const fetchBranches = async (): Promise<IBranch[]> => {
    const branches = await prisma.branch.findMany({
        select: {
            branchId: true,
            city: true,
            area: true,
            restaurantId: true,
            restaurant: {
                select: {
                    name: true,
                    description: true,
                    priceRange: true,
                    openingTime: true,
                    closingTime: true,
                    status: true,
                },
            },
            cuisines: {
                select: {
                    cuisine: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
            reviews: {
                select: {
                    rating: true,
                },
            },
        },
    });
    return branches;
};

export default async function Home() {
    const branches = await fetchBranches();
    return (
        <main>
            <HeaderHome />
            <div className="grid grid-cols-fluid p-5 gap-5 ">
                {branches?.map((branch) => (
                    <BranchCard key={branch.branchId} branch={branch}/>
                ))}
            </div>
        </main>
    );
}
