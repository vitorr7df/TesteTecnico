import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Container, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Tooltip, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UsersList = ({ onLoading }) => {
    const [users, setUsers] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
    const [editUser, setEditUser] = useState({ id: '', name: '', email: '' });
    const [userToDelete, setUserToDelete] = useState(null);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });

    const navigate = useNavigate();

    const getUsers = async () => {
        try {
            onLoading(true);
            const response = await api.get('/users');
            setUsers(response.data);
        } catch (error) {
            toast.error('Erro ao carregar usuários.');
        } finally {
            onLoading(false);
        }
    };

    const deleteUser = async () => {
        if (!userToDelete) return;

        try {
            onLoading(true);
            await api.delete(`/users/${userToDelete.id}`);
            toast.success('Usuário excluído com sucesso');
            getUsers();
            setOpenConfirmDelete(false);
        } catch (error) {
            toast.error('Erro ao excluir usuário.');
        } finally {
            onLoading(false);
        }
    };

    const updateUser = (user) => {
        setEditUser(user);
        setOpenModal(true);
    };

    const closeModalUpdate = () => {
        setOpenModal(false);
        setEditUser({ id: '', name: '', email: '' });
    };

    const saveUpdate = async () => {
        try {
            onLoading(true);
            await api.put(`/users/${editUser.id}`, editUser);
            toast.success('Usuário atualizado com sucesso');
            getUsers();
            closeModalUpdate();
        } catch (error) {
            toast.error('Erro ao atualizar usuário.');
        } finally {
            onLoading(false);
        }
    };

    const confirmDelete = (user) => {
        setUserToDelete(user);
        setOpenConfirmDelete(true);
    };

    const closeConfirmDelete = () => {
        setOpenConfirmDelete(false);
        setUserToDelete(null);
    };

    const openAddUserModal = () => {
        setOpenAddModal(true);
    };

    const closeAddUserModal = () => {
        setOpenAddModal(false);
        setNewUser({ name: '', email: '', password: '' });
    };

    const saveNewUser = async () => {
        try {
            onLoading(true);
            await api.post('/users', newUser);
            toast.success('Usuário adicionado com sucesso');
            getUsers();
            closeAddUserModal();
        } catch (error) {
            toast.error('Erro ao adicionar usuário.');
        } finally {
            onLoading(false);
        }
    };

    const logout = async () => {
        try {
            onLoading(true);
            localStorage.removeItem('authToken');
            navigate('/');
        } catch (error) {
            toast.error('Erro ao fazer logout.');
        } finally {
            onLoading(false);
        }
    };

    useEffect(() => {
        getUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container>
            <Typography className='tituloCrud' variant="h4" gutterBottom>
                Crud de Usuários
            </Typography>

            <Button
                variant="contained"
                color="primary"
                onClick={logout}
                style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                }}
            >
                Sair
            </Button>

            <Button
                variant="contained"
                color="primary"
                style={{ marginBottom: '16px' }}
                onClick={openAddUserModal}
            >
                Adicionar Usuário
            </Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell >
                                <Tooltip title="Editar">
                                    <IconButton color="secondary" onClick={() => updateUser(user)}>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Excluir">
                                    <IconButton color="error" onClick={() => confirmDelete(user)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={openModal} onClose={closeModalUpdate}>
                <DialogTitle>Editar Usuário</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Nome"
                        value={editUser.name}
                        onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        value={editUser.email}
                        onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModalUpdate} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={saveUpdate} color="primary">
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openConfirmDelete} onClose={closeConfirmDelete}>
                <DialogTitle>Confirmar Exclusão</DialogTitle>
                <DialogContent>
                    <Typography>Tem certeza que deseja excluir este usuário?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeConfirmDelete} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={deleteUser} color="secondary">
                        Excluir
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openAddModal} onClose={closeAddUserModal}>
                <DialogTitle>Adicionar Novo Usuário</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Nome"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        fullWidth
                        margin="normal"
                        autoComplete="off"
                    />
                    <TextField
                        label="Senha"
                        type="password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        fullWidth
                        margin="normal"
                        autoComplete="new-password"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeAddUserModal} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={saveNewUser} color="primary">
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default UsersList;
