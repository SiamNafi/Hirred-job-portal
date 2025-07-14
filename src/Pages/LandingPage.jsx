import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import companies from "../data/companies.json";
import faqs from "../data/faq.json";

import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const LandingPage = () => {
  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
      <section className="text-center">
        <h1 className="p-4 flex flex-col items-center justify-center text-4xl font-extrabold gradient-title sm:text-6xl lg:text-8xl tracking-tighter">
          Find Your Dream Job{" "}
          <span>
            and get{" "}
            <span className="font-extrabold gradient-title text-4xl sm:text-6xl lg:text-8xl">
              Hirred.
            </span>
          </span>
        </h1>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
          Explore thousands of job listings or find the perfect candidate
        </p>
      </section>
      <div className="flex gap-6 justify-center">
        <Link to={"/jobs"}>
          <Button variant={"blue"} size={"xl"} className={"cursor-pointer"}>
            Find Jobs
          </Button>
        </Link>
        <Link to={"/post-job"}>
          <Button size={"xl"} variant={"red"} className={"cursor-pointer"}>
            Post a Job
          </Button>
        </Link>
      </div>
      {/* carousel */}
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full py-10"
      >
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => {
            return (
              <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
                <img
                  src={path}
                  alt={name}
                  className="h-9 sm:h-14 object-contain"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
      {/* banner */}
      <img src="/banner.jpeg" alt="banner" className="w-full" />
      {/* cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="font-bold text-3xl">
              For Job Seekers
            </CardTitle>
          </CardHeader>
          <CardContent>
            Search and apply for jobs, track applications, and more.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-bold text-3xl">For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            Post jobs, manage applications, and find the best candidates.
          </CardContent>
        </Card>
      </section>
      <Accordion type="multiple" className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger className="cursor-pointer">
              <p className="text-2xl">{faq.question}</p>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-xl">{faq.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>{" "}
    </main>
  );
};

export default LandingPage;
