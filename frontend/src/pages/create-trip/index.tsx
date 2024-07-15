
import { FormEvent, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { InviteGuestsModal } from "./invite-guests-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";
import { InviteGuestsStep } from "./steps/invite-guests-step";


export function CreateTripPage() {

  const navigate = useNavigate();

  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

  const [emailsToInvite, setEmailsToInvite] = useState([
    'goncalo@teste.com'
  ]);

  function openGuestInput() {
    setIsGuestInputOpen(true);
  }

  function closeGuestInput() {
    setIsGuestInputOpen(false);
  }

  function openGuestModal() {
    setIsGuestModalOpen(true);
  }

  function closeGuestModal() {
    setIsGuestModalOpen(false);
  }

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true);
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false);
  }


  function addNewEmailToInvite (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData (event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email) {
      return
    }

    if ( emailsToInvite.includes(email)) {
      return
    }

    setEmailsToInvite([
      ...emailsToInvite,
      email as string
    ])
    event.currentTarget.reset()
  }

  function removeEmailFromInvites(emailToRemove: string) {

    const newEmailsList = emailsToInvite.filter( email => email !== emailToRemove)

    setEmailsToInvite(newEmailsList)
    
}

 function createTrip ( event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigate('/trip/1')
 }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="space-y-4">

          <DestinationAndDateStep
            isGuestInputOpen={isGuestInputOpen}
            openGuestInput={openGuestInput}
            closeGuestInput={closeGuestInput}
          />


          {isGuestInputOpen && (
              <InviteGuestsStep 
                openGuestModal={openGuestModal}
                openConfirmTripModal={openConfirmTripModal}
                emailsToInvite={emailsToInvite}
              />
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda
          <br />
          com nossos{" "}
          <a className="text-zinc-300 underline" href="#">
            termos de uso
          </a>{" "}
          e{" "}
          <a className="text-zinc-300 underline" href="#">
            políticas de privacidade.
          </a>
        </p>
      </div>

      {isGuestModalOpen && (
            <InviteGuestsModal
              emailsToInvite={emailsToInvite}
              addNewEmailToInvite={addNewEmailToInvite}
              removeEmailFromInvites={removeEmailFromInvites}
              closeGuestsModal={closeGuestModal}
            />
      )}

{isConfirmTripModalOpen && (
        <ConfirmTripModal
          closeConfirmTripModal={closeConfirmTripModal}
          createTrip={createTrip}
        />
      )}
    </div>
  );
}