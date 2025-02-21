function getLocalstorageItem<T>(key: string, defaultValue: T) {
  if (typeof window === "undefined") return defaultValue;
  const stored = localStorage.getItem(key);
  if (!stored) return defaultValue;
  return typeof defaultValue !== "string" ? JSON.parse(stored) : stored;
}
export default getLocalstorageItem;
