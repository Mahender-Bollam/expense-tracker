import { useState } from "react";
import { styles } from "../styles/styles"
import { ExpenseCrd, HoveredExpense } from "../types/type"
import { Calendar, Tag } from "lucide-react";
import { OpenOrDeleteAnExpenseButton } from "./Buttons";



export const ExpenseCard: React.FC<ExpenseCrd> = ({expense, handleEdit, deleteExpense})=>{
    const [hoveredExpense, setHoveredExpense] = useState<HoveredExpense>(null);
    return(
        <div
            key={expense.id}
            style={{
                ...styles.expenseItem,
                ...(hoveredExpense === expense.id ? styles.expenseItemHover : {})
            }}
            onMouseEnter={() => setHoveredExpense(expense.id)}
            onMouseLeave={() => setHoveredExpense(null)}
            >
            <div style={styles.expenseContent}>
                <div style={styles.expenseTitleRow}>
                <h3 style={styles.expenseTitle}>{expense.description}</h3>
                <span style={styles.categoryBadge}>
                    <Tag size={12} />
                    {expense.category}
                </span>
                </div>
                <div style={styles.expenseDate}>
                <Calendar size={14} />
                {new Date(expense.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                })}
                </div>
            </div>

            <div style={styles.expenseRight}>
                <span style={styles.expenseAmount}>
                ${expense.amount.toFixed(2)}
                </span>
                <div style={styles.actionButtons}>
                <OpenOrDeleteAnExpenseButton manageExpense={handleEdit} expense={expense} title='editExpense'/>
                <OpenOrDeleteAnExpenseButton  manageExpense={deleteExpense} expense={expense} title='deleteExpense'/>
                </div>
            </div>
        </div>
    )
}