// Donations.js
import React, { useState } from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { FixedSizeList } from "react-window";
import { Typography, Button } from "@mui/material";
import OneDonation from "./OneDonation";
import List1 from "./List";
import { fromShekelToX } from "./List";
import { useContext } from "react";
import { RateContext } from "./App";

const Donations = (props) => {
  // מייבא את ההמרה לדולרים
  let rate = useContext(RateContext);

  //  מקבל את כל אפשריות של החיפוש
  const [filteredArr, setFilteredArr] = useState(props.arr);
  // שמירת ערך המחופש ובדיקה איפה קים עם המרה לאותיות קטנות ללא רווחים
  const handleSearch = (event) => {
    const searchValue = event.target.value.trim().toLowerCase();
    // מערך חלקי מה שמחפשת
    const filteredArr = props.arr.filter((donation) => {
      const nameIncludesSearch = donation.name
        .toLowerCase()
        .includes(searchValue);
      const dedicationIncludesSearch = donation.dedication
        .toLowerCase()
        .includes(searchValue);
      //החזרת המערך או לפי שם או לפי הקדשה
      return dedicationIncludesSearch || nameIncludesSearch;
    });
    // עדכון המערך לפי חיפוש
    setFilteredArr(filteredArr);
  };

  // " משתנה ששומר לי את התרומה"המבוקשת
  const [selectedDonation, setSelectedDonation] = useState(null);
  //  "פתיחת תרומה"
  const [open, setOpen] = useState(false);
  const handleItemClick = (donation) => {
    setSelectedDonation(donation);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  // חישוב תאריך תרומה

  function calculateDate(date) {
    if (!date) {
      return " עכשיו ";
    }

    const currentDate = new Date();

    if (date.toDateString() === currentDate.toDateString()) {
      return "היום";
    }

    let yearsDiff = currentDate.getFullYear() - date.getFullYear();

    if (yearsDiff > 0) {
      return yearsDiff === 1 ? "שנה" : `${yearsDiff} שנים`;
    }

    let monthsDiff = currentDate.getMonth() - date.getMonth();

    if (monthsDiff >= 0) {
      return monthsDiff === 0 ? "חודש" : `${monthsDiff} חודשים`;
    }

    let daysDiff = currentDate.getDate() - date.getDate();

    return daysDiff === 1 ? "יום" : `${daysDiff} ימים`;
  }

  // הצגת נתוני התרומות
  function renderRow(props) {
    const { index, style, data } = props;
    const sortedData = [...data.filteredArr];
    // פונקצית מיון שלא יצא שלילי
    sortedData.sort((a, b) => parseFloat(b.sum) - parseFloat(a.sum));
    const donation = sortedData[index];

    return (
      // להצגת נתוני  התרומות ברשימה ListItem לקחנו צורה מספריה
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton
          sx={{ justifyContent: "space-between" }}
          onClick={() => handleItemClick(donation)}
        >
          <Typography variant="body2" color="textSecondary">
            {calculateDate(donation.datOfDonation)}
          </Typography>
          <Typography variant="h6" color="rgb">
            {fromShekelToX(donation.sum, rate.dollar, rate.currentCoin)}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {donation.dedication}
          </Typography>
          <Typography variant="h6" color="rgb">
            {donation.name}
          </Typography>
        </ListItemButton>
      </ListItem>
    );
  }

  return (
    <>
      <div className="searchBox">
        <input
          className="searchInput"
          type="text"
          name=""
          placeholder="לחיפוש תרומה"
          onChange={handleSearch}
        />
        <button className="searchButton" href="#">
          <i className="material-icons">חיפוש</i>
        </button>
      </div>
      <div className="donations" style={{ textAlign: "center" }}>
        <Box
          sx={{
            width: "100%",
            maxWidth: 490,
            marginTop: 12,
            padding: 1,
            borderRadius: 5,
            boxShadow: 20,
            display: "inline-block",
          }}
        >
          <h2 style={{ color: "black" }}>all Donations</h2>
          <FixedSizeList
            height={300}
            width={490}
            itemSize={60}
            itemCount={filteredArr.length}
            overscanCount={5}
            itemData={{ filteredArr }}
          >
            {renderRow}
          </FixedSizeList>
        </Box>{" "}
        {/* הצגת הריבועי סיכום תרומות */}
        <List1 arr={props.arr} />
        {selectedDonation && (
          <OneDonation
            open={open}
            handleClose={handleClose}
            details={selectedDonation}
          />
        )}
      </div>
    </>
  );
};
export default Donations;
