export const formattedAddress = (address: string) => {
  const truncAddress = `${address.slice(0, 4)}...${address.slice(-4)}`;
  return truncAddress;
};

export const getRandomNumber = (min: number, max: number) => {
  const value = Math.random() * (max - min) + min;
  return Math.ceil(value);
};
