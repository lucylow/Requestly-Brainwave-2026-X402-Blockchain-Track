import { HTTPFacilitatorClient } from '@x402/avm/server';
import { ExactAvmFacilitator } from '@x402/avm';
import { ENV } from '../env';

// Create the HTTP facilitator client
const facilitatorClient = new HTTPFacilitatorClient({
  url: ENV.facilitatorUrl, // https://facilitator.goplausible.xyz
});

// Create the Algorand facilitator for verification and settlement
export const facilitator = new ExactAvmFacilitator(facilitatorClient);

// Helper function to verify payment
export async function verifyPayment(paymentProof: string) {
  try {
    const result = await facilitator.verify(paymentProof);
    return { valid: true, data: result };
  } catch (error: any) {
    return { valid: false, error: error.message };
  }
}

// Helper function to settle payment
export async function settlePayment(paymentProof: string) {
  try {
    const receipt = await facilitator.settle(paymentProof);
    return { success: true, receipt };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
