export default function CatalogSection() {
  return (
    <>
      <section className="container mx-auto">
        <h1 className="text-center">Каталог</h1>
        <div className="bg-orange-200 flex columns-4">
          <div className="w-full h-8 m-2 bg-light-green-600">1</div>
          <div className="w-full h-8 m-2 bg-light-green-600">2</div>
          <div className="w-full h-8 m-2 bg-light-green-600">3</div>
          <div className="w-full h-8 m-2 bg-light-green-600">4</div>
        </div>
      </section>
    </>
  );
}
