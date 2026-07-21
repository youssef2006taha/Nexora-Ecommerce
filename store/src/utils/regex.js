export const regex = {
  username: /^(?=.{3,20}$)[a-zA-Z0-9]+(?:[._][a-zA-Z0-9]+)*$/,

  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  password: /^\S{6,}$/,

  phone: /^(01)[0-9]{9}$/,
};
