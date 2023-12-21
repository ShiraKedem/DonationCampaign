import Donations from "./Donations";
import "./NavBar.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { useContext } from "react";
import { RateContext } from "./App";
import { useEffect } from "react";
import Alert from "@mui/material/Alert";

import SendIcon from "@mui/icons-material/Send";
// המרה מדולר לשקל

export const fromXToShekel = (sumInX, dollarRate, fromCoin) => {
  if (fromCoin === "shekel") {
    return sumInX;
  } else if (fromCoin === "dollar") {
    return Math.floor(sumInX * dollarRate);
  }
};

const Form = ({ setDonationsArr }) => {
  let rate = useContext(RateContext);
  // הגדרת משתתנים לבדיקת תקינות
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onSubmit",
  });
  // עדכון הטופס בעת הבדיקה
  const [formData, setFormData] = useState({});
  // כאשר נשלח הטופס מכניסים לטופס חדש
  const onSubmit = (data) => {
    const newFormData = {
      id: data.id,
      name: data.name,
      dedication: data.dedication,
      sum:
        fromXToShekel(parseFloat(data.sum), rate.dollar, rate.currentCoin) || 0,
      DateOfDonation: new Date(),
    };

    // App עדכון המערך בסטייט של
    setDonationsArr((prevArr) => [...prevArr, newFormData]);
    // הטופס נשמר
    setFormSubmitted(true);
    // איפוס הטופס למצב ההתחלתי
    setValue("id", ""); // איפוס של הערכים בטופס
    setValue("name", "");
    setValue("dedication", "");
    setValue("sum", "");

 
  };
  //  האם הטופס נשלח
  const [formSubmitted, setFormSubmitted] = useState(false);
  // אחרי שלוש שניות ירענן
  useEffect(() => {
    let timeout;

    if (formSubmitted) {
      // הצגת ההודעה לזמן מוגדר (לדוג', 3 שניות)
      timeout = setTimeout(() => {
        // אחרי סיום הזמן, חזור לדף הטופס
        setFormSubmitted(false);
      }, 3000);
    }

    return () => clearTimeout(timeout); // בכל עדכון של הקומפוננטה, אם יש זמן מוגדר, עצור אותו
  }, [formSubmitted]);
  return formSubmitted ? (
    <section id="thank-you-section">
      <div className="">
        <h2>מדינת ישראל מודה לך </h2>
        <h2>מדינת ישראל מודה לך </h2>
      </div>
    </section>
  ) : (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Your Donation</h2>
      <TextField
        margin="dense"
        label="ת.ז"
        id="id"
        type="text"
        {...register("id", {
          required: { value: true, message: "שדה זה חובה" },
          pattern: {
            value: /^[0-9]{9}$/, // תעודת זהות בעלת 9 ספרות
            message: "ת.ז לא תקין",
          },
        })}
      />
      {errors.id && (
        <Alert
          severity="error"
          style={{
            maxWidth: "100px",
            margin: "auto",
            borderRadius: "8px",
            padding: "5px",

            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0px 4px 10px rgba(33, 150, 243, 0.2)",
            animation: "fadeIn 0.5s ease-out",
          }}
        >
          {errors.id.message}
        </Alert>
      )}

      <TextField
        margin="dense"
        label="שם"
        id="name"
        type="text"
        {...register("name", {
          required: { value: true, message: "שדה זה חובה", },
          minLength: { value: 3, message: "שם קצר מידי" ,},
          maxLength: { value: 30, message: "שם ארוך מידי" ,
        },
        })}
      />
         {errors.name && (
        <Alert
          severity="error"
          style={{
            maxWidth: "100px",
            margin: "auto",
            borderRadius: "8px",
            padding: "5px",

            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0px 4px 10px rgba(33, 150, 243, 0.2)",
            animation: "fadeIn 0.5s ease-out",
          }}
        >
          {errors.name.message}
        </Alert>
      )}

      <TextField
        margin="dense"
        label="הקדשה"
        variant="outlined"
        id="dedication"
        type="text"
        {...register("dedication")}
      />

      <TextField
        margin="dense"
        label="סכום"
        id="sum"
        type="number"
        {...register("sum", {
          required: { value: true, message: "שדה זה חובה" },
        })}
      />
         {errors.sum && (
        <Alert
          severity="error"
          style={{
            maxWidth: "100px",
            margin: "auto",
            borderRadius: "8px",
            padding: "5px",

            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0px 4px 10px rgba(33, 150, 243, 0.2)",
            animation: "fadeIn 0.5s ease-out",
          }}
        >       
          {errors.sum.message}
        </Alert>
      )}

      <Button
        style={{ marginTop: 20 }}
        type="submit"
        variant="contained"
        endIcon={<SendIcon />}
      >
        שלח
      </Button>
    </form>
  );
};

export default Form;
