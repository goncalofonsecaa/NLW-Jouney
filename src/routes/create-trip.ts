import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import dayjs from "dayjs";
import { z } from 'zod';
import { prisma } from "../lib/prisma";
import { getMailClient } from "../lib/mail";
import nodemailer from 'nodemailer';
import localizadeFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');
dayjs.extend(localizadeFormat);

export async function createTrip(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post("/trips", {
        schema: {
            body: z.object({
                destination: z.string().min(4),
                starts_at: z.coerce.date(),
                ends_at: z.coerce.date(),
                owner_name: z.string(),
                owner_email: z.string().email(),
                emails_to_invite: z.array(z.string().email())
            })
        }
    }, async (request) => {
        const { destination, starts_at, ends_at, owner_name, owner_email, emails_to_invite } = request.body;

        if (dayjs(starts_at).isBefore(new Date())) {
            throw new Error("Invalid Trip Start Date");
        }

        if (dayjs(ends_at).isBefore(starts_at)) {
            throw new Error("Invalid Trip End Date");
        }

        const trip = await prisma.trip.create({
            data: {
                destination,
                starts_at,
                ends_at,
                participants: {
                    createMany: {
                        data: [
                            {
                                name: owner_name,
                                email: owner_email,
                                is_owner: true,
                                is_confirmed: true,
                            },
                            ...emails_to_invite.map(email => {
                                return {
                                    email
                                }
                            })
                        ]
                    }
                }
            }
        });

        const formattedStartsAt = dayjs(starts_at).format('LL');
        const formattedEndsAt = dayjs(ends_at).format('LL');

        const confirmationLink = `http://localhost:3333/trips/${trip.id}/confirm`;

        const mail = await getMailClient();

        const message = await mail.sendMail({
            from: {
                name: "Trip Planner",
                address: "oi@planner.er",
            },
            to: {
                name: owner_name,
                address: owner_email,
            },
            subject: `Confirme sua viagem para ${destination} EM ${formattedStartsAt}`,
            html: `
            <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6">
                <p>Você solicitou a criação de uma viagem para <strong>${destination}</strong> nas datas de <strong> ${formattedStartsAt} </strong> a <strong> ${formattedEndsAt} </strong>.</p>
                <p>Para confirmar a viagem, clique no link abaixo:</p>
                <p><a href="${confirmationLink}">Confirmar viagem</a></p>
                <p>Caso você não tenha solicitado a criação da viagem, por favor, ignore este e-mail.</p>
            </div>
            `.trim()
        });

        console.log(nodemailer.getTestMessageUrl(message));

        return { tripId: trip.id };
    });
}