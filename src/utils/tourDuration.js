export function getTourDuration(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  const nights = days - 1;

  return `${days} روز و ${nights} شب`;
}
