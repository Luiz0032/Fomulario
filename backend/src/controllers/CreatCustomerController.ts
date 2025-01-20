import { FastifyRequest, FastifyReply } from "fastify"
import { CreatCustomerService } from '../services/CreatCustomerServices'

class CreatCustomerController{
    async hendle(request: FastifyRequest, replay: FastifyReply){
        const{ name, email } = request.body as { name: string, email: string};
        console.log(name);
        console.log(email);

        const customerService = new CreatCustomerService()

        const customer = await customerService.execute({name, email});

        replay.send(customer)

    }
}

export { CreatCustomerController }