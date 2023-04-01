import { Table, TextField } from "@mui/material";
import * as React from "react";

const Form = (props: any) => {
  return (
    <div>
      <Table style={{ width: "30%", height: "30%" }}>
        <h3>Project Info</h3>
        <tr>
          <th>
            <label>Name: </label>
          </th>
          <th>
            <TextField
              id="project-name"
              label="Name"
              value={props.projectName}
              onChange={props.nameChange}
              variant="standard"
              inputProps={{ maxLength: 6 }}
            />
          </th>
        </tr>
        <tr>
          <th>
            <label>Region: </label>
          </th>
          <th>
            <TextField
              id="project-region"
              label="Region"
              variant="standard"
              value={props.projectRegion}
              onChange={props.regionChange}
            />
          </th>
        </tr>
        <tr>
          <th>
            <label>Env: </label>
          </th>
          <th>
            <TextField
              id="project-env"
              label="Env"
              variant="standard"
              value={props.projectEnv}
              onChange={props.envChange}
            />
          </th>
        </tr>
      </Table>
    </div>
  );
};

export default Form;
