"use client";

import { useState, SyntheticEvent } from "react";
import { json } from "stream/consumers";
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const [modal, setModal] = useState(false);
  const [isMutating, setisMutating] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setprice] = useState("");
  const router = useRouter();
  function handleChange() {
    setModal(!modal);
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setisMutating(true);
    await fetch("http://localhost:5000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        price,
      }),
    });
    setisMutating(false);
    setTitle("");
    setprice("");
    router.refresh();
    setModal(false);
  }
  return (
    <div className="">
      <button className="btn" onClick={handleChange}>
        Add New
      </button>
      <input
        type="checkbox"
        className="modal-toggle"
        checked={modal}
        onChange={handleChange}
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Product</h3>
          <form onSubmit={handleSubmit}>
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
                onChange={(e) => setprice(e.target.value)}
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
                  Save
                </button>
              ) : (
                <button className="btn loading" type="button">
                  Saving..
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
