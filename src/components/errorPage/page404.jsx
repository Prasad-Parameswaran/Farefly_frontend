export default function PagesErr404() {
    return (
        <div>
            <section className="h-screen w-screen bg-white">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-sm text-center">
                        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 text-red-600">404</h1>
                        <p className="mb-4 text-3xl tracking-tight font-bold md:text-4xl text-black">Something s missing.</p>
                        <p className="mb-4 text-lg font-light text-black">Sorry, we cant find that page. You ll find lots to explore on the home page. </p>
                    </div>
                </div>
            </section>
        </div>
    )
}