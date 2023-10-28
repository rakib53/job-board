import React from "react";
import styles from "../../components/SimilarJob/SimilarJobCard.module.css";

const SimilarJobCard = () => {
  return (
    <div className={styles.similarJobCard}>
      <div className={styles.header}>
        <div>
          <h4>Lead Visual Designer</h4>
          <p>San Fransisco, US</p>
        </div>
        <div className={styles.saveBtn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M12.615 1.5H5.38499C3.78749 1.5 2.48999 2.805 2.48999 4.395V14.9625C2.48999 16.3125 3.45749 16.8825 4.64249 16.23L8.30249 14.1975C8.69249 13.98 9.32249 13.98 9.70499 14.1975L13.365 16.23C14.55 16.89 15.5175 16.32 15.5175 14.9625V4.395C15.51 2.805 14.2125 1.5 12.615 1.5ZM11.2575 7.3125C10.53 7.575 9.76499 7.71 8.99999 7.71C8.23499 7.71 7.46999 7.575 6.74249 7.3125C6.44999 7.2075 6.29999 6.885 6.40499 6.5925C6.51749 6.3 6.83999 6.15 7.13249 6.255C8.33999 6.69 9.66749 6.69 10.875 6.255C11.1675 6.15 11.49 6.3 11.595 6.5925C11.7 6.885 11.55 7.2075 11.2575 7.3125Z"
              fill="#92929D"
              fill-opacity="0.7"
            />
          </svg>
        </div>
      </div>
      <div className={styles.footer}>
        <p>$19</p>
        <div>
          <button className={styles.viewBtn}>View</button>
        </div>
      </div>
    </div>
  );
};

export default SimilarJobCard;
