
export class Address {
    country: string;
    city: string;
    street: string;
    householdNumber: string;
    postalCode: string;
    latitude: string;
    longitude: string;
}

export class Contact {
    url: string;
    email: string;
    phone: string;
}

export class PriceRange {
    lowest: string;
    highest: string;
    currency: string;
}

export class Conference {
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
