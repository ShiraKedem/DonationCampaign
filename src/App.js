import logo from "./logo.svg";
import "./App.css";
import Donations from "./Donations";
import Form from "./Form";
import { Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import "./NavBar.css";
import { List } from "@mui/material";
import List1 from "./List";
import { useState } from "react";
import { createContext, useEffect } from "react";
import axios from "axios";

export const RateContext = createContext();

function App() {
  let [rate, setRate] = useState({ dollar: undefined, currentCoin: "shekel" });
  // כאשר לוחצים להמרה
  const changeCoin = () => {
    setRate({
      ...rate,
      currentCoin: rate.currentCoin == "dollar" ? "shekel" : "dollar",
    });
  };

  useEffect(() => {
    axios
      .get(
        "https://v6.exchangerate-api.com/v6/46828ba661dec8e8231606a5/latest/USD"
      )
      .then((res) => {
        setRate({ ...rate, dollar: res.data.conversion_rates.ILS });
      })
      .catch((err) => {
        //הודעה מתאימה אא להביא מהשרת...
      });
  }, []);

  // חישוב תאריכים
     function CalculateDate(date) {
    let x = new Date();
    if (date.toDateString() === x.toDateString()) {
      return "היום";
    }
    x = new Date().getFullYear() - date.getFullYear();
    if (x > 0) {
      if (x === 1) x = "שנה";
      else x = x + "שנים";
    } else if (x === 0) {
      x = new Date().getMonth() - date.getMonth();
      if (x >= 1) {
        if (x === 1) {
          x = "חודש";
        } else {
          x = x + "חודשים";
        }
      } else {
        x = new Date().getDay() - date.getDay();

        if (x >= 0) {
          if (x === 1) {
            x = "יום";
          } else {
            x = x + " ימים";
          }
        }
      }
    }
    return x;
  }
  // נתונים במערך
  let [donationsArr, setDonationsArr] = useState([
    {
      id: 323827493,
      name: "שירה קדם",
      sum: 2500,
      dedication: "תרומה לרפואה",
      datOfDonation: new Date(2023, 8, 26),
    },

    {
      id: 954,
      name: "מירי טולדנו",
      sum: 600,
      dedication: "לישועות",
      datOfDonation: new Date(2023, 7, 22),
    },
    {
      id: 6588,
      name: "תמר לוי",
      sum: 145,
      dedication: "לזכויות",
      datOfDonation: new Date(2023, 10, 1),
    },
    {
      id: 120,
      name: "נועה כהן ",
      sum: 700,
      dedication: "לישועות",
      datOfDonation: new Date(2023, 7, 22),
    },
    {
      id: 800,
      name: "אליה לוי ",
      sum: 630,
      dedication: "לישועות",
      datOfDonation: new Date(2023, 7, 22),
    },
    {
      id: 150,
      name: "שימי טולדנו",
      sum: 50,
      dedication: "לישועות",
      datOfDonation: new Date(2023, 7, 22),
    },
  ]);

  return (
    <>
      <RateContext.Provider value={rate}>
        <NavBar onCoinChange={changeCoin} />
        <Routes>
          <Route path="" element={<List1 arr={donationsArr} />} />
          <Route
            path="Form"
            element={<Form setDonationsArr={setDonationsArr} />}
          />
          <Route path="Donations" element={<Donations arr={donationsArr} />} />
        </Routes>
      </RateContext.Provider>
    </>
  );
}

export default App;
