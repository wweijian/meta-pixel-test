"use client";

import Link from "next/link";
import { useState } from "react";
import { type Product, sizes } from "@/lib/products";
import { addToCart } from "@/lib/shop-store";
import { Icon } from "./icons";

export function QuickAdd({ product }: { product: Product }) {
  const [size, setSize] = useState(9);
  const [message, setMessage] = useState("");
  const [added, setAdded] = useState(false);

  function add() {
    const success = addToCart(product.id, size);
    setAdded(success);
    setMessage(success ? `US ${size} added to your cart.` : "Maximum 99 pairs per size.");
  }

  return (
    <div className="quick-add">
      <div className="quick-add-controls">
        <select
          aria-label={`Size for ${product.name}`}
          value={size}
          onChange={(event) => {
            setSize(Number(event.target.value));
            setMessage("");
            setAdded(false);
          }}
        >
          {sizes.map((value) => <option key={value} value={value}>US {value}</option>)}
        </select>
        <button type="button" className="button button-dark" onClick={add}>
          Add to cart <Icon name="bag" width="16" height="16" />
        </button>
      </div>
      <div className="quick-add-feedback" role="status">
        {message}{added && <> <Link href="/cart">View cart →</Link></>}
      </div>
    </div>
  );
}
