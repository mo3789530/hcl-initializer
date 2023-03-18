import React from 'react';
import './App.css';
import './components/Header';
import Header from './components/Header';
import Form from './components/Form';
import axios from 'axios';
import { Button } from '@mui/material';
import Options from './components/Options';

function App() {
  const [options, setOptions] = React.useState([]);
  const [name, setName] = React.useState("");
  const [region, setReagion] = React.useState("");
  const [env, setEnv] = React.useState("");
  const [selcted, setSelected] = React.useState([]);
  const [showOptions, setShowOptions] = React.useState(false);
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

  const optionsBtnOpen = () => {
    setShowOptions(true)
  }

  return (
    <div className="App">
      <Header />
      <Form></Form>
      <Button variant='contained' onClick={optionsBtnOpen}>Options</Button>
      <div style={{ visibility: showOptions ? 'visible' : 'hidden' }}>
        <Options options={options} ></Options>
      </div>

    </div >
  );
}

export default App;
