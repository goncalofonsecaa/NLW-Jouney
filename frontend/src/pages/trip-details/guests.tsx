import { CheckCircle, CircleDashed, UserCog } from 'lucide-react';
import { Button } from '../../components/button';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface Participant {
  id: string;
  name?: string;
  email: string;
  is_confirmed?: boolean; // Added this to ensure type consistency
}

export function Guests() {
  const { tripId } = useParams();
  const [participants, setParticipants] = useState<Participant[] | undefined>();

  useEffect(() => {
    api.get(`/trips/${tripId}/participants`)
      .then(response => setParticipants(response.data.participants));
  }, [tripId]);

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl text-zinc-300">Convidados</h2>

      <div className="space-y-5">
        {participants?.map((participant: Participant, index) => (
          <div
            key={participant.id}
            className="flex justify-between items-center gap-4"
          >
            <div className="space-y-1.5 flex flex-col flex-1">
              <span className="text-zinc-300">
                {participant.name} {index}
              </span>
              <span className="text-zinc-400 text-xs truncate">
                {participant.email}
              </span>
            </div>
            {participant.is_confirmed ? (
              <CheckCircle size={24} className="text-green-400" />
            ) : (
              <CircleDashed size={24} className="text-zinc-400" />
            )}
          </div>
        ))}
      </div>

      <Button
        /* onClick={closeGuestInput} */
        variant="secondary"
        size="full"
      >
        <UserCog size={20} className="text-zinc-200" />
        Gerenciar Convidados
      </Button>
    </div>
  );
}