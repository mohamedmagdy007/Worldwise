import { useNavigate, useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useEffect } from "react";
import { useCities } from "../../contexts/CitiesContext";
import Spinner from "../Spinner/Spinner";
import Button from "../Button/Button";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  // TEMP DATA
  const navigate = useNavigate();
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCities();
  const { cityName, emoji, date, notes } = currentCity;
  useEffect(() => {
    if (id) {
      getCity(id);
    }
  }, [getCity, id]);

  if (isLoading) return <Spinner />;
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>
      <Button
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
        type="back"
      >
        &larr; Back
      </Button>
      {/* <div><ButtonBack /></div> */}
    </div>
  );
}

export default City;
