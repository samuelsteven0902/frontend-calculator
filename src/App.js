import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from './components/ButtonBox'
import Button from './components/Button'
import CalcProvider, { CalcContext } from "./context/CalcContext";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useState } from "react";


const btnValues = [
  ["C", "mod", "%", "/"],
  [7, 8, 9, "x"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];


function App() {
  const [ dataKalkulator, setDataKalkulator] = useState()
  const [ loading, setLoading] = useState(true)
  const { calc, setCalc } = useContext(CalcContext);

  const getData = () =>{
    axios.get('http://localhost:8000/api/kalkulator').then((res)=>{
        console.log(res.data.hasil);
        setDataKalkulator(res.data.hasil)
        setLoading(false)
      })
  }
  console.log(dataKalkulator);

  useEffect(() => {
    getData()
  }, [])
  
  if(loading)
  {
    return (
      <>
      <p>Loading...</p>
      </>
    )
  }


  return (
      <div className="flex h-4/5">
        <Wrapper>
        <Screen   handleGetMe={getData} />
        <ButtonBox>
          {btnValues.flat().map((btn, i) => (
            <Button
              value={btn}
              key={i}
              onClick={getData}
            />
          ))}
        </ButtonBox>
      </Wrapper>
      <div className="h-[80vh]   overflow-y-auto ml-5 rounded bg-[#f4e6e6]">
            <div className="p-8 ">
              <p className="font-mono">History</p>
              
      
      {
          dataKalkulator && dataKalkulator.slice(0).reverse().map((item,i)=>{
            return(
              <div key={i} className="block m-2 p-2 bg-[#e9f0f4] rounded shadow hover:bg-red-200 active:bg-red-300  " onClick={()=>setCalc({num:+item.hasil,res:0,sign:''})}>
                  {item.hasil}
              </div>
            )
          })
        }
            </div>
      </div>
      </div>
  );
}

export default App;
