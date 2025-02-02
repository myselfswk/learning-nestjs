// This interface ensures pagination results maintain a consistent structure.

export interface PaginationResult<T> {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    data: T[];
}