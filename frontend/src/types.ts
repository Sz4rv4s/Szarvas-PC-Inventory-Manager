export interface Part {
    id: number;
    model: string;
    brand: string;
    price: number;
}

export interface Warehouse {
    id: number;
    name: string;
    city: string;
    address: string;
    capacity: number;
}

export interface UpdatedPart {
    model: string;
    brand: string;
    price: number;
    warehouseId: number;
}