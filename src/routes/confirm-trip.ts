import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import 'dayjs/locale/pt-br';
import { z } from 'zod';



export async function confirmTrip(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get("/trips/:tripId/confirm", {
        schema: {
            params: z.object({
                tripId: z.string()
            })
        }
    }, async (request) => {
        const { tripId } = request.params;


        return { tripId: tripId };
    });
}
