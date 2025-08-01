import { ReactNode } from "react";

interface OverlayProps {
  children: ReactNode;
}

export default function Overlay({ children }: OverlayProps) {
  return (
    <div className="absolute top-0 left-0 w-full h-screen bg-black/80 flex items-center justify-center px-4">
      {children}
    </div>
  );
}
