import { FastifyRequest, FastifyReply } from "fastify"
import { DeletCustomerServices } from '../services/DeletCustomerServices'

class DeletCustomerController{
    async hendle(request: FastifyRequest, replay: FastifyReply){
        const{ id } = request.query as { id: string }

        const customerService = new DeletCustomerServices();

        const customer = await customerService.execute({id})

        replay.send(customer);

    }

}

export{ DeletCustomerController }