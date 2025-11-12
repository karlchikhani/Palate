// components/BranchCard.tsx
import Link from "next/link";
import { MapPin, Star, Clock, DollarSign } from "lucide-react";

interface BranchCardProps {
    branch: {
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
    };
}

export default function BranchCard({ branch }: BranchCardProps) {
    const { branchId, city, area, restaurant, cuisines, reviews } = branch;

    // Calculate average rating
    const averageRating =
        reviews.length > 0
            ? (
                  reviews.reduce((sum, review) => sum + review.rating, 0) /
                  reviews.length
              ).toFixed(1)
            : null;

    // Get cuisine names
    const cuisineNames = cuisines.map((bc) => bc.cuisine.name).join(", ");

    // Format opening hours
    const formatTime = (date: Date | null) => {
        if (!date) return null;
        return new Date(date).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    };

    const openingHours =
        restaurant.openingTime && restaurant.closingTime
            ? `${formatTime(restaurant.openingTime)} - ${formatTime(
                  restaurant.closingTime
              )}`
            : null;

    // Generate placeholder image based on restaurant name
    const getPlaceholderImage = (name: string) => {
        const colors = [
            "f97316",
            "ef4444",
            "ec4899",
            "8b5cf6",
            "6366f1",
            "3b82f6",
        ];
        const colorIndex = name.length % colors.length;
        return `https://placehold.co/600x400/${
            colors[colorIndex]
        }/white?text=${encodeURIComponent(name)}`;
    };

    const isOpen = restaurant.status === "open";

    return (
        <Link
            href={`/restaurant/${branch.restaurantId}/branch/${branchId}`}
            className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
        >
            {/* Image Section */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-orange-400 to-red-500">
                <img
                    src={getPlaceholderImage(restaurant.name)}
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Status Badge */}
                <div
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${
                        isOpen
                            ? "bg-green-500 text-white"
                            : "bg-gray-500 text-white"
                    }`}
                >
                    {isOpen ? "Open" : "Closed"}
                </div>

                {/* Rating Badge */}
                {averageRating && (
                    <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-bold text-gray-800">
                            {averageRating}
                        </span>
                        <span className="text-xs text-gray-500">
                            ({reviews.length})
                        </span>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-grow">
                {/* Restaurant Name */}
                <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-orange-600 transition-colors line-clamp-1">
                    {restaurant.name}
                </h3>

                {/* Cuisine Type */}
                {cuisineNames && (
                    <p className="text-sm text-orange-600 font-medium mb-3">
                        {cuisineNames}
                    </p>
                )}

                {/* Description */}
                {restaurant.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {restaurant.description}
                    </p>
                )}

                {/* Details Grid */}
                <div className="space-y-2 mb-4 flex-grow">
                    {/* Location */}
                    <div className="flex items-start gap-2 text-gray-700">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-orange-500" />
                        <div className="text-sm">
                            <span className="font-medium">{area}</span>
                            <span className="text-gray-500"> • {city}</span>
                        </div>
                    </div>

                    {/* Opening Hours */}
                    {openingHours && (
                        <div className="flex items-center gap-2 text-gray-700">
                            <Clock className="w-4 h-4 flex-shrink-0 text-orange-500" />
                            <span className="text-sm">{openingHours}</span>
                        </div>
                    )}

                    {/* Price Range */}
                    {restaurant.priceRange && (
                        <div className="flex items-center gap-2 text-gray-700">
                            <DollarSign className="w-4 h-4 flex-shrink-0 text-orange-500" />
                            <span className="text-sm font-medium">
                                {restaurant.priceRange}
                            </span>
                        </div>
                    )}
                </div>

                {/* Book Now Button */}
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors shadow-md hover:shadow-lg">
                    Book Now
                </button>
            </div>
        </Link>
    );
}
