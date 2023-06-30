// pas obligé de récupérer dans un Client component
// on peut rendre notre Server component asynchrone
// > https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#async-and-await-in-server-components

import { Pokemon } from '@/@types/pokemon';
import PokemonList from '@/components/PokemonList';

async function getPokemons() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pokemon`);  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json() as Promise<Pokemon[]>;
}

export default async function Home() {
  const pokemons = await getPokemons();
  // on est dans un Server Component, le console.log
  // affiche les données dans le Terminal !!!
  // console.log(data);

  return (
    <main className="bg-cyan-950 min-h-screen pb-12 overflow-hidden">
      <h1 className="font-bold text-cyan-400 text-4xl p-12">Pokédex</h1>

      <PokemonList pokemons={pokemons} />
    </main>
  );
}