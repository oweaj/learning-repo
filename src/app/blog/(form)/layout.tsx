export default function BlogFormLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <div className="max-w-screen-sm py-6 mx-auto px-4 space-y-6">
      {children}
    </div>
  );
}
