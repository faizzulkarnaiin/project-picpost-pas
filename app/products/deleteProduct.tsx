"use client";

import { useState } from "react";
import { json } from "stream/consumers";
import { useRouter } from "next/navigation";
type Product = {
    id: number;
    title: string;
    price: number;
  };
export default function DeleteProduct(product: Product) {
  const [modal, setModal] = useState(false);
  const [isMutating, setisMutating] = useState(false);
  const router = useRouter();
  function handleChange() {
    setModal(!modal);
  }

  async function handleDelete(productId:number) {
    setisMutating(true);
    await fetch(`http://localhost:5000/products/${productId}`, {
      method: "DELETE",
    });
    setisMutating(false);
    router.refresh();
    setModal(false);
  }
  return (
    <div className="">
      <button className="btn btn-error btn-sm" onClick={handleChange}>
        Delete
      </button>
      <input
        type="checkbox"
        className="modal-toggle"
        checked={modal}
        onChange={handleChange}
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you sure to delete {product.title}
          </h3>

          <div className="modal-action">
            <button className="btn" type="button" onClick={handleChange}>
              Close
            </button>
            {!isMutating ? (
              <button className="btn btn-primary" type="button" onClick={()=> handleDelete(product.id)}>
                Delete
              </button>
            ) : (
              <button className="btn loading" type="button">
                Deleting..
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
