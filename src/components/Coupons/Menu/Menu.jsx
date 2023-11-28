import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";

export default function CouponMenu({
  target,
  children,
  handleDelete,
  title,
  handleUpdate,
  handleActivate,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div onClick={handleClick}>{target}</div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <>
          <MenuItem
            onClick={() => {
              handleClose();
              handleDelete();
            }}
          >
            Delete
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              handleUpdate();
            }}
          >
            Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              handleActivate();
            }}
          >
            Set as Inactive
          </MenuItem>
        </>
      </Menu>
    </div>
  );
}
