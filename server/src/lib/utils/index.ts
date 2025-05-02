export function generateTransactionRef() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const length = 10;
  let ref = 'REF-';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    ref += characters.charAt(randomIndex);
  }
  return `${ref}-${Date.now()}`;
}
