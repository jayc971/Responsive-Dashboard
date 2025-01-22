import React, { useState, useEffect } from 'react';
import { TextField, Button, Checkbox, List, ListItem, ListItemText, ListItemIcon, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoList = ({ onEdit }) => {
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos
            ? JSON.parse(savedTodos)
            : [
                    { id: 1, text: 'Analyze Data', completed: false },
                    { id: 2, text: 'Create Visuals', completed: false },
                    { id: 3, text: 'Review and Edit', completed: true },
                    { id: 4, text: 'Export Final Report', completed: false },
                ];
    });

    const [newTodoText, setNewTodoText] = useState('');

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleCheckboxChange = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const handleAddTodo = () => {
        if (newTodoText.trim()) {
            const newTodo = {
                id: todos.length + 1,
                text: newTodoText,
                completed: false,
            };
            setTodos((prevTodos) => [...prevTodos, newTodo]);
            setNewTodoText('');
        }
    };

    const handleDeleteTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    return (
        <Box className="todo-list" sx={{ margin: '0 auto', textAlign: 'center', p: 2 }}>
            {onEdit && (
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={newTodoText}
                        onChange={(e) => setNewTodoText(e.target.value)}
                        placeholder="Add new task"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddTodo}
                        sx={{ whiteSpace: 'nowrap' }}
                    >
                        +
                    </Button>
                </Box>
            )}
            <List>
                {todos.map((todo) => (
                    <ListItem key={todo.id} sx={{ display: 'flex', alignItems: 'center' }}>
                        <ListItemIcon>
                            <Checkbox
                                checked={todo.completed}
                                onChange={() => handleCheckboxChange(todo.id)}
                                color="primary"
                            />
                        </ListItemIcon>
                        <ListItemText
                            primary={todo.text}
                            sx={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                        />
                        <IconButton edge="end" onClick={() => handleDeleteTodo(todo.id)} aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default TodoList;
