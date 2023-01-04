export function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function isValidScreen(screen: string): boolean {
  switch (screen) {
    case 'movie':
      return false;
    case 'search':
      return false;
    default:
      return true;
  }
}
