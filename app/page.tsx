// import HeaderHome from "./components/HeaderHome";
// import RestaurantCard from "./components/RestaurantCard";
// import { Cuisine, Location, PRICE, PrismaClient, Review } from "@prisma/client";
import prisma from "../prisma.config";
import HeaderHome from "./components/HeaderHome";
export interface IBranch {
    


}
const fetchRestaurants = async (): Promise<IBranch[]> => {
    const restaurants = await prisma.Branch.findMany({
        select: {
            branchId: true,
            city: true,
            area: true,
            restaurantId: true,
            
        },
    });
    return restaurants;

};
export default /*async*/ function Home() {
    // const restaurants = await fetchRestaurants();
    return (
        <main>
            <HeaderHome />
            {/* <div className="grid grid-cols-fluid p-5 gap-5 ">
                {restaurants?.map((restaurant) => (
                    <RestaurantCard
                        restaurant={restaurant}
                        key={restaurant.id}
                    />
                ))}
            </div> */}
        </main>
    );
}
