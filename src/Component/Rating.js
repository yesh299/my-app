export const Rating = ({ rating, numReviews }) => {
  return (
    <span>
      {[...Array(5)].map((_, idx) => {
        const starValue = idx + 1;
        return (
          <i
            key={idx}
            className={
              starValue <= rating
                ? "bi bi-star-fill text-warning"
                : starValue - rating < 1
                ? "bi bi-star-half text-warning"
                : "bi bi-star text-warning"
            }
          ></i>
        );
      })}
      {numReviews && <span className="ms-1">({numReviews})</span>}
    </span>
  );
};
