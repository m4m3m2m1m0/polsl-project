
export interface Address {
    country: string;
    city: string;
    street: string;
    householdNumber: string;
    postalCode: string;
    latitude: string;
    longitude: string;
}

export interface Contact {
    url: string;
    email: string;
    phone: string;
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
    hashtags?: string[];
    address?: Address;
    contact?: Contact
}
