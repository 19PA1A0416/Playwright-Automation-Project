export type Customer = {
  firstName: string;
  lastName: string;
  postalCode: string;
};

export const customer: Customer = {
  firstName: 'Alex',
  lastName: 'Rivera',
  postalCode: '10001',
};

export const checkoutErrors = {
  firstNameRequired: 'Error: First Name is required',
} as const;
