"use client";
import React, {ChangeEvent} from "react";
import {
    IconBrandGithub,
    IconBrandGoogle,
    IconBrandOnlyfans,
} from "@tabler/icons-react";
import {useRef, useState} from "react";
import Image from "next/image";
import Map from "@/app/components/Map";

interface FormProps {
    selectedDay: Date | null;
}

interface calendarEvent
{
    title: string,
    description: string,
    eventUrl: string,
    meetingUrl: string,
    coverImage: File | null,
    startTime: string,
    endDateTime: string,
    date: {
        year: number | null,
        month: number | null,
        day: number | null,
    }
}


const Form:React.FC<FormProps> = ({selectedDay}) => {

    const [newCalendarEvent, setNewCalendarEvent] = useState<calendarEvent>({
        title: "",
        description: "",
        eventUrl: "",
        meetingUrl: "",
        coverImage: null,
        startTime: "",
        endDateTime: "",
        date: {
            year: null,
            month: null,
            day: null,
        }
    });


    const [imageFile, setImageFile] = useState<File | null>(null);

    const ref = useRef<HTMLInputElement>(null);
    const handleOnClick = () => {
        if (ref.current) {
            ref.current.click();
            console.log(selectedDay)
        }
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
        }
    };
    const handleSubmit = () => {
        console.log(newCalendarEvent);
        try{
            const response = fetch('http://localhost:8080/api/v1/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: newCalendarEvent.title,
                    description: newCalendarEvent.description,
                    eventUrl: newCalendarEvent.eventUrl,
                    meetingUrl: newCalendarEvent.meetingUrl,
                    coverImage: newCalendarEvent.coverImage,
                    startTime: newCalendarEvent.startTime,
                    endDateTime: newCalendarEvent.endDateTime,
                    date: {
                        year: selectedDay?.getFullYear(),
                        month: selectedDay?.getMonth(),
                        day: selectedDay?.getDate(),
                    }

                }),
            });
        }catch(error){
            console.error('Error:', error);
        }
    };
    const [selectedOption, setSelectedOption] = useState("selecciona una modalidad");

    const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value);
    };
    return (

        <div className=" w-full h-full  mx-auto rounded-none md:rounded-2xl md:p-8 shadow-input bg-white dark:bg-black grid grid-cols-1 2xl:grid-cols-2">
            <div className="px-6 sticky top-0">
                <div className="flex flex-col gap-4 p-6">
                    <select
                        className="flex self-center h-10 max-w-[400px] border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] group-hover/input:shadow-none transition duration-400"
                        value={selectedOption} onChange={handleOptionChange}>
                        <option disabled>selecciona una modalidad</option>
                        <option value="presencial">Presencial</option>
                        <option value="en-linea">En línea</option>
                    </select>
                    {selectedOption === "presencial" && (
                        <div className="flex flex-col gap-4">
                            <Map/>
                            <input
                                className="flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] group-hover/input:shadow-none transition duration-400"
                                type="text" placeholder="URL del evento" name="eventUrl"/>
                            <div className="flex flex-row gap-6 items-center justify-center">
                                <div className="flex flex-col items-center justify-center">
                                    <label htmlFor="startTime">Start Time</label>
                                    <input
                                        className="flex h-10 w-auto border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] group-hover/input:shadow-none transition duration-400"
                                        type="time" placeholder="Hora de inicio" name="startTime"/>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <label htmlFor="endDateTime">End Date Time</label>
                                    <input
                                        className="flex h-10 w-auto border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] group-hover/input:shadow-none transition duration-400"
                                        type="datetime-local" placeholder="Fecha y hora de finalización" name="endDateTime"/>
                                </div>
                            </div>
                        </div>
                    )}
                    {selectedOption === "en-linea" && (
                        <div className="flex flex-col gap-8">
                            <input
                                className="flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] group-hover/input:shadow-none transition duration-400"
                                type="text" placeholder="URL del evento" name="eventUrl"/>
                            <input
                                className="flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] group-hover/input:shadow-none transition duration-400"
                                type="text" placeholder="URL de la reunión" name="meetingUrl"/>
                            <div className="flex flex-row gap-6 items-center justify-center">
                                <div className="flex flex-col items-center justify-center">
                                    <label htmlFor="startTime">Start Time</label>
                                    <input
                                        className="flex h-10 w-auto border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] group-hover/input:shadow-none transition duration-400"
                                        type="time" placeholder="Hora de inicio" name="startTime"/>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <label htmlFor="endDateTime">End Date Time</label>
                                    <input
                                        className="flex h-10 w-auto border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] group-hover/input:shadow-none transition duration-400"
                                        type="datetime-local" placeholder="Fecha y hora de finalización"
                                        name="endDateTime"/>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className=" p-4 relative overflow-auto overflow-x-hidden">
                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                    Welcome to Aceternity
                </h2>
                <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                    Login to aceternity if you can because we don&apos;t have a login flow
                    yet
                </p>

                <div className="my-8" >
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4 justify-center">

                        <div className={
                            'flex flex-col w-full max-h-[400px] max-w-[400px] relative border border-gray-400 transition rounded-xl gap-2 p-1'
                        }
                        >
                            <label className="text-sm text-gray-400">Cover photo</label>

                            <button
                                className="flex relative flex-col justify-center items-center text-gray-400 border border-gray-400 border-dashed rounded-lg overflow-hidden bg-gray-200 aspect-[4/3]"
                                onClick={handleOnClick}
                            >
                                <input accept="image/*" type="file" className="hidden" ref={ref}
                                       onChange={handleFileChange}/>
                                {imageFile ? (
                                    <>
                                        <div
                                            className="absolute top-0 right-0 h-10 text-white mix-blend-difference p-2 z-50"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setImageFile(null);
                                            }}
                                        >
                                            {/* Add a close icon here */}
                                            X
                                        </div>
                                        {imageFile.type.startsWith('image') && (
                                            <Image className="object-contain aspect-video"
                                                   src={URL.createObjectURL(imageFile)}
                                                   alt="Activity image" fill/>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {/* Add a plus icon here */}
                                        <div className="text-sm">Agregar un archivo</div>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input
                            className="flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] group-hover/input:shadow-none transition duration-400"
                            id="title" placeholder="Event name" type="text" value={newCalendarEvent.title} onChange={(e) => {console.log(e.target.value); setNewCalendarEvent({...newCalendarEvent, title: e.target.value})} }/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description">Description</label>
                        <textarea
                            className=" resize-none h-36 flex w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] group-hover/input:shadow-none transition duration-400"
                            id="description" placeholder="set event description, max 400 characters" maxLength={400}/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="body">Body</label>
                        <textarea className=" resize-none h-56 flex  w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] group-hover/input:shadow-none transition duration-400"
                               id="body"
                               placeholder="Set event body, explain what the event is about, content, etc."
                        />
                    </div>
                    {/*<div className="mb-8">*/}
                    {/*    <label htmlFor="twitterpassword">Your twitter password</label>*/}
                    {/*    <input className="flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] group-hover/input:shadow-none transition duration-400"*/}
                    {/*        id="twitterpassword"*/}
                    {/*        placeholder="••••••••"*/}
                    {/*        type="twitterpassword"*/}
                    {/*    />*/}
                    {/*</div>*/}

                    <button
                        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                        onClick={handleSubmit}
                    >
                        Create Event
                        <BottomGradient />
                    </button>

                    <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                    {/*    <div className="flex flex-col space-y-4">*/}
                    {/*        <button*/}
                    {/*            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"*/}
                    {/*            type="submit"*/}
                    {/*        >*/}
                    {/*            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />*/}
                    {/*            <span className="text-neutral-700 dark:text-neutral-300 text-sm">*/}
                    {/*  GitHub*/}
                    {/*</span>*/}
                    {/*            <BottomGradient />*/}
                    {/*        </button>*/}
                    {/*        <button*/}
                    {/*            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"*/}
                    {/*            type="submit"*/}
                    {/*        >*/}
                    {/*            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />*/}
                    {/*            <span className="text-neutral-700 dark:text-neutral-300 text-sm">*/}
                    {/*  Google*/}
                    {/*</span>*/}
                    {/*            <BottomGradient />*/}
                    {/*        </button>*/}
                    {/*        <button*/}
                    {/*            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"*/}
                    {/*            type="submit"*/}
                    {/*        >*/}
                    {/*            <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />*/}
                    {/*            <span className="text-neutral-700 dark:text-neutral-300 text-sm">*/}
                    {/*  OnlyFans*/}
                    {/*</span>*/}
                    {/*            <BottomGradient />*/}
                    {/*        </button>*/}
                    {/*    </div>*/}
                </div>
            </div>
        </div>

    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
}

export default Form;