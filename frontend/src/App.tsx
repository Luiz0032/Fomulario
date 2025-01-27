import { useEffect, useState, useRef, FormEvent } from 'react'
import {FiTrash} from 'react-icons/fi'
import { api } from './services/api'

interface CustomersProps {
  id:string
  name: string
  email: string
  fone: string
  status: boolean
  created_at: string
}
export default function App() {

  const [customers, setCustumers] = useState<CustomersProps[]>([])
  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)
  const foneRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    loadCustomers();
  },[])


  async function loadCustomers(){
    const response = await api.get("/customers")
    setCustumers(response.data);
  }

async function hendleSubmit(event: FormEvent){
  event.preventDefault();

  if(!nameRef.current?.value || !emailRef.current?.value || !foneRef.current?.value) return;

    const response = await api.post("/customer", {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      fone: foneRef.current?.value
    })

    setCustumers(allCustomers => [...allCustomers, response.data])

    nameRef.current.value = ""
    emailRef.current.value = ""
    foneRef.current.value = ""

}

async function hendleDelet(id:string) {
  try{
    await api.delete("/customer", {
      params:{
        id: id,
      }
    })

    const allCustomers = customers.filter((customer) => customer.id !== id)
    setCustumers(allCustomers)

  } catch(err){
    console.log(err);
  }
}

  return (
    <div className="w-full min-h-screen h-14 bg-gradient-to-t from-indigo-100 via-indigo-600 to-white flex justify-center px-4">
      <main className="my-10 w-1/3 md:max-w-2xl border-2 bg-neutral-800 border-sky-600 p-5 rounded-lg shadow-xl shadow-sky-600">
        <h1 className="text-5xl font-medium text-white text-center">Formulario</h1>

        <form className="flex flex-col my-6" onSubmit={hendleSubmit}>
          <label className="font-medium text-white">Name:</label>
          <input type="text" placeholder="Digite seu nome completo..."
          className="w-full mb-5 p-2 rounded"
          ref={nameRef}
          />

          <label className="font-medium text-white">E-mail:</label>
          <input type="text" placeholder="Digite seu E-mail completo..."
          className="w-full mb-5 p-2 rounded"
          ref={emailRef}
          />

<label className="font-medium text-white">Telefone:</label>
          <input type="text" placeholder="Digite seu telefone completo..."
          className="w-full mb-5 p-2 rounded"
          ref={foneRef}
          />

          <input type="submit" value = "cadastro" className="cursor-pointer w-full p-2 bg-sky-600 text-white border-2 border-black font-bold rounded-xl hover:scale-105 duration-200"/>
        </form>

        <div className='max-h-96 overflow-y-auto absolute w-1/4 flex-auto flex-col items-center p-5 mx-12 scrollbar-thin scrollbar-thumb-sky-600 scrollbar-track-sky-300'>
          <section className="flex flex-col gap-4">
        {customers.map( (customer) => (
          <article
          key={customer.id}
          className="w-full bg-white rounded p-2 relative hover:scale-105 duration-200">
              <p><span className="font-medium">Nome:</span> {customer.name}</p>
              <p><span className="font-medium">E-mail:</span> {customer.email}</p>
              <p><span className="font-medium">Telefone:</span> {customer.fone}</p>
              <p><span className="font-medium">Status:</span> {customer.status ? "ativo": "INATIVO"}</p>

            <button className='bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 -top-2' onClick={() => hendleDelet(customer.id)}>
              <FiTrash size={18} color='#fff'/>
            </button>
          </article>))}
        </section>
        </div>
      </main>
    </div>
  )
}