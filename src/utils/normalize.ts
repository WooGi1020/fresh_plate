function normalize(text: string | null | undefined): string {
  if (typeof text !== "string") return "";
  return text.toLowerCase().replace(/\s+/g, "");
}

export default normalize;
