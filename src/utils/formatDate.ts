// utils/formatDate.js
import { formatDistanceToNow } from "date-fns";

export const formatRelativeTime = (dateString: any) => {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
};
