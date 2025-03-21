import React, { useState, useEffect } from 'react';
import { getCategories, deleteCategory } from '../api';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then(res => setCategories(res.data));
    }, []);

    const handleDelete = (id) => {
        deleteCategory(id).then(() => {
            setCategories(categories.filter(c => c.id !== id));
        });
    };

    return (
        <div>
            <h2>Categories</h2>
            <ul>
                {categories.map(category => (
                    <li key={category.id}>
                        {category.name} - {category.description}
                        <button onClick={() => handleDelete(category.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;