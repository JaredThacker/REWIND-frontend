import Sidebar from "@/components/Sidebar/Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="md:pl-60 pt-20">
        <div>{children}</div>
      </main>
      <Sidebar className="translate-x-0" />
    </>
  );
}
