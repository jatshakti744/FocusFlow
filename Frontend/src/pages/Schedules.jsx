import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import DataTable from '../components/DataTable';
import Button from '../components/Button';
import { Plus, Edit, Trash2, CheckCircle, Search } from 'lucide-react';
import axios from 'axios';
import useDebounce from '../hooks/useDebounce';

const Schedules = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    const debouncedSearch = useDebounce(searchTerm, 500);

    const fetchSchedules = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/schedules?page=${page}&search=${debouncedSearch}`);
            setData(res.data.schedules);
            setPages(res.data.pages);
            setTotal(res.data.total);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSchedules();
    }, [page, debouncedSearch]);

    const columns = [
        { key: 'name', header: 'Schedule Name' },
        { key: 'time', header: 'Time' },
        { 
            key: 'repeat', 
            header: 'Repeat',
            render: (row) => row.repeat.join(', ')
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
                    <button className="icon-btn text-success" title="Mark Completed"><CheckCircle size={18} /></button>
                    <button className="icon-btn text-primary" title="Edit"><Edit size={18} /></button>
                    <button className="icon-btn text-danger" title="Delete"><Trash2 size={18} /></button>
                </div>
            )
        }
    ];

    const handleExport = () => {
        const headers = ['Name,Time,Repeat,Status'];
        const rows = data.map(s => `"${s.name}","${s.time}","${s.repeat.join(';')}",${s.status}`);
        const csvContent = "data:text/csv;charset=utf-8," + headers.concat(rows).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "schedules.csv");
        document.body.appendChild(link);
        link.click();
    };

    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <h1>Schedules</h1>
                    <p>Manage your daily routines and alarms.</p>
                </div>
                <div className="page-actions">
                    <div className="search-input-wrapper">
                        <Search size={18} className="search-icon" />
                        <input 
                            type="text" 
                            placeholder="Search schedules..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button>
                        <Plus size={18} /> Add Schedule
                    </Button>
                </div>
            </div>

            <Card>
                <DataTable 
                    title="Active Schedules" 
                    columns={columns} 
                    data={data} 
                    total={total}
                    page={page}
                    pages={pages}
                    onPageChange={(p) => setPage(p)}
                    onExport={handleExport}
                />
            </Card>
        </div>
    );
};

export default Schedules;
