import { styles } from "../styles/styles";
import { Expense, RecentExpensesCard,} from "../types/type";
import { ExpenseCard } from "./ExpenseCard";




export const RecentExpenses: React.FC<RecentExpensesCard> = ({expenses, handleEdit , deleteExpense})=>{
    
    return(
        <div>
          <h2 style={styles.sectionTitle}>Recent Expenses</h2>
          
          {expenses.length === 0 ? (
            <p style={styles.emptyState}>No expenses yet. Add your first expense above!</p>
          ) : (
            <div style={styles.expenseList}>
              {expenses.map((expense: Expense) => (
                <ExpenseCard expense={expense} handleEdit={handleEdit} deleteExpense={deleteExpense} key={expense.id}/>
              ))}
            </div>
          )}
        </div>
    );
};