const isoTimeFormat = (dateTime) => {
  if (!dateTime) return "Invalid Time";

  try {
    const date = new Date(dateTime);

    if (isNaN(date.getTime())) return "Invalid Time";

    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return "Invalid Time";
  }
};

export default isoTimeFormat;