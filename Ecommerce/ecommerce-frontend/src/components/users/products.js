import { useState, useEffect } from "react";
import {Link} from 'react-router-dom'

const UserProducts = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:8080/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleClick = async (product) => {
    const userId = localStorage.getItem("userId");
    const productId = product._id
    const response = await fetch('http://localhost:8080/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body :  JSON.stringify({ userId, productId })
    });

    const data = await response.json()
    if(data.message === 'Product added to cart.'){
        alert("item added to cart");
    }
    else{
      alert("Unexpected Error occured");
    }
  }


  return (
    <>
    <div className="mt-6">
        <Link to="/cart">
            <button className="bg-blue-600 w-32 mb-6 mt-6 ml-20">My Cart</button>
        </Link>
    </div>
    { products ?
     <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
       {products.map((product) => (
         <div key={product._id} className="group relative">
           <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
             <img
               alt={product.image}
               src={product.image}
               className="h-full w-full object-cover object-center lg:h-full lg:w-full"
             />
           </div>
           <div className="mt-4 flex justify-between">
             <div>
               <h3 className="text-sm text-gray-700">
               </h3>
               <p className="mt-1 text-sm text-gray-500">{product.name}</p>
             </div>
             <p className="text-sm font-medium text-gray-900">{product.price}</p>
           </div>
           <div>
               <h3 className="text-sm text-gray-700">
               </h3>
               <p className="mt-1 text-sm text-gray-500">{product.features}</p>
             </div>
           <div>
             <button  className=" mt-5 w-32 bg-orange-600" onClick={() => handleClick(product)}>add to cart</button>
           </div>
         </div>
       ))}
     </div>
: <h1>
 Loading
</h1> }
    </>
  );
}

export default UserProducts;