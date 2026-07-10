export const formatPrice = (price) => {
  if (!price) return "";

  return new Intl.NumberFormat("fa-IR").format(price);
};

export const formatDate = (date) => {
  if (!date) return "";

  return new Intl.DateTimeFormat("fa-IR").format(new Date(date));
};
