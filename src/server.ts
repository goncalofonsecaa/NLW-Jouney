import fastify from "fastify";
import { createTrip } from "./routes/create-trip";
import { confirmTrip } from "./routes/confirm-trip";
import { confirmParticipants } from "./routes/confirm-participant";
import { createActivity } from "./routes/create-activity";
import { getActivities } from "./routes/get-activities";
import { createLink } from "./routes/create-link";
import { getLinks } from "./routes/get-links";

import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import cors from "@fastify/cors";


const app = fastify();

//cors 
app.register(cors, {
    origin: "*",
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);


app.register(createTrip)
app.register(confirmTrip)
app.register(confirmParticipants)
app.register(createActivity)
app.register(getActivities)
app.register(createLink)
app.register(getLinks)

app.listen({ port:3333 }).then (() => {
    console.log("Server is running on port 3333");
});