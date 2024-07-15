import { Calendar, MapPin, ArrowRight, Settings2, X } from "lucide-react";
import { Button } from "../../../components/button";
import { useState } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";


interface DestinationAndDateStepProps {
    isGuestInputOpen: boolean;
    openGuestInput: () => void;
    closeGuestInput: () => void;
    setDestination: (destination: string) => void;
    setEventStartAndEndDates: (eventStartAndEndDates: DateRange | undefined) => void;
    eventStartAndEndDates: DateRange | undefined;
}

export function DestinationAndDateStep({
    isGuestInputOpen,
    eventStartAndEndDates,
    openGuestInput,
    closeGuestInput,
    setDestination,
    setEventStartAndEndDates,
}: DestinationAndDateStepProps) {

    const [isDatePickerOpen , setIsDatePickerOpen] = useState(false);


    function openDatePicker() {
        setIsDatePickerOpen(true);
    }

    function closeDatePicker() {
        setIsDatePickerOpen(false);
    }

    const displayDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
      ? format(eventStartAndEndDates.from , "d 'de' LLL'.'").concat(
          " a ",
          format(eventStartAndEndDates.to, "d 'de' LLL'.'")
        )
      : "Selecione a data";



    return (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className="flex items-center gap-2 flex-1">
                <MapPin className="size-5 text-zinc-400" />
                <input
                    disabled={isGuestInputOpen}
                    type="text"
                    placeholder="Para onde você vai?"
                    className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                    onChange={(event) => setDestination(event.target.value)}
                />
            </div>

            <button onClick={openDatePicker} disabled={isGuestInputOpen} className="flex items-center gap-2 text-left w-[240px]">
                <Calendar className="size-5 text-zinc-400" />
                <span
                    className=" text-lg placeholder-zinc-400 w-40 flex-1 "
                >
                    {displayDate || "Quando"}
                </span>
            </button>

            {isDatePickerOpen && (

            <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className=" rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Selecione a data</h2>
                        <button onClick={closeDatePicker}>
                            <X className="size-5 text-zinc-400" />
                        </button>
                    </div>
                </div>
            <DayPicker
              mode = "range"
              selected={eventStartAndEndDates}
              onSelect={setEventStartAndEndDates}
              className="text-zinc-300 min-w-full"
            />
            </div>
        </div>
            )}


            <div className="w-px h-6 bg-zinc-800"></div>

            {isGuestInputOpen ? (
            <Button onClick={closeGuestInput} variant="secondary" size="default">
                Alterar local/data
                <Settings2 size={20} className="text-zinc-200" />
            </Button>
            ) : (
            <Button onClick={openGuestInput} variant="primary" size="default">
                Continuar
                <ArrowRight size={20} className="text-lime-950" />
            </Button>
            )}
        </div>
    );
}
