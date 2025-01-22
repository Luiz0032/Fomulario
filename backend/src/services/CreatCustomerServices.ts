import prismaClient from "../prisma";

interface CreateCustomerProps{
    name: string;
    email: string
    fone: string
}

class CreatCustomerService{
    async execute({ name, email, fone }: CreateCustomerProps){
        
        if(!name || !email || !fone){
            throw new Error("Preencha todos os campos")
        }

        const customer = await prismaClient.customer.create({
            data:{
                name,
                email,
                fone,
                status: true
            }
        })

        return customer
    }
}

export{CreatCustomerService}