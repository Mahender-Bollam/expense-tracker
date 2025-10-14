import { useContext } from "react"
import { styles } from "../styles/styles"
import { ShareFormData } from "../App"


export const InputFields = ()=>{
    const categories: string[] = ['Food', 'Transport', 'Entertainment', 'Bills', 'Shopping', 'Health', 'Other'];
    const {dataOfForm:formData, setDataOfForm:setFormData} = useContext(ShareFormData)
    return(
        <div>
            <div style={styles.formGroup}>
                <label style={styles.label}>Description</label>
                <input
                    type="text"
                    value={formData.description}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, description: e.target.value })}
                    style={styles.input}
                    placeholder="Enter description"
                />
                </div>

                <div style={styles.formGroup}>
                <label style={styles.label}>Amount</label>
                <input
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, amount: e.target.value })}
                    style={styles.input}
                    placeholder="0.00"
                />
                </div>

                <div style={styles.formGroup}>
                <label style={styles.label}>Category</label>
                <select
                    value={formData.category}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, category: e.target.value })}
                    style={styles.input}
                >
                    <option value="">Select category</option>
                    {categories.map((cat: string) => (
                    <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                </div>

                <div style={styles.formGroup}>
                <label style={styles.label}>Date</label>
                <input
                    type="date"
                    value={formData.date}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, date: e.target.value })}
                    style={styles.input}
                />
            </div>
        </div>
    )
}