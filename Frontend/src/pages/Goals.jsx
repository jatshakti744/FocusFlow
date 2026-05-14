import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import DataTable from '../components/DataTable';
import Button from '../components/Button';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import axios from 'axios';
import useDebounce from '../hooks/useDebounce';
import moment from 'moment';

const Goals = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    const debouncedSearch = useDebounce(searchTerm, 500);

    const fetchGoals = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/goals?page=${page}&search=${debouncedSearch}`);
            setData(res.data.goals);
            setPages(res.data.pages);
            setTotal(res.data.total);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGoals();
    }, [page, debouncedSearch]);

    const columns = [
        { key: 'name', header: 'Goal Name' },
        { 
            key: 'dueDate', 
            header: 'Due Date',
            render: (row) => moment(row.dueDate).format('DD MMM YYYY')
        },
        { 
            key: 'priority', 
            header: 'Priority',
            render: (row) => (
                <span className="priority-badge">
                    {row.priority}{row.priority === 1 ? 'st' : row.priority === 2 ? 'nd' : row.priority === 3 ? 'rd' : 'th'}
                </span>
            )
        },
        { 
            key: 'status', 
            header: 'Status',
            render: (row) => (
                <span className={`badge ${row.status.toLowerCase()}`}>
                    {row.status}
                </span>
            )
        },
        {
            key: 'actions',
            header: 'Actions',
            render: (row) => (
                <div className="action-btns">
                    <button className="icon-btn text-primary"><Edit size={18} /></button>
                    <button className="icon-btn text-danger"><Trash2 size={18} /></button>
                </div>
            )
        }
    ];

    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <h1>Goals</h1>
                    <p>Track your long-term achievements and streaks.</p>
                </div>
                <div className="page-actions">
                    <div className="search-input-wrapper">
                        <Search size={18} />
                        <input 
                            type="text" 
                            placeholder="Search goals..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button><Plus size={18} /> New Goal</Button>
                </div>
            </div>

            <Card>
                <DataTable 
                    title="All Goals" 
                    columns={columns} 
                    data={data} 
                    total={total}
                    page={page}
                    pages={pages}
                    onPageChange={(p) => setPage(p)}
                />
            </Card>
        </div>
    );
};

export default Goals;
