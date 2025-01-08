import type { Metadata } from "next";
import { Nunito } from "next/font/google";


const nunito = Nunito({
    subsets: ['cyrillic'],
    variable: '--font-nunito',
    weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
    title: "Главная",
    description: "описание!",
};

export default function layout({
    children,
    modal
}
    :
    {
        children: React.ReactNode;
        modal: React.ReactNode
    }) {
    return (
        <main className="min-h-screen">
            {children}
            {modal}
        </main>
    );
}
