function normalize(text: string | null | undefined): string {
  if (typeof text !== "string") return "";
  return text
    .normalize("NFC")
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^가-힣a-z0-9]/g, "");
}

export default normalize;
