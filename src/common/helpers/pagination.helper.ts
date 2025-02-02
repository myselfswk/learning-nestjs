import { Model } from 'mongoose';
import { PaginationResult } from '../interfaces/pagination.interface';

// Accepts any model and a query filter.
export async function paginate<T>(
    model: Model<T>,
    query: Record<string, any>,
    page: number = 1,
    limit: number = 10
): Promise<PaginationResult<T>> {
    const skip = (page - 1) * limit;

    // Uses Promise.all() for parallel query execution.
    const [data, totalItems] = await Promise.all([
        model.find(query).skip(skip).limit(limit).exec(),
        model.countDocuments(query),
    ]);

    return {
        totalItems,
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        data,
    };
}