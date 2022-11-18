const week = [
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
];

const month = new Date().getMonth();

const date = new Date().getDate();

const day = new Date().getDay();

export const deliveryDate = `${week[day]} ${month}/${date} 까지 도착 보장`;
