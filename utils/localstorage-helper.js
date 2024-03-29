export const removeExpiredItemFromLocalStorage = () => {
  const hours = 24; // Reset localstorage when it is more than 24hours
  const now = new Date().getTime();
  const setupTime = localStorage.getItem("expireDuration");

  if (!setupTime) localStorage.setItem("expireDuration", now);
  if (setupTime && now - setupTime > hours * 60 * 60 * 1000) {
    localStorage.clear();
    localStorage.setItem("expireDuration", now);
  }
};
