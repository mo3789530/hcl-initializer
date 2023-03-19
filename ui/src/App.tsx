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

  const handleToggle = (index: number) => () => {
    // eslint-disable-next-line array-callback-return
    const newOptions = options.map((v: any) => {
      if (v.index === index) {
        v.checked = !v.checked;
      }
      return v;
    });
    setOptions(newOptions as any);
  };


  React.useEffect(() => {
    async function fetchOptions() {
      const local = "http://localhost:8000";
      const response = await axios.get(local + "/api/hcl/options");
      console.log("aaaa")
      console.log(response.data.options)
      const list = response.data.options.map((value: string, index: number) => {
        return {
          label: value,
          index: index,
          checked: false
        }
      })
      setOptions(list)
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
        <Options options={options} handleToggle={handleToggle} ></Options>
      </div>

    </div >
  );
}

export default App;
