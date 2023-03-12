import { Table, TextField } from "@mui/material";
import * as React from "react";

const Form = () => {
  return (
    <div>
<<<<<<< HEAD
      <Table style={{ width: '30%', height: '30%' }} >
=======
      <Table  style={{ width: '30%', height: '30%' }} >
>>>>>>> 110e66b8470a5c9a17d7ad3b6279844b7a7668e4
        <h3>Project Info</h3>
        <tr>
          <th>
            <label>Name: </label>
          </th>
          <th>
<<<<<<< HEAD
            <TextField id="project-name" label="Name" variant="standard" inputProps={{ maxLength: 6 }} />
=======
            <TextField id="project-name" label="Name" variant="standard" />
>>>>>>> 110e66b8470a5c9a17d7ad3b6279844b7a7668e4
          </th>
        </tr>
        <tr>
          <th>
            <label>Region: </label>
          </th>
          <th>
            <TextField id="project-region" label="Region" variant="standard" />
          </th>
        </tr>
        <tr>
          <th>
            <label>Env: </label>
          </th>
          <th>
            <TextField id="project-env" label="Env" variant="standard" />
          </th>
        </tr>
      </Table>
    </div>
  )
}

export default Form;