import { InputForm } from "@/components/InputForm";
import { Pool } from "@/components/Pool";
import { NavBar } from "@/components/NavBar";

export default function Pools() {
  return (
    <div class="container mx-auto p-5">
      <NavBar />
      <InputForm />
      <Pool />
    </div>
  );
}