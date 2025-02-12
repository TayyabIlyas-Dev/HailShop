'use client';

import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    inventory: number;
    images: string[];
}

interface UpdateProductDetailProps {
    product: Product;
    onUpdate: () => void;
}

const UpdateProductDetail: React.FC<UpdateProductDetailProps> = ({ product, onUpdate }) => {
    const [updatedProduct, setUpdatedProduct] = useState({
        name: product.name,
        description: product.description,
        price: product.price,
        inventory: product.inventory,
        images: product.images,
    });
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`/api/updateProduct`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: product._id, ...updatedProduct }),
            });

            if (!response.ok) throw new Error('Failed to update product');
            showToast('Product updated successfully!');
            onUpdate();
        } catch (error) {
            console.error('Update failed', error);
            showToast('Failed to update product. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-3 border rounded">
            <input type="text" name="name" value={updatedProduct.name} onChange={handleChange} className="w-full p-2 border rounded" required />
            <textarea name="description" value={updatedProduct.description} onChange={handleChange} className="w-full p-2 border rounded" required />
            <input type="number" name="price" value={updatedProduct.price} onChange={handleChange} className="w-full p-2 border rounded" required />
            <input type="number" name="inventory" value={updatedProduct.inventory} onChange={handleChange} className="w-full p-2 border rounded" required />
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700" disabled={loading}>
                {loading ? 'Updating...' : 'Update Product'}
            </button>
        </form>
    );
};

export default UpdateProductDetail;
