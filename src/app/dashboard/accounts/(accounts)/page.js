import Dashboard from '@/components/pagesComponents/dashboard/normal/mainBoard/items/Dashboard';

export default function page() {
  return (
    <main className="py-1 bg-neutral-50 min-h-screen">
      <Dashboard />
    </main>
  );
}

export async function generateMetadata() {
  return {
    title: 'Accounts',
  };
}
