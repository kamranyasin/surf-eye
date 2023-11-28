import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import { useDispatch, useSelector } from "react-redux";
import { addDate } from "../../Redux/FilterSlice";

import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import Swal from "sweetalert2";

export default function DropDown({
  anchorEl,
  setAnchorEl,
  open,
  ipType,
  links,
  type,
  width,
}) {
  const [date, setDate] = React.useState(dayjs(new Date()));
  const [isOpen, setIsOpen] = React.useState(false);
  const filteredData = useSelector((state) => state.selectData);
  const dispatch = useDispatch();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const testDate = (e) => {
    setDate(e);
  };

  const handleAccept = (date) => {
    dispatch(
      addDate(
        `${date.$y}-${date.$M <= 8 ? `0${++date.$M}` : ++date.$M}-${
          date.$D <= 8 ? `0${date.$D}` : date.$D
        }T${date.$H <= 9 ? `0${date.$H}` : date.$H}:${
          date.$m <= 9 ? `0${date.$m}` : date.$m
        }`
      )
    );
  };

  const handleOpen = () => {
    if (filteredData === 0 || filteredData.length === 0) {
      setIsOpen(true);
    } else {
      Swal.fire(
        "Deselect your waves before changing date and time",
        " ",
        "error"
      );
      setIsOpen(false);
    }
  };

  const handleCloseDate = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {type === "dateIp" ? (
          <div onClick={(e) => e.stopPropagation()} className="videoviewinput">
            <div className="date-input" style={{ width }}>
              <div className="date-input-text">
                {ipType ? "Pick a Date" : "Pick a Date & Time"}
              </div>
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    showToolbar={false}
                    ampm={false}
                    disableFuture={true}
                    value={date}
                    minutesStep={5}
                    onChange={testDate}
                    onAccept={handleAccept}
                    onOpen={handleOpen}
                    onClose={handleCloseDate}
                    open={isOpen ? true : false}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>
        ) : (
          links.map((l, id) => (
            <MenuItem
              sx={{
                color: "#2e3848",
                paddingX: "40px",
                borderBottom: "1px solid lightgray",
                fontFamily: ["Exo 2", "sans-serif"],
                fontWeight: "bold",
                textTransform: "uppercase",
                fontStyle: "italic",
              }}
              key={id}
              onClick={handleClose}
            >
              <a href={l.href}>{l.title}</a>
            </MenuItem>
          ))
        )}
      </Menu>
    </div>
  );
}
