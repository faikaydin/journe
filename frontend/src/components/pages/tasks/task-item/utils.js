export const stringToBoolean = (str) => {
  const lowerStr = str.toLowerCase();

  if (lowerStr === "true") {
    return true;
  } else if (lowerStr === "false") {
    return false;
  } else {
    return null;
  }
};
