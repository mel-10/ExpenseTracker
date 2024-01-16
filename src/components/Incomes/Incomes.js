import React,{useEffect} from 'react'
import { InnerLayout } from '../../styles/Layout';
import styled from "styled-components";
import { useGlobalContext } from '../../context/GlobalContext';
import Forms from '../../components/Forms/Forms'
import IncomeItem from '../IncomeItem/IncomeItem';

export default function Incomes() {
   const {addIncome,getIncomes,incomes,deleteIncome,totalIncome} =useGlobalContext()

   useEffect(() =>{
    getIncomes()
}, [])

  return (
    <IncomesStyled>
        <InnerLayout>
        <h3 className="total-income">Total Income: <span>${totalIncome()}</span></h3>
            <div className='income-content'>
                <div className='form-container'>
                  <Forms/>
                </div>
                <div className='income'>
                {incomes.map((income)=>{
                            const {_id, title, amount, date, category, description, type, deleteItem} = income;
                            return <IncomeItem
                                key={_id}
                                id={_id} 
                                title={title}
                                amount={amount}
                                date={date}  
                                category={category}  
                                description={description} 
                                deleteItem={deleteIncome}
                                indicatorColor="var(--color-green)"                     
                                type={type}
                                />
                        })}
                </div>
            </div>
        </InnerLayout>
    </IncomesStyled>
  )
}

const IncomesStyled = styled.div`
display: flex;
overflow: auto;
.form-container{
    flex:1;  
}
.total-income{
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FCF6F9;
    border: 1px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 10px;
    padding: 0 50px;
    margin: 0.3rem 0;
    font-size: 1.5rem;
    gap: .5rem;
    span{
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--color-green);
    }
}
.income-content{
    display: flex;
    gap: 0.9rem;
    .income{
        flex: 1;
    }
}

`;
