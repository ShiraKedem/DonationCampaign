import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Button,
} from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { NavLink } from "react-router-dom";
import * as React from "react";
import "./NavBar.css";
import { blue } from "@mui/material/colors";
import ColorLens from "@mui/icons-material/ColorLens";
import { useState } from "react";

const NavBar = ({ onCoinChange }) => {
  
  // הגדרות navbar
  const [value, setValue] = React.useState(0);
// שינוי צבע עמוד
  const [isActive, setIsActive] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
// האים  הצבע השתנה
  const changColor = () => {
    setIsActive(!isActive);

    // שינוי צבע העמוד בהתאם למצב של isActive
    document.body.classList.toggle("activeTheme", isActive);
  };

  return (
    <>
      <Box sx={{ width: 1350, position: "fixed", top: 0 }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={handleChange}
          className="navBar"
        >
          <BottomNavigationAction
            className={(Object) => (Object.isActive ? "active" : "noActiv")}
            onClick={changColor}
            icon={<ColorLens sx={{ fontSize: 30, color: "rgba" }} />}
            label="  לשינוי ערכת נושא"
          />
          <BottomNavigationAction
            label="לתרומה"
            icon={<FavoriteIcon sx={{ fontSize: 30, color: "rgba" }} />}
            component={NavLink}
            to="/Form"
          />
          <BottomNavigationAction
            label="התורמים שלנו"
            icon={<RestoreIcon sx={{ fontSize: 30, color: "rgba" }} />}
            component={NavLink}
            to="/Donations"
          />
        </BottomNavigation>
        <Button
          className="dollar"
          style={{ marginTop: 20 }}
          variant="contained"
          onClick={onCoinChange}
        >
          הצג את האתר בדולרים/בשקלים
        </Button>
      </Box>
      <div className="footer">
        <span className="spanFooter">
          <img
            className="img1"
            src="https://d1qvck26m1aukd.cloudfront.net/assets/packs/3535ab05a83db6a97c222029011a1e44.webp"
            alt="israel flags"
          ></img>{" "}
          ,יחד ננצח
          <br />
          מסייעים לנפגעי המלחמה
        </span>
      </div>{" "}
    </>
  );
};

export default NavBar;
