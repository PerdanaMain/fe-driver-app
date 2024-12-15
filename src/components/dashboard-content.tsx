"use client";

import Navbar from "./navbar";
import Sidebar from "./sidebar";

export function DashboardContent() {

  return (
    <div className="max-w-4xl mx-auto">
      <Navbar />
      <div className="grid grid-rows-3 grid-flow-col gap-4 mt-4">
        <Sidebar />
        <div className="col-span-6 bg-white rounded-xl shadow py-3 px-5">02</div>
      </div>
    </div>
  );
}