'use client'
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProduct } from "@/lib/features/product/productSlice";

export default function PublicLayout({ children }) {
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch products from API
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                const data = await response.json();
                if (data.products) {
                    dispatch(setProduct(data.products));
                }
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchProducts();
    }, [dispatch]);

    return (
        <>
            <Banner />
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
