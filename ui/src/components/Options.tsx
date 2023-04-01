import {
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  Checkbox,
  ListItemText,
  Dialog,
  DialogActions,
  Button,
} from "@mui/material";
import * as React from "react";

const Options = (props: any) => {
  return (
    <Dialog open={props.open} onClose={props.closeBtn}>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {props.options.map((v: any) => {
          const labelId = `checkbox-list-label-${v.label}`;

          return (
            <ListItem key={v.lable} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={props.handleToggle(v.index)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={v.checked}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${v.label}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <DialogActions>
        <Button onClick={props.closeBtn} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Options;
