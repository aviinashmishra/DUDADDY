import StoreLayout from "@/components/store/StoreLayout";

export const metadata = {
    title: "DuDaddy - Store Dashboard",
    description: "DuDaddy - Store Dashboard",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <StoreLayout>
                {children}
            </StoreLayout>
        </>
    );
}
