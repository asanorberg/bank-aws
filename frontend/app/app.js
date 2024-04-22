"use client";

export function App({ children }) {
  return <div className="max-w-[1200px] flex-col m-auto mb-10">{children}</div>;
}

export default ({ children }) => <App>{children}</App>;
