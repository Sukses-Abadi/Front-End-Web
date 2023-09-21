export default function Container({ children }) {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-4 gap-5 max-lg:grid-cols-2 max-lg:gap-3">
        {children}
      </div>
    </div>
  );
}
