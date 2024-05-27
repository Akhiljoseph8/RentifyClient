import React, { useState,useContext } from 'react'
import { createContext } from 'react'

export const addPropertyResponseContext=createContext()
export const editPropertyResponseContext = createContext()
export const deletePropertyResponseContext = createContext()
export const likePropertyResponseContext = createContext()

function ContextShare({children}) {
    const [addResponse,setAddResponse] = useState("")
    const [editResponse,setEditResponse] = useState("")
    const [deleteResponse,setDeleteResponse] = useState("")
    const [likeResponse,setLikeResponse] = useState("")
  return (
    <>
    <addPropertyResponseContext.Provider value={{addResponse,setAddResponse}}>
        <editPropertyResponseContext.Provider value={{editResponse,setEditResponse}}>
          <deletePropertyResponseContext.Provider value={{deleteResponse,setDeleteResponse}}>
            <likePropertyResponseContext.Provider value={{likeResponse,setLikeResponse}}>
            {children}
            </likePropertyResponseContext.Provider>
          </deletePropertyResponseContext.Provider>
        </editPropertyResponseContext.Provider>
    </addPropertyResponseContext.Provider>
    </>
  )
}

export default ContextShare