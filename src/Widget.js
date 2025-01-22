import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";
import {widgetNames} from "./data/data";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    position: "relative" // Add this line to position the resize handle
  },
  header: {
    display: "flex",
    alignItems: "center",
    padding: "0.5rem"
  },
  spacer: {
    flexGrow: 1
  },
  body: {
    padding: "0.5rem",
    flexGrow: 1,
    overflowY: "auto" // Add this line to enable vertical scrolling
  },
  resizeHandle: {
    position: "absolute",
    width: "20px", // Increase the width of the resize handle
    height: "20px", // Increase the height of the resize handle
    bottom: "0",
    right: "0",
    cursor: "se-resize",
    backgroundColor: "rgba(0, 0, 0, 0.2)" // Add a background color for better visibility
  }
});



export default function Widget({ id, onRemoveItem, component: Item, onEditItem }) {
  const classes = useStyles();
  const [onEdit, setOnEdit] = React.useState(false);

  const handleEditToggle = () => {
    setOnEdit((prev) => !prev); // Toggle edit mode
    onEditItem(id);
  };

  return (
    <Card className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h6" gutterBottom>
          {widgetNames[id]}
        </Typography>
        <div className={classes.spacer} />
        <IconButton aria-label="edit" onClick={handleEditToggle}>
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => onRemoveItem(id)}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </div>
      <div className={classes.body}>
        <Item onEdit={onEdit} />
      </div>
      <div className={classes.resizeHandle} />
    </Card>
  );
}