import { FastifyRequest, FastifyReply } from "fastify";
import { ListCustomersService } from "../services/ListCustomersService";

class ListCustomersController{
    async hendle(request: FastifyRequest, replay: FastifyReply){
        const ListCustomerService = new ListCustomersService();

        const customers = await ListCustomerService.execute();

        replay.send(customers);
    }
}

export {ListCustomersController}