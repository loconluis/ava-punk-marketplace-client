interface IPunkCardProps {
  image: string;
  name: string;
}

const PunkCard = ({ image, name }: IPunkCardProps) => {
  return (
    <div className="flex flex-col border rounded shadow dark:border-gray-700 justify-center items-center">
      <div>
        <img
          className="h-80"
          src={image || "https://avataaars.io/"}
          alt="Italian Trulli"
        />
      </div>
      <div>
        <p className="p-4 text-center ">{name}</p>
      </div>
    </div>
  );
};

export default PunkCard;
