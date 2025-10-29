import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from './ui/card.tsx';
import { Table, TableHead, TableRow, TableCell, TableBody } from './ui/table.tsx';
import { Input } from './ui/input.tsx';
import { Label } from './ui/label.tsx';
import { IoExitOutline } from "react-icons/io5";
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';


export default function Stats() {
    const navigate = useNavigate();

    const [stats, setStats] = useState(null);
    const [langFilter, setLangFilter] = useState('');
    const [sortKey, setSortKey] = useState('created_at');

    const [token, setToken, deleteToken] = useCookies('self-token');
    const [userName, setUserName, deleteName] = useCookies('self-name');
    const [userEmail, setUserEmail, deleteMail] = useCookies('self-mail');

    const fetchStats = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/stats/?filter_lang=${langFilter}&sort=${sortKey}`, {
                headers: {
                    Authorization: `Token ${token['self-token']}`
                }
            });
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const logoutUser = () => {
        deleteToken(['self-token']);
        deleteName(['self-name']);
        deleteMail(['self-mail']);
        navigate('/');
    }

    useEffect(() => {
        fetchStats();
    }, [langFilter, sortKey]);

    if (!stats) return <p>Завантаження статистики...</p>;

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold">Статистика</h1>

            <Card className="p-4 space-y-2">
                <p>🔢 Загальна кількість перекладів: {stats.total_translations}</p>
                <p>💰 Загальний дохід: {stats.total_revenue} UAH</p>
                <p>📊 Середній чек: {stats.average_order} UAH</p>
                <p>👥 Усього користувачів: {stats.total_users}</p>
                <p>🧑‍💼 Тих, хто щось перекладав: {stats.users_with_translations}</p>
            </Card>

            <div className="flex gap-4 items-end">
                <div>
                    <Label htmlFor="langFilter">Фільтр за мовою</Label>
                    <Input id="langFilter" value={langFilter} onChange={e => setLangFilter(e.target.value)} placeholder="EN, UK..." />
                </div>
                <div>
                    <Label htmlFor="sortKey">Сортувати за</Label>
                    <select id="sortKey" className="border px-2 py-1 rounded" value={sortKey} onChange={e => setSortKey(e.target.value)}>
                        <option value="created_at">Дата</option>
                        <option value="source_lang">Мова джерела</option>
                        <option value="target_lang">Мова перекладу</option>
                    </select>
                </div>
            </div>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Користувач</TableCell>
                        <TableCell>Мова з</TableCell>
                        <TableCell>Мова на</TableCell>
                        <TableCell>Дата</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stats.orders.map((order, idx) => (
                        <TableRow key={idx}>
                            <TableCell>{order.user__username}</TableCell>
                            <TableCell>{order.source_lang}</TableCell>
                            <TableCell>{order.target_lang}</TableCell>
                            <TableCell>{new Date(order.created_at).toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <IoExitOutline className='fixed w-[30px] h-[30px] top-3 right-3 cursor-pointer text-gray-500' onClick={() => logoutUser()} />
        </div>
    );
}
