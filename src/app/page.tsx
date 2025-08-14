// src/app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/clients/list'); // or '/clients'
  return null; // unreachable, but keeps TS happy
}
