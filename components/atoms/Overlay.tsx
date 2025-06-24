export default function Overlay({ children }) {
  return (
    <div className="absolute top-0 left-0 w-full h-screen bg-black/80 flex items-center justify-center">
      {children}
    </div>
  );
}
