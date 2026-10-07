import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// First question open; items open independently like the mockup's <details>.
// Items are written out (not mapped) so each keeps a static value prop.
export function PricingFaq() {
  return (
    <section
      data-slot="pricing-faq"
      aria-labelledby="pricing-faq-title"
      className="mx-auto max-w-190"
    >
      <h2 id="pricing-faq-title" className="mb-4 font-serif text-3xl">
        Questions
      </h2>
      <Accordion multiple defaultValue={["free"]}>
        <AccordionItem value="free">
          <AccordionTrigger>What is free?</AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground">
              Slides, lessons and reading passages for every material, free for
              teachers.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="premium-adds">
          <AccordionTrigger>What does Premium add?</AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground">
              All kinds of games, fast access to new material, progress
              tracking, quizzes and notes.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="premium-price">
          <AccordionTrigger>How much is Premium?</AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground">
              Premium is $5 USD per month.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="cancel">
          <AccordionTrigger>Can I cancel any time?</AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground">
              {/* TODO: add the cancellation policy text here. */}
              <span className="rounded-md bg-secondary px-2">
                I will add this later
              </span>
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  )
}
