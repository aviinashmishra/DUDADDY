'use client'
import AyurvedicHero from "@/components/AyurvedicHero";
import AyurvedicIngredients from "@/components/AyurvedicIngredients";
import AyurvedicBenefits from "@/components/AyurvedicBenefits";
import AyurvedicTestimonials from "@/components/AyurvedicTestimonials";
import AyurvedicScience from "@/components/AyurvedicScience";
import AyurvedicProducts from "@/components/AyurvedicProducts";
import Newsletter from "@/components/Newsletter";

export default function Home() {
    return (
        <div className="bg-[#0A0E1A]">
            <AyurvedicHero />
            <AyurvedicIngredients />
            <AyurvedicBenefits />
            <AyurvedicScience />
            <AyurvedicProducts />
            <AyurvedicTestimonials />
            <Newsletter />
        </div>
    );
}
