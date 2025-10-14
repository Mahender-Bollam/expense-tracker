import { DollarSign } from "lucide-react"
import { styles } from "../styles/styles"
import { OpenOrCloseModelButton } from "./Buttons"
import { HeaderCrd } from "../types/type";



export const HeaderCard: React.FC<HeaderCrd> =({expenses,setIsModalOpen})=>{
    const totalExpense: number = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    return(
        <div style={styles.card}>
          <div style={styles.header}>

            <div style={styles.titleWrapper}>
              <h1 style={styles.title}>
                <DollarSign color="#6366f1" size={32} />
                Expense Tracker
              </h1>
              <p style={styles.subtitle}>Manage your daily expenses efficiently</p>
            </div>

            <OpenOrCloseModelButton  title='Add Expense'  setIsModalOpen={setIsModalOpen} />

          </div>

          <div style={styles.totalCard}>
            <p style={styles.totalLabel}>Total Expenses</p>
            <p style={styles.totalAmount}>${totalExpense.toFixed(2)}</p>
          </div>

        </div>
    )
}