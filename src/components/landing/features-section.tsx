import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IconBolt, IconDeviceMobile, IconLayout } from "@tabler/icons-react";

const features = [
  {
    icon: IconLayout,
    header: "Flexible board",
    content: "Customize layouts to fit your workflow perfectly.",
  },
  {
    icon: IconBolt,
    header: "Top-level performance",
    content: "Blazing-fast speed with smooth, reliable performance.",
  },
  {
    icon: IconDeviceMobile,
    header: "Responsive design",
    content: "Looks and works great on any device and screen size.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-32">
      <div className="@container mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-semibold text-balance lg:text-5xl">
            Built to cover your needs
          </h2>
          <p className="mt-4">Everything you need, nothing you don&apos;t.</p>
        </div>
        <div className="mx-auto mt-8 grid max-w-sm gap-6 [--color-background:var(--color-muted)] [--color-card:var(--color-muted)] *:text-center md:mt-16 @min-4xl:max-w-full @min-4xl:grid-cols-3 dark:[--color-muted:var(--color-zinc-900)]">
          {features.map((feature) => (
            <Card
              key={feature.header}
              className="group border-0 bg-transparent shadow-none ring-0"
            >
              <CardHeader className="pb-3">
                <CardDecorator>
                  <feature.icon className="size-6" aria-hidden />
                </CardDecorator>

                <h3 className="mt-6 font-bold">{feature.header}</h3>
              </CardHeader>

              <CardContent>
                <p className="text-sm">{feature.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

const CardDecorator = ({ children }: { children: React.ReactNode }) => (
  <div className="relative mx-auto size-36 mask-radial-from-40% mask-radial-to-60% duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)25%,transparent)] hover:scale-110 dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)25%,transparent)]">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[24px_24px] dark:opacity-50"
    />

    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-t border-l">
      {children}
    </div>
  </div>
);
