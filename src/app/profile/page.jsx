import Image from "next/image";
import profile from "../../components/assets/profile.jpg";

export default function Address() {
  return (
    <div className="flex flex-col h-full p-3">
      <div className="container p-3">
        <h1 className="font-medium text-xl text-primary opacity-60">Profile</h1>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {/* Start Upload Image*/}

        <div className="max-w-sm bg-white border rounded-lg shadow">
          <div className="pt-3 pb-2 px-3">
            <Image className="rounded-lg" src={profile} alt="profile" />
          </div>
          <div className="px-8 pb-10">
            <ul className="list-disc text-xs font-medium italic">
              <li>File type (jpg/jpeg)</li>
              <li>max size 10 Mb</li>
            </ul>
          </div>
          <div className="container p-2">
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:placeholder-gray-400"
              id="large_size"
              type="file"
            />
          </div>
        </div>

        {/* End Upload */}

        {/* Start Detail Profile */}
        <div className="col-span-2 ">
          <div className="p-5">
            <form className="w-full max-w-lg">
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-primary text-xs font-bold mb-2"
                    for="grid-first-name"
                  >
                    First Name
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
                    Last Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    type="text"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-primary text-xs font-bold mb-2"
                    for="grid-username"
                  >
                    Username
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-username"
                    type="text"
                    placeholder="janedoe123"
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-primary text-xs font-bold mb-2"
                    for="grid-email"
                  >
                    Email
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-email"
                    type="email"
                    placeholder="janedoe@email.com"
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full px-3">
                  <button className="w-full border border-primary px-3 py-3 text-sm font-medium text-center text-primary rounded-lg hover:bg-primary hover:text-white">
                    Update Details Profile
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* End Detail Profile */}
      </div>
    </div>
  );
}
