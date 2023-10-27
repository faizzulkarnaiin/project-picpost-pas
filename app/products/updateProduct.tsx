"use client";

import { useState, SyntheticEvent } from "react";
import { json } from "stream/consumers";
import { useRouter } from "next/navigation";
type Product = {
    id: number;
    title: string;
    price: number;
  };
export default function UpdateProduct(product: Product) {
  const [modal, setModal] = useState(false);
  const [isMutating, setisMutating] = useState(false);
  const [title, setTitle] = useState(product.title);
  const [price, setprice] = useState(product.price);
  const router = useRouter();
  function handleChange() {
    setModal(!modal);
  }

  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();
    setisMutating(true);
    await fetch(`http://localhost:5000/products/${product.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        price,
      }),
    });
    setisMutating(false);
    
    router.refresh();
    setModal(false);
  }
  return (
    <div className="">
      <button className="btn btn-info btn-sm" onClick={handleChange}>
        Edit
      </button>
      <input
        type="checkbox"
        className="modal-toggle"
        checked={modal}
        onChange={handleChange}
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit {product.title}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="label font-bold">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Product Name"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Price</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setprice(Number(e.target.value))}
                className="input w-full input-bordered"
                placeholder="Price"
              />
            </div>
            <div className="modal-action">
              <button className="btn" type="button" onClick={handleChange}>
                Close
              </button>
              {!isMutating ? (
                <button className="btn btn-primary" type="submit">
                  Update
                </button>
              ) : (
                <button className="btn loading" type="button">
                  Updating..
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
