import { List, ListItem, ListItemIcon, ListItemButton, Checkbox, ListItemText } from "@mui/material";
import * as React from "react";

const Options = (props: any) => {

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {props.options.map((v: any) => {
        console.log(v)
        const labelId = `checkbox-list-label-${v.label}`;

        return (
          <ListItem
            key={v.lable}

            disablePadding
          >
            <ListItemButton role={undefined} onClick={props.handleToggle(v.index)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={v.checked}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${v.label}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default Options;
