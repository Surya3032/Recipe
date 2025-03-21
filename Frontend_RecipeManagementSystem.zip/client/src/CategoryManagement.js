import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, ListGroup } from 'react-bootstrap';

const API_BASE_URL = 'http://localhost:5120/api'; // Ensure this is correct

function CategoryManagement() {
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryDescription, setNewCategoryDescription] = useState('');

    useEffect(() => {
        axios.get(`${API_BASE_URL}/Categories`).then(response => setCategories(response.data));
    }, []);

    const addCategory = () => {
        axios.post(`${API_BASE_URL}/Categories`, { name: newCategoryName, description: newCategoryDescription })
            .then(response => {
                setCategories([response.data, ...categories]);
                setNewCategoryName('');
                setNewCategoryDescription('');
            })
            .catch(error => console.error('Error adding category:', error));
    };

    const deleteCategory = (id) => {
        axios.delete(`${API_BASE_URL}/Categories/${id}`)
            .then(() => setCategories(categories.filter(c => c.id !== id)))
            .catch(error => console.error('Error deleting category:', error));
    };

    return (
        <div>
            <h1>Category Management</h1>
            <Form>
                <Form.Group>
                    <Form.Control type="text" placeholder="Name" value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Control as="textarea" placeholder="Description" value={newCategoryDescription} onChange={e => setNewCategoryDescription(e.target.value)} />
                </Form.Group>
                <Button variant="primary" onClick={addCategory}>Add Category</Button>
            </Form>
            <ListGroup>
                {categories.map(category => (
                    <ListGroup.Item key={category.id}>
                        {category.name} - {category.description}
                        <Button variant="danger" size="sm" onClick={() => deleteCategory(category.id)}>Delete</Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}

export default CategoryManagement;