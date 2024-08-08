import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {


    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [features, setFeatures] = useState('');
    const [image, setImage] = useState('');
    const navigate = useNavigate();


    const handleSubmit= async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8080/products', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ name, price, features, image}),
          });

          const data = await response.json()
          if(data.success){
            navigate('/superadmin/products')
          }
          else{
            alert("try again")
          }
    }

    return(<>
      <form onSubmit={(e) => handleSubmit(e)}>
      <div className="space-y-12 ml-8 mt-6 justify-center mr-8">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Add product</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            add the name, price, feature and an image link for thr product
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="product name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                Price
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="product price"
                    value={price}
                    onChange={(e)=>setPrice(e.target.value)}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">
                Link of Image
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="image"
                    name="image"
                    type="text"
                    value={image}
                    onChange={(e)=>setImage(e.target.value)}
                    placeholder="product image"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                features
              </label>
              <div className="mt-2">
                <input
                  id="about"
                  name="about"
                  rows={3}
                  value={features}
                  onChange={(e)=>setFeatures(e.target.value)}
                  className="block  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about the product.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-start ml-6 gap-x-6 mr-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 w-56 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
    </>)
}

export default AddProducts;