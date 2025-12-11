'use client'
import ProductShowcaseHero from "@/components/ProductShowcaseHero"
import ProductCategories from "@/components/ProductCategories"
import FeaturedProducts from "@/components/FeaturedProducts"
import ProductBenefits from "@/components/ProductBenefits"
import IngredientSpotlight from "@/components/IngredientSpotlight"
import ProductComparison from "@/components/ProductComparison"
import ProductFAQ from "@/components/ProductFAQ"
import Newsletter from "@/components/Newsletter"

export default function ProductShowcase() {
    return (
        <div className="bg-[#0A0E1A]">
            <ProductShowcaseHero />
            <ProductCategories />
            <FeaturedProducts />
            <ProductBenefits />
            <IngredientSpotlight />
            <ProductComparison />
            <ProductFAQ />
            <Newsletter />
        </div>
    )
}