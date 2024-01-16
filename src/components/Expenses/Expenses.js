import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/GlobalContext';
import { InnerLayout } from '../../styles/Layout'
import Forms from '../Forms/Forms';
import IncomeItem from '../IncomeItem/IncomeItem';
import ExpenseForm from './ExpenseForm';

function Expenses() {
    const {addIncome,expenses, getExpenses, deleteExpense, totalExpenses} = useGlobalContext()

    useEffect(() =>{
        getExpenses()
    }, [])
    return (
        <ExpenseStyled>
            <InnerLayout>
                <h3 className="total-income">Total Expense: <span>${totalExpenses()}</span></h3>
                <div className="income-content">
                    <div className="form-container">
                        <ExpenseForm />
                    </div>
                    <div className="incomes">
                        {expenses.map((income) => {
                            const {_id, title, amount, date, category, description, type} = income;
                            console.log(income)
                            return <IncomeItem
                                key={_id}
                                id={_id} 
                                title={title} 
                                description={description} 
                                amount={amount} 
                                date={date} 
                                type={type}
                                category={category} 
                                indicatorColor="var(--color-green)"
                                deleteItem={deleteExpense}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    )
}

const ExpenseStyled = styled.div`
display: flex;
overflow: auto;
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
    gap: 2rem;
    .incomes{
        flex: 1;
    }
}

`;

export default Expenses