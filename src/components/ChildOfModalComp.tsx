import { styles } from "../styles/styles"
import { EditOrAddExpenseButton, OpenOrCloseModelButton } from "./Buttons"
import { InputFields } from "./InputFields"
import { ChildOfModalCompnt } from "../types/type"

export const ChildOfModalComponent: React.FC<ChildOfModalCompnt> = ({editingId, editExpense, addExpense, closeModal})=>{
     
    return(
        <div>
            <div style={styles.modalHeader}>
                <h2 style={styles.modalTitle}>
                    {editingId ? 'Edit Expense' : 'Add New Expense'}
                </h2>
                <OpenOrCloseModelButton   title='close' closeModel={closeModal}/>
            </div>

            <InputFields/>

            <div style={styles.buttonGroup}>
                <EditOrAddExpenseButton editingId={editingId} editExpense={editExpense} addExpense={addExpense}/>
                <OpenOrCloseModelButton  title='cancel' closeModel={closeModal}/>
            </div>
        </div>
    )
}