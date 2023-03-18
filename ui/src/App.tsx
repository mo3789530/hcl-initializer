import React from 'react';
import './App.css';
import './components/Header';
import Header from './components/Header';
import Form from './components/Form';
import axios from 'axios';

function App() {
  const [options, setOptions] = React.useState([]);
  const [name, setName] = React.useState("");
  const [region, setReagion] = React.useState("");
  const [env, setEnv] = React.useState("");
  const [selcted, setSelected] = React.useState([]);

  React.useEffect(() => {
    async function fetchOptions() {
      const local = "http://localhost:8000";
      const response = await axios.get(local + "/api/hcl/options");
      setOptions(response.data.options)
      console.log(response.data.options);
      return response;
    }

    fetchOptions();
  }, []);

  return (
    <div className="App">
      <Header />
      <Form></Form>
    </div>
  );
}

export default App;
