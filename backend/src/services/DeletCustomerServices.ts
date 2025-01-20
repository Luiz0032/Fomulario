import prismaClient from "../prisma"

interface DeletCustomerProps{
    id: string
}

class DeletCustomerServices{
    async execute({id}: DeletCustomerProps){

        if(!id){
            throw new Error("Solicitação invalida, o ID pode ser inexistente")
        }

        const findCustomer = await prismaClient.customer.findFirst({
            where:{
                id:id
            }
        })

        if(!findCustomer){
            throw new Error("Cliente não existente")
        }

        await prismaClient.customer.delete({
            where:{
                id: findCustomer.id
            }
        })

        return { message: "Deletado com sucesso!" }
    }
}

export {DeletCustomerServices}