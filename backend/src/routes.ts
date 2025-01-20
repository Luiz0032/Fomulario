import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import { CreatCustomerController } from "./controllers/CreatCustomerController";
import {ListCustomersController} from "./controllers/ListCustomersController"
import {DeletCustomerController} from "./controllers/DeletCustomerController"

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.get(
    "/teste",
    async (request: FastifyRequest, replay: FastifyReply) => {
      return { ok: true };
    }
  )

  fastify.post("/customer", async(request:FastifyRequest, reply:FastifyReply)=> {
    return new CreatCustomerController().hendle(request, reply)
  });

  fastify.get("/customers", async(request:FastifyRequest, reply:FastifyReply)=> {
    return new ListCustomersController().hendle(request, reply)
  });

  fastify.delete("/customer", async(request:FastifyRequest, reply:FastifyReply)=> {
    return new DeletCustomerController().hendle(request, reply)
  });
}
