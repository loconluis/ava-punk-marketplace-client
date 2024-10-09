export const formattedAddress = (address: string) => {
  const truncAddress = `${address.slice(0, 7)}...${address.slice(-5)}`;
  return truncAddress;
};
