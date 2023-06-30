import { Pokemon } from '@/@types/pokemon';
import PreviousPage from '@/components/PreviousPage';

interface SingleProps {
  params: {
    slug: `${number}-${string}`,
  }
}

async function getPokemon(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pokemon/${id}`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json() as Promise<Pokemon>;
}

// pour récupérer les paramètres d'URL
// (équivalent à useParams de React Router)
// Next.js nous donne une propriété `params`
// (un objet avec le nom de notre paramètre en propriété)
export default async function Single({ params }: SingleProps) {
  // console.log(params);
  const [id] = params.slug.split('-', 1);

  const pokemon = await getPokemon(id);

  return (
    <main className="bg-cyan-950 min-h-screen">
      <h1 className="font-bold text-cyan-400 text-4xl p-12">
        {pokemon.name.fr}
      </h1>

      <PreviousPage />

      <img
        src={pokemon.sprites.shiny || pokemon.sprites.regular}
        alt={pokemon.name.fr}
      />
    </main>
  );
}
