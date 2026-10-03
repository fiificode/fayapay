import { install } from "@/content/site";
import { ApkLine, Checksum } from "@/components/apk-info";
import { DownloadButton } from "@/components/download-button";
import { Reveal } from "@/components/reveal";

export function Install() {
  return (
    <section id="install" className="bg-soft py-24 sm:py-36">
      <div className="shell">
        <Reveal className="text-center">
          <div data-reveal>
            <span className="flame mx-auto block h-14 text-primary sm:h-16" aria-hidden />
          </div>
          <h2 data-reveal className="h-display mt-6">
            {install.title}
          </h2>
          <div data-reveal className="mt-9">
            <DownloadButton />
            <ApkLine className="mt-4 text-sm text-muted-foreground" />
          </div>
        </Reveal>

        <Reveal>
          <ol className="mt-16 grid gap-4 sm:mt-24 sm:gap-5 lg:grid-cols-3">
            {install.steps.map((step, i) => (
              <li key={i} data-reveal className="tile raised">
                <span className="grid size-12 place-items-center rounded-full bg-primary font-mono text-2xl font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <p className="mt-6 text-lg leading-relaxed">
                  {"strong" in step ? (
                    <>
                      {step.before}
                      <strong className="font-bold">{step.strong}</strong>
                      {step.text}
                    </>
                  ) : (
                    step.text
                  )}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
        <div className="mx-auto max-w-[46rem]">
          <Checksum />
        </div>
      </div>
    </section>
  );
}
