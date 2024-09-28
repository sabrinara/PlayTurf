
export type TUsers = {
  _id: string;
  name: string;
  email: string;
  imageUrl: string;
  phone: string;
  role: "admin" | "user";
  address: string;
  createdAt: string;
  updatedAt: string;
};


export type TFacility = {
  _id: string;               
  name: string;            
  description: string;       
  imageUrl?: string;         
  pricePerHour: number;      
  location: string;          
  isDeleted?: boolean;       
  createdAt: string;         
  updatedAt: string;        
};
