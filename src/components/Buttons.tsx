import { useState } from "react";
import { OpenOrCloseModelBtn, HoveredButton, OpenOrDeleteExpenseBtn, EditOrAddExpenseBtn } from "../types/type";
import { styles } from "../styles/styles";
import { Edit2, Plus, Trash2, X } from "lucide-react";


export const OpenOrCloseModelButton : React.FC<OpenOrCloseModelBtn> = ({title,setIsModalOpen=()=>{},closeModel=()=>{}})=>{
    const [hoveredButton, setHoveredButton] = useState<HoveredButton>(null);
    return(
        <button 
            onClick={()=>(title ==='Add Expense')? setIsModalOpen(true) : closeModel()}
            style={{
            ...(title ==='Add Expense' ? styles.addButton : (title ==='close' ? styles.closeButton : styles.secondaryButton)),
            ...(title ==='Add Expense'? (hoveredButton === 'add' ? styles.addButtonHover : {}) : 
                (title ==='close' ? (hoveredButton === 'close' ? styles.closeButtonHover : {}):
                    (hoveredButton === 'cancel' ? styles.secondaryButtonHover : {})))
            }}
            onMouseEnter={() => setHoveredButton(title)}
            onMouseLeave={() => setHoveredButton(null)}
        >
            {title ==='Add Expense' ? <Plus size={20} />:(title ==='close' && <X size={24} />)}
            {title ==='Add Expense'? title : (title === 'cancel' && title.charAt(0).toUpperCase()+title.slice(1))}
        </button>
    );
};

export const OpenOrDeleteAnExpenseButton  :React.FC<OpenOrDeleteExpenseBtn>  = ({manageExpense,expense,title})=>{
    const [hoveredButton, setHoveredButton] = useState<HoveredButton>(null);
    return(
        <button
        onClick={() => manageExpense(expense)}
        style={{
            ...(title === 'editExpense' ? styles.editButton : styles.deleteButton),
            ...(title === 'editExpense' ? (hoveredButton === `${title+'-'+expense.id}` ? styles.editButtonHover : {}):(hoveredButton === `${title+'-'+expense.id}` ? styles.deleteButtonHover : {}))
        }}
        onMouseEnter={() => setHoveredButton(`${title+'-'+expense.id}`)}
        onMouseLeave={() => setHoveredButton(null)}
        title={title}
        >
        {(title === 'editExpense' )? <Edit2 size={18} /> : <Trash2 size={18} />}
        </button>
    );
};

export const EditOrAddExpenseButton  :React.FC<EditOrAddExpenseBtn> = ({editingId, editExpense,addExpense})=>{
    const [hoveredButton, setHoveredButton] = useState<HoveredButton>(null);
    return(
        <button
            onClick={()=>editingId? editExpense(editingId) :addExpense()}
            style={{
                ...styles.primaryButton,
                ...(hoveredButton === 'submit' ? styles.primaryButtonHover : {})
            }}
            onMouseEnter={() => setHoveredButton('submit')}
            onMouseLeave={() => setHoveredButton(null)}
            >
            {editingId ? 'Update Expense' : 'Add Expense'}
        </button>
    )
}


