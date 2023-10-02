// import { getCookies } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import OrderSummary from "./components/OrderSummary";
import CustomerDetails from "./components/CustomerDetails";
import DeliveryAddress from "./components/DeliveryAddress";
import OrderTable from "./components/OrderTable";
import TransferReceipt from "./components/TransferReceipt";
import fetchWithTokenServer from "@/lib/fetchWithTokenServer";


export async function generateMetadata(req) {
  const { id } = req.params;

  return {
    title: `Order number : #${id.toString().padStart(7, "0")} SA Apparel`,
    description: ` invoice of SA. Apparel`,
  };
}

export default async function Page({ params }) {
  if (!cookies().get(`accessToken`)) {
    redirect(`auth/login`);
  }
  const res = await fetchWithTokenServer(`api/order/${params.id}`, "GET", {
    cache: "no-store",
  });
  if (res === "Unauthorized") {
    redirect("/logout");
  }
  const data = res.data;
  // console.log(data);
  if (!data) return;
  return (
    <div className="p-5">
      {/* headers */}
      <div className=" text-2xl font-bold p-10">
        Order Number{" "}
        <span className=" text-red-400">
          #{data.id.toString().padStart(7, "0")}
        </span>
      </div>
      {/* Item Summary */}
      <div>
        <div className="flex gap-10 flex-wrap">
          <div className="flex-1">
            <OrderTable data={data} />
            <div className="py-10">
              <CustomerDetails data={data} />
            </div>
          </div>
          {/* side table OrderSummary */}
          <div className="flex-1">
            <OrderSummary data={data} />
            <div className="py-10">
              <DeliveryAddress data={data} />
            </div>
            <div className="pb-6">
              <TransferReceipt data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
