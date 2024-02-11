export const timestampToString = (timestamp) => {
  
  const timezone = 'en-US';
  const dateOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  };

  const date = new Date(timestamp);
  return date.toLocaleDateString(timezone, dateOptions);
}

export const truncateText = (text = '', maxLength = 50) => {
  var shortText = text.substring(0, maxLength);

  if (shortText.length > 0 && shortText.length < text.length)
    shortText += '...';

    return shortText;
}