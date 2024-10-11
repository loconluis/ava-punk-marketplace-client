export const formattedAddress = (address: string) => {
  const truncAddress = `${address.slice(0, 4)}...${address.slice(-4)}`;
  return truncAddress;
};
