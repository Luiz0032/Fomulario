import { FastifyRequest, FastifyReply } from "fastify"
import { CreatCustomerService } from '../services/CreatCustomerServices'

class CreatCustomerController{
    async hendle(request: FastifyRequest, replay: FastifyReply){
        const{ name, email, fone} = request.body as { name: string, email: string, fone: string};
        console.log(name);
        console.log(email);
        console.log(fone)

        const customerService = new CreatCustomerService()

        const customer = await customerService.execute({name, email, fone});

        replay.send(customer)

    }
}

export { CreatCustomerController }