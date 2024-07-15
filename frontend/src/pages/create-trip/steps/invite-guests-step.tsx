import { ArrowRight, UserRoundPlus } from "lucide-react";
import { Button } from "../../../components/button";

interface InviteGuestsStepProps {
    openGuestModal: () => void;
    openConfirmTripModal: () => void;
    emailsToInvite: string[];
}


export function InviteGuestsStep (
    { openGuestModal, openConfirmTripModal, emailsToInvite }: InviteGuestsStepProps
) {
    return (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3 mt-4">
        <button type="button" onClick={openGuestModal} className="flex items-center gap-2 flex-1 text-left">
          <UserRoundPlus className="size-5 text-zinc-400" />
          {emailsToInvite.length > 0 ? (
            <span className="text-zinc-100">
              {emailsToInvite.length} convidados
            </span>
          ) : (
            <span className="text-zinc-400">Convidar amigos</span>
          )}
          <input
            type="text"
            placeholder=""
            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          />
        </button>

        <div className="w-px h-6 bg-zinc-800"></div>

        <Button onClick={openConfirmTripModal} variant="primary" size="default">
        Confirmar Viagem
        <ArrowRight size={20} className="text-lime-950" />
      </Button>
      </div>

        )
    }