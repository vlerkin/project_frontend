import Image from "next/image";

interface ServeIconProps {
  serves: number;
}

const ServeIcon: React.FC<ServeIconProps> = ({ serves }) => {
  const imgSrc = "/Serves_Icons.svg";
  let serve = [];
  for (let i = 0; i < serves; i++) {
    serve.push(
      <Image src={imgSrc} height={19.5} width={14.998} alt="a serve icon" />
    );
  }
  return <div>{serve}</div>;
};

export default ServeIcon;
