"use client";

import React from "react";
import Image from "next/image";
import { FaClinicMedical } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IconType } from "react-icons";
import Link from "next/link";
import { MdLocationOn } from "react-icons/md";

export default function LandingPage() {
  return (
    <>
      <Hero />
    </>
  );
}

const stats: { name: string; number: string; icon: IconType }[] = [
  {
    name: "Clinics Available",
    number: "120",
    icon: FaClinicMedical
  },
  {
    name: "Cities Covered",
    number: "45",
    icon: MdLocationOn
  },
  {
    name: "Doctors Registered",
    number: "300",
    icon: FaUser
  }
];

function Hero() {
  return (
    <div className="max-w-screen-xl mt-24 px-8 xl:px-16 mx-auto">
      <div className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 py-6 sm:py-16">
        <div className="flex flex-col justify-center items-start row-start-2 sm:row-start-1">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-primary leading-normal">
            Find and Book Medical Clinics Easily
          </h1>
          <p className="text-black-500 mt-4 mb-6">
            Your trusted platform to discover, review, and book clinics near
            you.
          </p>
          <Link
            href="/auth/register"
            className="py-3 lg:py-4 px-12 lg:px-16 text-white font-semibold rounded-lg hover:bg-primary-600 bg-primary transition-all outline-none"
          >
            Get Started
          </Link>
        </div>
        <div className="flex w-full">
          <div className="h-full w-full">
            <Image
              src="/hero.svg" // Update the image to a clinic/healthcare theme image
              alt="Clinic Booking Illustration"
              quality={100}
              width={612}
              height={383}
            />
          </div>
        </div>
      </div>
      <div className="relative w-full flex">
        <div className="rounded-lg w-full grid grid-flow-row sm:grid-flow-row grid-cols-1 sm:grid-cols-3 py-9 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-gray-100 bg-white z-10">
          {stats.map((stat, i) => (
            <div
              className="flex items-center justify-start sm:justify-center py-4 sm:py-6 w-8/12 px-4 sm:w-auto mx-auto sm:mx-0"
              key={i}
            >
              <div className="flex">
                <div className="flex items-center justify-center bg-[#B2DDFF] w-12 h-12 mr-6 rounded-full">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex flex-col">
                  <p className="text-xl text-black-600 font-bold">
                    {stat.number}+
                  </p>
                  <p className="text-lg text-black-500">{stat.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className="absolute bg-black-600 opacity-5 w-11/12 rounded-lg h-64 sm:h-48 top-0 mt-8 mx-auto left-0 right-0"
          style={{ filter: "blur(114px)" }}
        ></div>
      </div>
    </div>
  );
}
