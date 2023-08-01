import Image from "next/image";

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const imgSrc = "/Frame.svg";
  let stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(
      <Image src={imgSrc} height={23} width={23} alt="a star in a rating" />
    );
  }
  return <div>{stars}</div>;
};

export default StarRating;
