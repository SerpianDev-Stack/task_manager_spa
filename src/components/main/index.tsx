import type { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}

export const Main = ({children}: MainProps)=>{
    return (
        <main className="min-h-screen bg-neutral-very-dark-blue w-screen">
          <div className="bg-[url('/images/bg-desktop-dark.jpg')] h-80 bg-cover bg-center p-2">
          {children}
          </div>
          
        </main>
    )
}

