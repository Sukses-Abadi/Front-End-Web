import Sidebar from "@/components/profile/Sidebar";

export default function layout({ children }) {
  return (
    <div className="container mx-auto py-10 h-full">
      <div className="grid grid-cols-3 gap-3">
        <Sidebar />
        <div class="col-span-2 w-full border-2 rounded-r-lg shadow-md">
          {children}
        </div>
      </div>
    </div>
  );
}
