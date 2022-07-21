export function bit(position: number) {
  return 1 << position;
}

export function firstUpperCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}