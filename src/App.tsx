import React from 'react';
import './App.css';
import {useForm} from "react-hook-form";
import axios, {AxiosError} from "axios";


export type FormType = {
  liquidaciones: File[];
}

function App() {

  const {register, handleSubmit} = useForm<FormType>();

  const onSubmit = (data: FormType) => {
    console.log("Entre")
    let formData = new FormData();

    formData.append("register_id", "1");
    formData.append("identity_type_id", "1");
    formData.append("name", "Conde");
    formData.append("lastname", "Chupacula");
    formData.append("dni", "1395234");
    formData.append("phone", "6666666");
    formData.append("address", "transilvania");

    for (const liquidacion of data.liquidaciones) {
      formData.append("liquidaciones", new Blob([liquidacion]))
    }

    axios.post('https://desafiolatam-backend.azurewebsites.net/api/register_form/guarantee',formData)
        .then((response: any) => console.log("List =>", response.data))
        .catch((error: AxiosError) => console.log("Error =>", error))
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Subir archivos</h1>
        <form encType={"multipart/form-data"} onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center">
            <div className="mb-3 w-96">
              <input
                  className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 dark:border-neutral-600 bg-clip-padding py-[0.32rem] px-3 text-base font-normal text-neutral-700 dark:text-neutral-200 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 dark:file:bg-neutral-700 file:px-3 file:py-[0.32rem] file:text-neutral-700 dark:file:text-neutral-100 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none"
                  type="file"
                  id="formFileMultiple"
                  multiple
                  {...register("liquidaciones", {required: true})}
              />
            </div>
          </div>
          <button type={"submit"}>Subir</button>
        </form>
      </header>
    </div>
  );
}

export default App;