import React from "react";
import { Dialog, DialogContent, Typography, Button } from "@mui/material";
import App from "./App";
const OneDonation = (props) => {
  function calculateDate(date) {
    if (!date) {
      return "עכשיו";
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
    if (monthsDiff < 0) {
      monthsDiff += 12;
    }

    if (monthsDiff > 0) {
      return monthsDiff === 1 ? "חודש" : `${monthsDiff} חודשים`;
    }

    let daysDiff = currentDate.getDate() - date.getDate();

    return daysDiff === 1 ? "יום" : `${daysDiff} ימים`;
  }

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogContent>
        {" "}
        <div className="modal-container">
          {" "}
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">פרטי התרומה</h2>
            </div>
            <div className="modal-body">
              <h2 className="sum">
                <span>₪{props.details.sum}</span>
              </h2>
              <p className="details">
                <span>{props.details.name}</span>
                <br />
                <span>'{props.details.dedication}'</span>
                <p>
                  {" "}
                  ביצוע התרומה: {calculateDate(props.details.DateOfDonation)}
                </p>
              </p>
            </div>{" "}
            <Button
              onClick={props.handleClose}
              style={{
                backgroundColor: "#007bff",
                borderRadius: "10px",
                color: "white",
              }}
            >
              סגור
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OneDonation;
