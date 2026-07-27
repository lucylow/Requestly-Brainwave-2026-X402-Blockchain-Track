import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(6)}`;
}

export function formatAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 10)}...${address.slice(-6)}`;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    PENDING: 'text-yellow-400',
    CONFIRMED: 'text-green-400',
    FAILED: 'text-red-400',
    REVERTED: 'text-orange-400',
  };
  return colors[status] || 'text-gray-400';
}

export function getStatusBadgeVariant(status: string): string {
  const variants: Record<string, string> = {
    PENDING: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20',
    CONFIRMED: 'bg-green-500/20 text-green-400 border-green-500/20',
    FAILED: 'bg-red-500/20 text-red-400 border-red-500/20',
    REVERTED: 'bg-orange-500/20 text-orange-400 border-orange-500/20',
  };
  return variants[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/20';
}