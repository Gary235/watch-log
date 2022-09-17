
const buildMessage = (amount, type, isPlural) =>
  `updated ${
    !isPlural ? type === 'hour' ? 'an' : 'a' : ''
  } ${
    isPlural ? amount : ''
  } ${
    type
  }${
    isPlural ? 's' : ''
  } ago`;

const getParsedTime = (pastDateMili) => {
  const now = Date.now();
  const diff = now - pastDateMili;

  if (isNaN(diff)) return;

  const diffInSeconds = Math.floor(diff / 1000);
  if (diffInSeconds <= 60) return "updated a few moments ago";

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes <= 60) return buildMessage(diffInMinutes, 'minute', diffInMinutes > 1);

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours <= 24) return buildMessage(diffInHours, 'hour', diffInHours > 1);

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays <= 7) return buildMessage(diffInDays, 'day', diffInDays > 1);

  const diffInWeeks = Math.floor(diffInDays / 7);
  return buildMessage(diffInWeeks, 'week', diffInWeeks > 1);
}

export default getParsedTime
