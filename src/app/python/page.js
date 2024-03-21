import { NavBar } from "@/components/NavBar";

export default function Python() {
  return (
    <div class="container mx-auto p-5">
      <NavBar />
      <form class="w-full max-w-sm">
        <div class="flex items-center border-b border-teal-500 py-2">
            <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Pool Id" aria-label="Full name" />
            <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
                Search
            </button>
        </div>
        </form>
    </div>
  );
}