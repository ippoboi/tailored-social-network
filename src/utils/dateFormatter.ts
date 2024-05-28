export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-GB", options);

  const day = date.getDate();
  const daySuffix = (day: any) => {
    if (day > 3 && day < 21) return "th"; // 4th - 20th
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${daySuffix(day)} ${formattedDate.split(" ")[1]} ${
    formattedDate.split(" ")[2]
  }`;
}
