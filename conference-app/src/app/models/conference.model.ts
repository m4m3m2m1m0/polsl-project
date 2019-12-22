
export interface Address {
    country: string;
    city: string;
    street: string;
    householdNumber: string;
    postalCode: string;
}

export interface PriceRange {
    lowest: string;
    highest: string;
    currency: string;
}

export interface Conference {
    id: string;
    category?: string;
    startDate?: string;
    endDate?: string;
    name?: string;
    description?: string;
    priceRange?: PriceRange;
    city?: string;
    hashtags?: string[];
    address: Address;
}
