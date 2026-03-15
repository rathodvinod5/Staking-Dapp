export function parseAnchorError(error: any): string {
  // If it's a known anchor error, try to extract the custom message
  if (error?.message) {
    if (error.message.includes("custom program error: 0x")) {
      // 0x... is the hex code of the Anchor custom error
      // In a real app we'd map this to IDL errors
      return "Transaction failed: Custom Program Error. Please try again.";
    }

    if (error.message.includes("User rejected the request")) {
      return "Transaction cancelled by user.";
    }

    if (error.message.includes("insufficient lamports")) {
      return "Insufficient SOL for gas/transaction fees.";
    }

    return error.message;
  }

  // Fallback
  return "An unexpected error occurred.";
}

export function formatLamports(lamports: number, decimals: number = 9): string {
  return (lamports / Math.pow(10, decimals)).toFixed(2);
}

export function shortenAddress(
  address: string | undefined | null,
  chars = 4
): string {
  if (!address) return "";
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}
