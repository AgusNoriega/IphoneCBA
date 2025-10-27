import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

// Tipos en JS por JSDoc
/** @typedef {{id:number,name:string,brand:string,condition:'NUEVO'|'USADO',color?:string,storageGb?:number,priceUsd:number,stock:number,imageUrl?:string}} Product */
