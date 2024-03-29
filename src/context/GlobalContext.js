import React,{ createContext, useState, useContext , setError} from "react";
import axios from 'axios'

const BASE_URL=  "http://localhost:27017/api/v1/";
const Globalcontext=createContext()

export const GlobalProvider = ({children}) => {

    const[incomes,setIncomes]= useState([])
    const[expenses,setExpenses]= useState([])
    const[error,setError]= useState(null)

    //calculate the income 
    const addIncome= async(income) =>{
        try {
            const response = await axios.post(`${BASE_URL}add-income`, income);
            getIncomes();
        } catch (error) {
            console.error("Error adding income:", error);
            setError(error.response?.data?.message || "An error occurred while adding income.");
        }
    }

    const getIncomes = async()=>{
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(response.data)
        console.log(response.data)
    }

    const deleteIncome = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }

     //calculate incomes
     const addExpense = async (income) => {
        const response = await axios.post(`${BASE_URL}add-expense`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`)
        setExpenses(response.data)
        console.log(response.data)
    }

    const deleteExpense = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-expenses/${id}`)
        getExpenses()
    }

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }

    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }



    




    return(
        <Globalcontext.Provider value={{addIncome,getIncomes,incomes,deleteIncome,setError,error,totalIncome,totalExpenses,expenses,addExpense,getExpenses,deleteExpense,totalBalance,transactionHistory}}>
            {children}
        </Globalcontext.Provider>
    )
}

export const useGlobalContext =()=>{
    return useContext(Globalcontext)
}