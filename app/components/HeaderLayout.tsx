import React, { memo } from 'react';
import Header from "./Header";

const HeaderLayout = memo(({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div>
        <div className="mx-auto flex flex-col justify-between h-full w-[900] min-h-[100vh] max-lg:p-4 max-md:p-0 max-lg:w-full">
          <header className="mt-8 mb-6 max-md:mt-0 max-md:mb-0 max-lg:mt-0">
            <Header />
          </header>
          <main className="flex-1 max-md:p-4">
            {children}
          </main>
          <footer className="my-6">
            <div className="text-center text-gray-500 text-sm">
              © 2025 by <a href="https://github.com/listensay/">背影如正面</a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
});

export default HeaderLayout;
