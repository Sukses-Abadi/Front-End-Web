"use client";

export default function Address() {
  return (
    <div className="flex flex-col h-full p-3">
      <div className="container p-3">
        <h1 className="font-medium text-xl text-primary opacity-60">Address</h1>
      </div>

      {/* Start Modal */}
      <div className="w-full px-3">
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="w-full border-dotted border-2 border-primary px-3 py-4 text-sm font-semibold text-center text-primary rounded-sm hover:bg-primary hover:text-white"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          Add Your Address
        </button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box rounded-lg">
            <form method="dialog">
              <div className="flex flex-row pb-8">
                <h1 className="font-medium text-lg text-primary opacity-80">
                  Add Your Address
                </h1>
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute text-lg right-2">
                  ✕
                </button>
              </div>
            </form>
            <form className="space-y-6" action="#">
              <div>
                <label
                  className="block uppercase tracking-wide text-primary text-xs font-bold mb-2"
                  for="grid-username"
                >
                  Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-username"
                  type="text"
                  placeholder="Kantor"
                />
              </div>
              <div>
                <label
                  className="block uppercase tracking-wide text-primary text-xs font-bold mb-2"
                  for="grid-username"
                >
                  Street
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-username"
                  type="text"
                  placeholder="444 Birch Rd"
                />
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-primary text-xs font-bold mb-2"
                    for="grid-first-name"
                  >
                    City
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    placeholder="Jane"
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-primary text-xs font-bold mb-2"
                    for="grid-last-name"
                  >
                    Zip Code
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    type="text"
                    placeholder="12345"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="w-full border border-primary px-3 py-3 text-sm font-medium text-center text-primary rounded-lg hover:bg-primary hover:text-white"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
      {/* End Modal */}

      <div className="mt-4 w-full px-3 bg-slate-300">
        <h1>Belum Ada Alamat</h1>
      </div>
    </div>
  );
}
