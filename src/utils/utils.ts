import { FormData } from "../types/types";

export const validateForm = (formData: FormData) => {
    const errors: Partial<FormData> = {};
    if (!formData.description) {
        errors.description = 'Please enter description';
    }
    if (!formData.amount || Number(formData.amount) <= 0) {
        errors.amount = 'Please enter positive amount';
    }
    if (!formData.category) {
        errors.category = 'Please select category';
    }
    return errors
}
