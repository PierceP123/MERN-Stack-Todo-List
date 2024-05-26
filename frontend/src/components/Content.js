import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Content.css';

const Content = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newContent, setNewContent] = useState({
        name: '',
        description: '',
        date: ''
    });
    const [selectedContentId, setSelectedContentId] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/contents');
            setData(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewContent(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedContentId) {
                await axios.put(`http://localhost:8080/api/contents/${selectedContentId}`, newContent);
            } else {
                await axios.post('http://localhost:8080/api/contents', newContent);
            }
            setNewContent({
                name: '',
                description: '',
                date: ''
            });
            setSelectedContentId(null);
            fetchData();
        } catch (error) {
            console.error('Add/update content error:', error);
        }
    };

    const handleUpdate = (id) => {
        const selectedContent = data.find(item => item._id === id);
        setNewContent({
            name: selectedContent.name,
            description: selectedContent.description,
            date: selectedContent.date
        });
        setSelectedContentId(id);

    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/contents/${id}`);
            fetchData();
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    const handleCircleClick = (id) => {
        setData(prevData => {
            return prevData.map(item => {
                if (item._id === id) {
                    return {
                        ...item,
                        showTick: !item.showTick
                    };
                }
                return item;
            });
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <div className="content-wrapper">
                <div className="add-content">
                    <h1>{selectedContentId ? 'Update a Job' : 'Add a Job'}</h1>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="name" value={newContent.name} onChange={handleChange} placeholder="Name" />
                        <textarea name="description" rows={4} cols={40} value={newContent.description} onChange={handleChange} placeholder="Description" />
                        <input type="date" name="date" value={newContent.date} onChange={handleChange} placeholder="Date" />
                        <button type="submit">{selectedContentId ? 'Update' : 'Add'}</button>
                    </form>
                </div>
                <div className="table-container">
                    <h1>Jobs in Database</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{new Date(item.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                                    <td>
                                        <div className="button-container">
                                            <button className="update" onClick={() => handleUpdate(item._id)}>Update</button>
                                            <button className="delete" onClick={() => handleDelete(item._id)}>Delete</button>
                                            <button className="circle" onClick={() => handleCircleClick(item._id)}>
                                                {item.showTick ? <span>&#10003;</span> : null}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Content;
