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
  imageUrl: string;         
  pricePerHour: number;      
  location: string;          
  isDeleted?: boolean;       
  createdAt: string;         
  updatedAt: string;        
};
export type TBooking = {
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
  user: TUsers ;  
  facility: TFacility ; 
  payableAmount: number;
  isBooked: "confirmed" | "canceled";
  createdAt: string;
  updatedAt: string;
};



