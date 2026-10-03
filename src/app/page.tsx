import { JsonLd } from "@/components/json-ld";
import { Coverage } from "@/components/sections/coverage";
import { Hero } from "@/components/sections/hero";
import { Install } from "@/components/sections/install";
import { Journey } from "@/components/sections/journey";
import { Promises } from "@/components/sections/promises";
import { Questions } from "@/components/sections/questions";
import { Sending } from "@/components/sections/sending";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Hero />
      <Coverage />
      <Journey />
      <Sending />
      <Promises />
      <Questions />
      <Install />
    </>
  );
}
