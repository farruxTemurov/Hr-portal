import { useState } from 'react';

function useForm(initialState) {
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e, callback) => {
        e.preventDefault();
        if (callback) {
            callback(formData); // Execute the callback with form data
        } else {
            console.log('Form Data Submitted:', formData); // Default behavior
        }
    };

    return {
        formData,
        setFormData,
        handleChange,
        handleSubmit,
    };
}

export default useForm;
