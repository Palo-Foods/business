import React, { useEffect } from "react";
import StarRatings from "react-star-ratings";
import { update } from "../functions/PUT";

const RateProduct = ({ ratings, id }) => {
  const [ratings, setRating] = useState(0);

  //calculate average rating for each rating
  useEffect(() => {
    //total ratings
    const length = ratings.length;
    const total = ratings?.reduce((a, c) => a + c.star, 0); //add all ratings as total
    const highest = length * 5; //get the highest
    const result = (total * 5) / highest;
    if (result) {
      setRating(result);
    }
  }, [ratings]);

  const sendRating = async(star, productId) => {
    setRating(star);
    const data = {
      star,
      productId,
    };
    const url = '/api/v1.0.0/user/orders/rating/' + orderId + '/' + productId + '/';
    
    const response = await update(url, data);
    if (response === "success") {
      console.log("success");
    } else {
      console.log("failed");
    }
  };

  return (
    <div>
      <StarRatings
        name={id}
        numberOfStars={5}
        rating={ratings}
        changeRating={(newRating, name) => sendRating(newRating, name)}
        isSelectable={true}
        starRatedColor="red"
      />
    </div>
  );
};

export default RateProduct;
