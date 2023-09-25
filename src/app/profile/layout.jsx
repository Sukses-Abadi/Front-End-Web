import Sidebar from "@/components/profile/Sidebar";

export default function layout({ children }) {
  return (
    <div className="container mx-auto py-10 h-full">
      <div className="flex flex-row gap-3">
        <Sidebar />
        <div className="basis-3/4 w-full border-2 rounded-r-lg shadow-md">
          {children}
        </div>
      </div>
    </div>
  );
}
