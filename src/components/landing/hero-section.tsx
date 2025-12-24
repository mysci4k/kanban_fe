"use client";

import { IconArrowUpRight } from "@tabler/icons-react";
import { Variants } from "motion";
import { motion, useAnimation, useInView } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { buttonVariants } from "../ui/button";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.1 },
  },
};

const title: Variants = {
  hidden: { opacity: 0, y: -40, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const description: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const button: Variants = {
  hidden: { opacity: 0, scale: 0, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: "easeOut",
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const image: Variants = {
  hidden: { opacity: 0, x: 500, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 isolate z-2 hidden opacity-50 contain-strict lg:block"
      >
        <div className="absolute top-0 left-0 h-320 w-140 -translate-y-87.5 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
        <div className="absolute top-0 left-0 h-320 w-60 [translate:5%_-50%] -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
        <div className="absolute top-0 left-0 h-320 w-60 -translate-y-87.5 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
      </div>

      <motion.section
        ref={ref}
        variants={container}
        initial="hidden"
        animate={controls}
        id="home"
        className="overflow-hidden"
      >
        <div className="relative mx-auto max-w-5xl px-6 pt-28 lg:pt-24">
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <motion.h1
              variants={title}
              className="text-4xl font-semibold text-balance md:text-5xl lg:text-6xl"
            >
              Blast through tasks with Kanblast
            </motion.h1>
            <motion.p
              variants={description}
              className="text-muted-foreground mx-auto my-8 max-w-2xl text-xl"
            >
              The supercharged Kanban board that turns chaos into productivity.
              Visualize, optimize and accelerate your projects like never
              before.
            </motion.p>

            <motion.div variants={button}>
              <Link
                href="/signup"
                className={buttonVariants({ variant: "default" })}
              >
                <IconArrowUpRight className="size-5" /> Get Started
              </Link>
            </motion.div>
          </div>
        </div>

        <motion.div variants={image} className="mx-auto 2xl:max-w-7xl">
          <div className="pl-8 perspective-distant lg:pl-44">
            <div className="rotate-x-20 skew-x-12 mask-r-from-75% mask-b-from-55% mask-b-to-100% pt-6 pl-6 lg:h-176">
              <Image
                className="rounded-(--radius) border shadow-xl dark:hidden"
                src="/placeholder_light.svg"
                alt="Kanblast app image"
                width={1920}
                height={1080}
              />
              <Image
                className="hidden rounded-(--radius) border shadow-xl dark:block"
                src="/placeholder_dark.svg"
                alt="Kanblast app image"
                width={1920}
                height={1080}
              />
            </div>
          </div>
        </motion.div>
      </motion.section>
    </>
  );
}
