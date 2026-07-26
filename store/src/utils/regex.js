export const regex = {
  username: /^(?=.{3,20}$)[a-zA-Z0-9]+(?:[._][a-zA-Z0-9]+)*$/,

  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  password: /^\S{6,}$/,

  phone: /^(01)[0-9]{9}$/,

  country: /^[a-zA-Z\s]{2,30}$/,

  city: /^[a-zA-Z\s]{2,30}$/,

  street: /^[a-zA-Z0-9\s,.-]{3,100}$/,

  building: /^[a-zA-Z0-9\s-]{1,20}$/,

  postalCode: /^[0-9]{4,10}$/,
};
