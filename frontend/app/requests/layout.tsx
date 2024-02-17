export default function RequestListLayout({children,}: {
    children: React.ReactNode
}) {
    return (
        <section id="requests">
            {children}
        </section>
    )
}