import React from 'react';
import Pagination from '@mui/material/Pagination';

const PaginationComponent = ({ totalPages, currentPage, onPageChange }) => {
    return (
        <Pagination
            count={totalPages}
            page={currentPage}
            onChange={onPageChange}
            color="primary" // 根据主题颜色进行调整
        />
    );
};

export default PaginationComponent;
