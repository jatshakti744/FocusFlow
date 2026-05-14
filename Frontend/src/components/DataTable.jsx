import React from 'react';
import './DataTable.css';
import { Download, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button';

const DataTable = ({ 
  columns, 
  data, 
  onExport, 
  title, 
  page, 
  pages, 
  onPageChange,
  total
}) => {
  return (
    <div className="table-container">
      <div className="table-header">
        <div className="table-header-left">
          {title && <h3>{title}</h3>}
          {total !== undefined && <span className="total-badge">{total} Records</span>}
        </div>
        {onExport && (
          <Button variant="outline" size="sm" onClick={onExport}>
            <Download size={16} /> Export
          </Button>
        )}
      </div>
      
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th key={idx}>{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((row, rowIdx) => (
                <tr key={rowIdx}>
                  {columns.map((col, colIdx) => (
                    <td key={colIdx}>
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="no-data">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <div className="table-pagination">
          <p className="pagination-info">Page {page} of {pages}</p>
          <div className="pagination-btns">
            <button 
              className="pagination-btn" 
              onClick={() => onPageChange(page - 1)} 
              disabled={page === 1}
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              className="pagination-btn" 
              onClick={() => onPageChange(page + 1)} 
              disabled={page === pages}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
