import { describe, it, expect } from 'vitest';
import { toClientAvmSigner } from '@x402/avm';

describe('Algorand x402 Client', () => {
  it('should create a valid signer', () => {
    // Placeholder for a base64-encoded 64-byte private key
    const dummyPrivateKey = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=='; 
    const signer = toClientAvmSigner(dummyPrivateKey);
    expect(signer.address).toBeDefined();
    expect(typeof signer.signTransactions).toBe('function');
  });
});
