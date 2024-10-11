export type SignatureObject = {
  messageHash: string;
  r: string;
  s: string;
  v: string;
};

export type SignTransactionResult = SignatureObject & {
  rawTransaction: string;
  transactionHash: string;
};
export type HexString = string;
export type Address = HexString;
export interface Transaction {
  from?: Address;
  data?: string;
  to?: Address | null;
}
