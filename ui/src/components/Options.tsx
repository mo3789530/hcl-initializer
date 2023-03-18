import { List, ListItem, ListItemIcon, ListItemButton, Checkbox, ListItemText } from "@mui/material";
import * as React from "react";

const Options = (props: any) => {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: string) => () => {
    // const currentIndex = checked.indexOf(value);
    // const newChecked = [...checked];

    // if (currentIndex === -1) {
    //   newChecked.push(value);
    // } else {
    //   newChecked.splice(currentIndex, 1);
    // }

    // setChecked(newChecked);
  };
  console.log(props)
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {props.options.map((value: string) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            key={value}

            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  // checked={checked.indexOf() !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value + 1}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default Options;
