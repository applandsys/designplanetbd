"use client";

import { Carousel, Typography, Button } from "@material-tailwind/react";
import Image from "next/image";

export default function ImageSlider() {

    return (
        <Carousel
            className="rounded-xl"
            prevArrow={({ handlePrev }) => (
                <button
                    onClick={handlePrev}
                    className="!absolute top-2/4 left-4 grid h-10 w-10 place-items-center rounded-full bg-green-500 text-white shadow-md hover:bg-green-600"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>
            )}
            nextArrow={({ handleNext }) => (
                <button
                    onClick={handleNext}
                    className="!absolute top-2/4 right-4 grid h-10 w-10 place-items-center rounded-full bg-green-500 text-white shadow-md hover:bg-green-600"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            )}
        >
            <div className="relative h-full w-full">


                <Image    className="h-full w-full object-cover"  src={`${config.publicPath}/images/slider/slider-1.png`} alt="..." width={500} height={300} />
                <div className="absolute inset-0 grid h-full w-full place-items-center ">
                    <div className="w-3/4 text-left ">
                        <Typography
                            variant="h1"
                            color="black"
                            className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                        >
                           Fresh Vegetables Big Discount
                        </Typography>
                        <Typography
                            variant="lead"
                            color="black"
                            className="mb-12 opacity-80"
                        >
                            Save upt0 50% at your first order
                        </Typography>
                        {/*<div className="flex justify-center gap-2">*/}
                        {/*    <Button size="lg" color="white">*/}
                        {/*        Explore*/}
                        {/*    </Button>*/}
                        {/*    <Button size="lg" color="white" variant="text">*/}
                        {/*        Gallery*/}
                        {/*    </Button>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
            <div className="relative h-full w-full">
                <Image     src={`${config.publicPath}/images/slider/slider-2.png`} alt="..." width={500} height={300}  className="h-full w-full object-cover"/>
                <div className="absolute inset-0 grid h-full w-full place-items-center ">
                    <div className="w-3/4 text-left ">
                        <Typography
                            variant="h1"
                            color="black"
                            className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                        >
                            Fresh Vegetables Big Discount
                        </Typography>
                        <Typography
                            variant="lead"
                            color="black"
                            className="mb-12 opacity-80"
                        >
                            Save upt0 50% at your first order
                        </Typography>
                    </div>
                </div>
            </div>
        </Carousel>
    );
}