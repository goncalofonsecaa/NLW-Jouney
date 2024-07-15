import { MapPin, Calendar, Settings2,  } from 'lucide-react'; 
import { Button } from '../../components/button';
import {useParams} from 'react-router-dom'
import {api} from '../../lib/axios'
import { useEffect, useState } from 'react';
import { format } from 'date-fns';


interface Trip {
    id: string;
    destination: string;
    starts_at: string;
    ends_at: string;
}

export function DestinationAndDateHeader() {

    const { tripId } = useParams()
    const [trip, setTrip] = useState<Trip | undefined>()

    useEffect(() => {
        api.get(`/trips/${tripId}`)
        .then(response => setTrip(response.data.trip))
    }
    , [tripId])

    const displayedDate = trip
    ? format(new Date(trip.starts_at), "d 'de' LLL").concat(
        " a ",
        format(new Date(trip.ends_at), "d 'de' LLL")
      )
    : "Selecione a data";

    
    return (
        <div className="px-4 h-16 rounded-xl bg-zinc-800 shadow-shape flex items-center justify-between">
            <div className="flex items-center gap-2">
                <MapPin className="size-5 text-zinc-400" />
                <span className="text-zinc-400 text-lg">{trip?.destination}</span>
            </div>

            <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                    <Calendar className="size-5 text-zinc-400" />
                    <span className="text-zinc-400 text-lg"> {displayedDate} </span>
                </div>

                <div className="w-px h-6 bg-zinc-800"></div>

                <Button variant="secondary">
                Alterar local/data
                <Settings2 size={20} className="text-zinc-200" />
                </Button>

            </div>
        </div>
    );
}