import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Ripple,
  Input,
  initTE,
} from "tw-elements";

function AddCompany() {

  useEffect(()=>{
    initTE({ Ripple, Input });
  })
  const [formData, setFormData] = useState({
    Name: '',
    Address: '',
    companyRegID: '',
    industry: '',
    contactNumber: '',
    email: '',
    companyDetails:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:1337/company/add', formData)
      .then((response) => {
        console.log('Company added successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error adding company:', error);
      });
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-4 sm:py-15  lg:px-8">
      <h1 className="text-2xl lg:text-4xl font-bold py-6 text-center">Add a Company</h1>
     <div className='shadow-lg border-2 p-8 rounded-lg'>
     <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-lg lg:text-xl  mb-2">Name:</label>
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-lg lg:text-xl  mb-2">Address:</label>
          <input
            type="text"
            name="Address"
            value={formData.Address}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-lg lg:text-xl  mb-2">Company Reg ID:</label>
          <input
            type="text"
            name="companyRegID"
            value={formData.companyRegID}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-lg lg:text-xl  mb-2">Industry:</label>
          <input
            type="text"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-lg lg:text-xl  mb-2">Contact Number:</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-lg lg:text-xl  mb-2">Email:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-lg lg:text-xl  mb-2">company description:</label>
          <textarea
            type="text"
            name="companyDetails"
            value={formData.companyDetails}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className='mt-10'>
          <button
            type="submit"
            className="bg-blue-500 text-white  py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Submit
          </button>
        </div>
      </form>
     </div>
     {/* <div
  class="block max-w-md rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
  <form>
    <div class="grid grid-cols-2 gap-4">

      <div class="relative mb-6" data-te-input-wrapper-init>
        <input
          type="text"
          class=" peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
          id="exampleInput123"
          aria-describedby="emailHelp123"
           />
        <label
          for="emailHelp123"
          class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
          >First name
        </label>
      </div>

  
      <div class="relative mb-6" data-te-input-wrapper-init>
        <input
          type="text"
          class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
          id="exampleInput124"
          aria-describedby="emailHelp124"
        />
        <label
          for="exampleInput124"
          class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
          >Last name
        </label>
      </div>
    </div>


    <div class="relative mb-6" data-te-input-wrapper-init>
      <input
        type="email"
        class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        id="exampleInput125"
        />
      <label
        for="exampleInput125"
        class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
        >Email address
      </label>
    </div>


    <div class="relative mb-6" data-te-input-wrapper-init>
      <input
        type="password"
        class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        id="exampleInput126"
      />
      <label
        for="exampleInput126"
        class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
        >Password
      </label>
    </div>


    <div
      class="mb-6 flex min-h-[1.5rem] items-center justify-center pl-[1.5rem]">
      <input
        class="relative float-left -ml-[1.5rem] mr-[6px] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary"
        type="checkbox"
        value=""
        id="exampleCheck25" />
      <label
        class="inline-block pl-[0.15rem] hover:cursor-pointer"
        for="exampleCheck25">
        Subscribe to our newsletter
      </label>
    </div>


    <button
      type="submit"
      class="inline-block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
      data-te-ripple-init
      data-te-ripple-color="light">
      Sign up
    </button>
  </form>
</div> */}
    </div>
  );
}

export default AddCompany;
