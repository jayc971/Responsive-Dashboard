import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from "@material-ui/icons/Save";
// import AddList from "./AddList";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    width: "100%",
    display: "flex",
    justifyContent: "flex-end"
  }
}));
export default function TopBar({
  onLayoutSave,
  items,
  onRemoveItem,
  onAddItem,
  originalItems
}) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      {/* <AddList
        items={items}
        onRemoveItem={onRemoveItem}
        onAddItem={onAddItem}
        originalItems={originalItems}
      /> */}
      <IconButton aria-label="save" onClick={onLayoutSave}>
        <SaveIcon />
      </IconButton>
    </Card>
  );
}
