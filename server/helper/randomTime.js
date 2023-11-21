function getRandomUnixTimestampInSameDay() {
  // Get the current date
  const currentDate = new Date();

  // Set hours, minutes, and seconds to random values
  const randomHours = Math.floor(Math.random() * 24); // 0 to 23
  const randomMinutes = Math.floor(Math.random() * 60); // 0 to 59
  const randomSeconds = Math.floor(Math.random() * 60); // 0 to 59

  // Set the time with random values
  currentDate.setHours(randomHours, randomMinutes, randomSeconds);

  // Return the Unix timestamp in milliseconds
  return Math.floor(currentDate.getTime() / 1000);
}

export default getRandomUnixTimestampInSameDay;
