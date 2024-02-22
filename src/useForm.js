import React, { useState } from 'react'

function useForm(initialValues) {
  const [values,SetValues] = useState(initialValues)  
  return [
    values,
    (e) => {
        SetValues({
            ...values,[e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        }) // ... spread operator: we have previous values
        /*  2 çeşit input var. biri length, diğeri checkbox lar. yukarıdaki if else de e.targer.type === checkbox ise targer.checked
        i al demek. ise değilse yani checkbox işaretli değilse sadece value yi yani password u al demek */
    }
  ]
}

export default useForm