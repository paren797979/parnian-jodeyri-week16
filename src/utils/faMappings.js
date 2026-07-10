export const CITY_MAP = {
  tehran: "تهران",
  sananndaj: "سنندج",
  sulaymaniyah: "سلیمانیه",
  isfahan: "اصفهان",
  shiraz: "شیراز",
  mashhad: "مشهد",
  tabriz: "تبریز",
  hewler: "هولر",
  mazandaran: "مازندران",
  italy: "ایتالیا",
  madrid: "مادرید",
  offroad: "آفرود",
};

export const origin_cities = ["tehran", "sananndaj", "isfahan"];

export const destination_cities = [
  "sulaymaniyah",
  "shiraz",
  "mashhad",
  "tabriz",
  "hewler",
  "mazandaran",
  "italy",
  "madrid",
  "offroad",
];

export const VEHICLE_MAP = {
  airplane: "هواپیما",
  bus: "اتوبوس",
  train: "قطار",
  van: "ون",
  car: "خودرو",
  suv: "شاسی‌بلند",
  ship: "کشتی",
};


export function normalizeCityForRoute(city) {
  if (!city) return "";
  const cleanCity = String(city).trim().toLowerCase();
  return cleanCity[0] ? cleanCity[0].toUpperCase() + cleanCity.slice(1) : "";
}


export function getPersianCity(city) {
  if (!city) return "نامشخص";
  const cleanCity = String(city).toLowerCase().trim();
  return CITY_MAP[cleanCity] || city;
}

export function getPersianVehicle(vehicle) {
  if (!vehicle) return "هواپیما";
  const cleanVehicle = String(vehicle).toLowerCase().trim();
  return VEHICLE_MAP[cleanVehicle] || vehicle;
}

export function toPersianDate(dateString) {
  if (!dateString) return "تاریخ ثبت نشده";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fa-IR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  } catch (e) {
    return dateString;
  }
}

export function getTourStatus(startDateString, endDateString) {
  if (!startDateString || !endDateString) return "نامشخص";

  try {
    const now = new Date();
    const start = new Date(startDateString);
    const end = new Date(endDateString);

    if (now < start) {
      return "در انتظار برگزاری";
    } else if (now >= start && now <= end) {
      return "در حال برگزاری";
    } else {
      return "به اتمام رسیده";
    }
  } catch (e) {
    return "به اتمام رسیده";
  }
}

export function toPersianNumber(value) {
  if (value === null || value === undefined) return "";
  return String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
}
