import { MeditationList } from "@eshamanio/ui";

export default function MeditationsPage() {
  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-xl">
        <MeditationList />
      </div>
    </main>
  );
}
