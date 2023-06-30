// pas obligé de récupérer dans un Client component
// on peut rendre notre Server component asynchrone
// > https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#async-and-await-in-server-components

import Link from 'next/link';

import PokemonCard from '@/components/PokemonCard';

import { Pokemon } from '@/@types/pokemon';

async function getPokemons() {
  const res = await fetch('https://api-pokemon-fr.vercel.app/api/v1/pokemon');
  // The return value is *not* serialized
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
  const pokemonsFiltered = pokemons.slice(0, 12);

  return (
    <main className="bg-cyan-950 min-h-screen">
      <h1 className="font-bold text-cyan-400 text-4xl p-12">Pokédex</h1>

      <section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2 p-2">
        {pokemonsFiltered.map((pokemon) => (
          <Link
            key={pokemon.pokedexId}
            href={`/pokemon/${pokemon.name.fr.toLowerCase()}`}
            className="flex"
          >
            <PokemonCard pokemon={pokemon} />
          </Link>
        ))}
      </section>
    </main>
  );
}
