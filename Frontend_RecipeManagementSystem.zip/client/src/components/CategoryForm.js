import React, { useState } from 'react';
import { createCategory } from '../api';

const CategoryForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        createCategory({ name, description }).then(() => {
            setName('');
            setDescription('');
        });
    };

    return (
        <div>
            <h2>Add Category</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default CategoryForm;