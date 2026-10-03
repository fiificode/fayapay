import { faqs } from "@/content/site";
import { Reveal } from "@/components/reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function Questions() {
  return (
    <section id="questions" className="py-24 sm:py-36">
      <Reveal className="shell">
        <h2 data-reveal className="h-section text-center">
          Questions
        </h2>
        <Accordion defaultValue={[faqs[0].q]} className="mx-auto mt-10 max-w-[46rem] border-t sm:mt-16">
          {faqs.map((faq) => (
            <AccordionItem key={faq.q} value={faq.q} data-reveal>
              <AccordionTrigger>{faq.q}</AccordionTrigger>
              <AccordionContent>
                <p>{faq.a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}
