import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface Pen {
  _id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
}

function PenDetails() {
  const { id } = useParams(); // Get the pen ID from the URL

  const [pen, setPen] = useState<Pen | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch("http://localhost:1111/pen/" + id)
      .then((res) => res.json())
      .then((data) => {
        setPen(data.pen);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);

  if (!pen) return <div>Loading...</div>; // Display a loading message while fetching data

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <img
              src="/pen-image.jpg"
              alt={pen.title}
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-6">
            <h1>{pen.title}</h1>
            <p>{pen.description}</p>
            <div className="mb-3">
              <strong>Price:</strong> ${pen.price.toFixed(2)}
            </div>
            <div className="mb-3">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value)))
                }
                className="form-control"
                min="1"
                max={pen.quantity}
              />
            </div>
            <div className="mb-3">
              <strong>Total Price:</strong> ${(pen.price * quantity).toFixed(2)}
            </div>
            <button className="btn btn-primary" disabled={quantity <= 0}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PenDetails;
