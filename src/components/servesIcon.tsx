import Image from "next/image";

interface ServeIconProps {
  serves: number;
  height: number;
  width: number;
}

const ServeIcon: React.FC<ServeIconProps> = ({ serves, height, width }) => {
  const imgSrc = "/Serves_Icons.svg";
  let serve = [];
  for (let i = 0; i < serves; i++) {
    serve.push(
      <Image src={imgSrc} height={height} width={width} alt="a serve icon" />
    );
  }
  return <div>{serve}</div>;
};

export default ServeIcon;
