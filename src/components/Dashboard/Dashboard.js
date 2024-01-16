import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/GlobalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layout';
import { dollar } from '../../utils/Icons';
import Chart from '../Chart/Chart';

function Dashboard() {
    const {totalExpenses,incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext()

    useEffect(() => {
        getIncomes()
        getExpenses()
    }, [])

    return (
        <DashboardStyled>
            <InnerLayout>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                        <div className="amount-con">
                            <div className="income">
                                <h5>Total Income</h5>
                                <p>
                                    {dollar} {totalIncome()}
                                </p>
                            </div>
                            <div className="expense">
                                <h5>Total Expense</h5>
                                <p>
                                    {dollar} {totalExpenses()}
                                </p>
                            </div>
                            <div className="balance">
                                <h5>Total Balance</h5>
                                <p>
                                    {dollar} {totalBalance()}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="history-con">
                        <History />
                        <h4 className="salary-title">Min <span>Salary</span>Max</h4>
                        <div className="salary-item">
                            <p>
                                ${Math.min(...incomes.map(item => item.amount))}
                            </p>
                            <p>
                                ${Math.max(...incomes.map(item => item.amount))}
                            </p>
                        </div>
                        <h4 className="salary-title">Min <span>Expense</span>Max</h4>
                        <div className="salary-item">
                            <p>
                                ${Math.min(...expenses.map(item => item.amount))}
                            </p>
                            <p>
                                ${Math.max(...expenses.map(item => item.amount))}
                            </p>
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    )
}

const DashboardStyled = styled.div`
    .stats-con{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 1rem;
        .chart-con{
            grid-column: 1 / 4;
            margin:15px;
            height:300px;
            .amount-con{
              grid-column: 1 / -1;
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 1rem;
                margin: 10px;
                display:flex;  
                flex-direction: row;  
                width:105%;           
                .income, .expense, .balance{
                    
                    width:30%;
                    grid-column: span 3;
                    align-items: center;
                    background: #FCF6F9;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;
                    p{
                        font-size: 18px;
                        font-weight: 400;
                    }
                }

                .balance{
              
                    display: flex;
                    flex-direction: column;
                   
                    align-items: center;
                    p{
                        color: var(--color-green);
                        opacity: 0.6;
                       
                    }
                }
            }
        }

        .history-con{
          margin:10px;
            grid-column: 4 / -1;
            h4{
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .salary-title{
                font-size: 1rem;
                span{
                    font-size: 1rem;
                }
            }
            .salary-item{
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p{
                    font-weight: 300;
                    font-size: 1rem;
                }
            }
        }
    }
`;

export default Dashboard