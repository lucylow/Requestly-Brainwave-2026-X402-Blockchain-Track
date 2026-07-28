/**
 * Truncate an Algorand address for UI display.
 */
export function truncateAddress(address: string, start = 6, end = 6): string {
  if (!address) return "";
  if (address.length <= start + end) return address;
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

// Keep alias for compatibility during migration
export const truncatePublicKey = truncateAddress;
