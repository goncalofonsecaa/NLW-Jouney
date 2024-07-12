import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../lib/prisma";
import { getMailClient } from "../lib/mail";
import nodemailer from 'nodemailer';
import { dayjs } from "../lib/dayjs";
import { ClientError } from "../errors/client-error";
import { env } from "../env";

export async function createInvite(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post("/trips/:tripId/invites", {
        schema: {
            params: z.object({
                tripId: z.string().uuid(),
            }),
            body: z.object({
                email: z.string().email(),
            })
        }
    }, async (request) => {
        const { tripId } = request.params;
        const { email } = request.body;

        const trip = await prisma.trip.findUnique({
            where: {
                id: tripId
            }
        });

        if (!trip) {
            throw new ClientError("Trip not found");
        }

        const participant = await prisma.participant.create({
            data: {
                email,
                trip_id: tripId
            }
        });

        const formattedStartsAt = dayjs(trip.starts_at).format('LL');
        const formattedEndsAt = dayjs(trip.ends_at).format('LL');

        const mail = await getMailClient();
        const confirmationLink = `${env.API_BASE_URL}/participants/${participant.id}/confirm`;

        const message = await mail.sendMail({
            from: {
                name: "Trip Planner",
                address: "oi@planner.er",
            },
            to: email,
            subject: `Confirme sua viagem para ${trip.destination} EM ${formattedStartsAt}`,
            html: `
            <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6">
                <p>Você foi convidado(a) para participar de uma viagem <strong>${trip.destination}</strong> nas datas de <strong>${formattedStartsAt}</strong> a <strong>${formattedEndsAt}</strong>.</p>
                <p>Para confirmar sua presença na viagem, clique no link abaixo:</p>
                <p><a href="${confirmationLink}">Confirmar viagem</a></p>
                <p>Caso você não tenha solicitado a criação da viagem, por favor, ignore este e-mail.</p>
            </div>
            `.trim()
        });

        console.log(nodemailer.getTestMessageUrl(message));

        
        return { participantId: participant.id };
    });
}
