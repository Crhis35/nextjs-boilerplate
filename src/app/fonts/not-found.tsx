import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <div className="p-5 flex justify-content-center align-items-center h-full">
      <div>
        <h1>Página no encontrada</h1>
        <p>
          Lo sentimos, no encontramos lo que buscas, ve a la{' '}
          <Link href="/">página de inicio</Link>.
        </p>
      </div>
    </div>
  );
}
