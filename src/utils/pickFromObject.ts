export function pickFromObject(obj: object, property: string) {
  return obj[property as keyof typeof obj]
}
