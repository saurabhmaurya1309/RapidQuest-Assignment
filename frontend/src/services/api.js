import axios from 'axios';

// const API_URL = 'http://localhost:5000/api';
const API_URL=  'https://rapidquest-assignment.onrender.com/api'
              


export const getCustomers = () => axios.get(`${API_URL}/customers`);
export const getNewCustomersOverTime = () => axios.get(`${API_URL}/customers/new-over-time`);
export const getRepeatCustomers = () => axios.get(`${API_URL}/customers/repeat-customers`);
export const getGeographicalDistribution = () => axios.get(`${API_URL}/customers/geographical-distribution`);
export const getCustomerLifetimeValueByCohorts = () => axios.get(`${API_URL}/customers/lifetime-value-by-cohorts`);

export const getOrders = () => axios.get(`${API_URL}/orders`);
export const getTotalSalesOverTime = () => axios.get(`${API_URL}/orders/sales-over-time`);
export const getSalesGrowthRateOverTime = () => axios.get(`${API_URL}/orders/sales-growth-rate`);

export const getProducts = () => axios.get(`${API_URL}/products`);
export const getProductsByType = (type) => axios.get(`${API_URL}/products/by-type`, { params: { type } });
export const getProductsByVendor = (vendor) => axios.get(`${API_URL}/products/by-vendor`, { params: { vendor } });
export const getProductById = (id) => axios.get(`${API_URL}/products/${id}`);
