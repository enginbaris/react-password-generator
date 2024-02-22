import React, { useState } from 'react'
import "./style.css"
import {FaClipboard} from "react-icons/fa"
import useForm from './useForm'
import { getSpecialChar } from './utils'
import {getRandomChar} from './utils'
import {toast} from "react-hot-toast"
// npm i react-icons
// npm i react-hot-toast güzel bir uyarı göstermek için
function App() {

  const [values,setValues] = useForm({
    length: 6, //initial values
    capital: true,
    small: true,
    number: false,
    symbol: false,    
  })

  const [result,setResult]= useState("")

  const fieldsArray = [
    {
      field: values.capital,
      getchar: () => getRandomChar(65,90),
    },
    {
      field: values.small,
      getchar:() => getRandomChar(97,122),
    },
    {
      field: values.number,
      getchar:() => getRandomChar(48,57),
    },
    {
      field: values.symbol,
      getchar:() => getSpecialChar()
    }
  ]

  const handleOnSubmit = (e) => {
      e.preventDefault()
      let generatedPassword = '' ;
      const checkedFields = fieldsArray.filter(({
        field}) => field )
        for (let i = 0; i < values.length; i++) {
          const index = Math.floor(Math.random() * checkedFields.length);
          const letter = checkedFields[index] ?.getchar() /*soru işareti: eğer checkedFields[index] varsa getchar() a eriş */

          if(letter){
            generatedPassword += letter; /*harf varsa oluşturulan password a ekle*/
          }
        }
          if(generatedPassword){
              setResult(generatedPassword)
          }
          else  {
            toast.error(' Please select at least one option')
          }

          }
  
    const handleClipBoard = async () =>  {
        if(result) { /*result var mı yok mu checking*/
        await navigator.clipboard.writeText(result)
        toast.success('Copied!')
        }
        else{
          toast.error("no password to copy")
        }
    }

  return (
   <section>{/*section sunucu tarafında render edilir*/}
  <div className='container'>
    <form id="pg-form" onSubmit={handleOnSubmit}>
      
      <div className='result'>
        <input type='text' id="result"
        placeholder='Min 6 character'
        readOnly /*readonly: kutucuk içi değiştirilemez*/
        value={result} />  
        
        <div className='clipboard' onClick={handleClipBoard}>
          <FaClipboard></FaClipboard> {/*textbox un sağındaki ikon*/}
        </div>
        </div>
        <div>
          <div className="field">
            <label htmlFor='length'>Length</label>
            <input 
              type='number'
              id="length" 
              min={6} 
              max={10} 
              name="length" 
              value={values.length} 
              onChange={setValues}>                
              </input>
            {/*en az 6 digit password olacağı için 6 dan küçük length olmasın diye min 6 */}

          </div>

          <div className="field">
            <label htmlFor='capital'>Capital</label>
            <input type='checkbox' id="capital"
            name="capital"
            checked={values.capital} // default olarak checked oldu
            onChange={setValues}
            ></input>

          </div>
          <div className="field">
            <label htmlFor='small'>Small</label>
            <input type='checkbox'
             id="small"
            name='small'
            checked={values.small}
            onChange={setValues}
            ></input>
          </div>

          <div className="field">
            <label htmlFor='number'>Number</label>
            <input type='checkbox'
            id="number"
            name="number"
            checked={values.number}
            onChange={setValues}
            ></input>
          </div>

          <div className="field">
            <label htmlFor='symbol'>Symbol</label>
            <input type='checkbox'
             id="symbol"
             name="symbol"
             checked={values.symbol}
             onChange={setValues}
             
             ></input>
          </div>
        </div>
        <button type='submit'>Generate Password</button>
    </form>
  </div>
   </section> 
  )
}

export default App