import { useContext } from "react"
import { CalcContext } from "../context/CalcContext"
import { Textfit } from 'react-textfit';
import axios from "axios";
import Swal from 'sweetalert2'

const Screen = (      {handleGetMe}) => {
  const { calc ,setCalc } = useContext(CalcContext);

  const handleDelete = (e) =>{
    e.preventDefault();
    Swal.fire({
      title: 'Apakah anda yakin menghapus History?',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        
    axios.delete('http://localhost:8000/api/kalkulator').then((res)=>{
      console.log(res);
      handleGetMe()
      setCalc({ sign: '', num: 0, res: 0 })
    })
        Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })



  }

  return (
    <>
    
  <p>{calc && 
  <div className="flex justify-between">
    {calc.res === 0 ?calc.num:calc.res}{calc.sign}{ calc.num && calc.res ? calc.num : '' }
    <button onClick={handleDelete}>Clear History</button>
  </div>}</p>  
    <Textfit className="screen" max={70}  mode="single">{calc.num ? calc.num : calc.res}</Textfit>  
  
    </>
  )
}

export default Screen