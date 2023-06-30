'use client';

import { useRouter } from 'next/navigation';

export default function PreviousPage() {
  const router = useRouter();

  return (
    <button
      type="button"
      className="text-cyan-300"
      onClick={() => { router.back(); }}
    >
      ← Accueil
    </button>
  );
}