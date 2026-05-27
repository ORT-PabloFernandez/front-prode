export default async function PartidoPageId({ params }) {

  const { id } = await params;

  return <div>Pantalla Partido ID: {id}</div>;
}
