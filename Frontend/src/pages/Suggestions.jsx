import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import DataTable from '../components/DataTable';
import Button from '../components/Button';
import { Plus, Search, Info } from 'lucide-react';
import axios from 'axios';
import useDebounce from '../hooks/useDebounce';

const Suggestions = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    const debouncedSearch = useDebounce(searchTerm, 500);

    const fetchSuggestions = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/suggestions?page=${page}&search=${debouncedSearch}`);
            setData(res.data.suggestions);
            setPages(res.data.pages);
            setTotal(res.data.total);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSuggestions();
    }, [page, debouncedSearch]);

    const columns = [
        { 
            key: 'category', 
            header: 'Category',
            render: (row) => (
                <span className="category-badge">{row.category}</span>
            )
        },
        { key: 'subcategory', header: 'Sub-Category' },
        { key: 'heading', header: 'Title' },
        { 
            key: 'isAdminVerified', 
            header: 'Status',
            render: (row) => (
                <span className="badge completed">Verified</span>
            )
        },
        {
            key: 'actions',
            header: 'View',
            render: (row) => (
                <button className="icon-btn text-primary" title="View Content">
                    <Info size={18} />
                </button>
            )
        }
    ];

    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <h1>Suggestions</h1>
                    <p>Admin verified tips for health and productivity.</p>
                </div>
                <div className="page-actions">
                    <div className="search-input-wrapper">
                        <Search size={18} />
                        <input 
                            type="text" 
                            placeholder="Search content..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button><Plus size={18} /> Add Content</Button>
                </div>
            </div>

            <Card>
                <DataTable 
                    title="All Verified Suggestions" 
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

export default Suggestions;
