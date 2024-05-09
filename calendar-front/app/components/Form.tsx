import React, { useState, useEffect } from 'react';

interface FormData {
    coverPhoto: string;
    date: string;
    title: string;
    description: string;
    body: string;
    isOnline: boolean;
}

interface FormProps {
    selectedDay: Date | null;
}

const Form: React.FC<FormProps> = ({ selectedDay }) => {
    const [formData, setFormData] = useState<FormData>({
        coverPhoto: '',
        date: selectedDay ? selectedDay.toISOString().split('T')[0] : '',
        title: '',
        description: '',
        body: '',
        isOnline: false,
    });

    useEffect(() => {
        if (selectedDay) {
            setFormData(prevState => ({ ...prevState, date: selectedDay.toISOString().split('T')[0] }));
        }
    }, [selectedDay]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: name === 'isOnline' ? value === 'true' : value }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Cover Photo URL:
                <input type="text" name="coverPhoto" value={formData.coverPhoto} onChange={handleChange} />
            </label>
            <label>
                Date:
                <input type="text" name="date" value={formData.date} readOnly />
            </label>
            <label>
                Title:
                <input type="text" name="title" value={formData.title} onChange={handleChange} />
            </label>
            <label>
                Description:
                <textarea name="description" value={formData.description} onChange={handleChange} />
            </label>
            <label>
                Body:
                <textarea name="body" value={formData.body} onChange={handleChange} />
            </label>
            <label>
                Is Online:
                <select name="isOnline" value={formData.isOnline ? 'true' : 'false'} onChange={handleChange}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
};

export default Form;