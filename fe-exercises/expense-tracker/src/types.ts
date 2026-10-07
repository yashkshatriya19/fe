export interface Transaction {
    id: number;
    title:string;
    amount:number;
    category:"food"|"travel"|"shopping"|"bills"|"salary";
    date:string;
    payment:"cash"|"card"|"upi";
    notes?:string;
}