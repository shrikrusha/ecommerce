export interface Address {
    addLine1: string;
    addLine2: string;
    city: string;
    state: string;
    zipCode: string;
  }
  
  export interface User {
    name: string;
    mobNumber: string;
    age: number;
    dob: string;
    email: string;
    password: string;
    address: Address;
    language: string;
    gender: string;
    aboutYou: string;
    uploadPhoto: string;
    agreetc: boolean;
    role: string;
    id: number;
  }

  export interface Product {
    id: number;
    name: string;
    uploadPhoto: string;
    productDescription: string;
    mrp: string;
    dp: string;
    status: string;
  }
  
  export interface DeliveryAddress {
    id: number;
    addLine1: string;
    addLine2: string;
    city: string;
    state: string;
    zipCode: string;
  }
  
  export interface Order {
    id: number;
    userId: number;
    sellerId: number;
    product: Product;
    deliveryAddress: DeliveryAddress;
    contact: string;
    dateTime: string;
  }
  
  