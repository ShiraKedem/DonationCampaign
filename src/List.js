import OneDonation from "./OneDonation";
import "./NavBar.css";
import { useContext } from "react";
import { RateContext } from "./App";
// פונקציה שבודקת לי אם עכשיו המשתמש על דולר או על שקלים
export const fromShekelToX = (sumInShekel, dollarRate, toCoin) => {
  if (toCoin === "shekel") {
    return "₪" + Math.floor(sumInShekel);
  } else if (toCoin === "dollar") {
    let x = Math.floor(sumInShekel / dollarRate);
    return "$" + x;
  }
};

const List1 = (props) => {
  let sum = 0;
  let target = 100000;
  // מקבל את שער הדולר ועל איזה מצב הוא
  let rate = useContext(RateContext);
  return (
    <div className="center">
      {/* סוכם את כל התרומות */}
      {props.arr.map((item) => {
        sum += item.sum;
        return <p key={item.id}></p>;
      })}

      <div className="sum1">
        <h2>
          {" "}
          <span> {fromShekelToX(target, rate.dollar, rate.currentCoin)}</span>
        </h2>
        <p>
          {" "}
          <span> יעד</span>
        </p>
      </div>
      <div className="sum2">
        <h2>
          {" "}
          <span> {Math.floor((sum / target) * 100)}% </span>
        </h2>
        <p>
          {" "}
          <span> אחוז התרומות</span>
        </p>
      </div>
      <div className="sum3">
        <h2>
          {" "}
          <span>{fromShekelToX(sum, rate.dollar, rate.currentCoin)}</span>
        </h2>
        <p>
          {" "}
          <span>סך התרומות</span>
        </p>
      </div>
      <div className="sum4">
        <h2>
          {" "}
          <span> {props.arr.length}</span>
        </h2>
        <p>
          {" "}
          <span> :מספר התורמים</span>
        </p>
      </div>
    </div>
  );
};

export default List1;
