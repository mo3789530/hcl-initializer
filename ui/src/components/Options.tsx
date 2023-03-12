import axios from "axios";
import * as React from "react";

const Options = (props: any) => {
  React.useEffect(() => {
    async function fetchOptions() {
      const response = await axios.get("/api/hcl/options");
      return response;
    }
  });

};

export default Options;
