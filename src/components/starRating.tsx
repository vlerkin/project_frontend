import Image from "next/image";

interface StarRatingProps {
  rating: number;
  height: number;
  width: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, height, width }) => {
  const imgSrc = "/Frame.svg";
  let stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(
      <Image
        src={imgSrc}
        height={height}
        width={width}
        alt="a star in a rating"
      />
    );
  }
  return <div>{stars}</div>;
};

export default StarRating;
