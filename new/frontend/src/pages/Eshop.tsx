import { useState, useEffect } from "react";
import Pen from "../components/Pen";

function Eshop() {
  const [pens, setPens] = useState<Pen[]>([]);

  useEffect(() => {
    fetch("http://localhost:1111/pens")
      .then((res) => res.json())
      .then((data) => {
        setPens(data.pens);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      <div className="container">
        <div className="mb-4">
          <h1 className="display-4 text-center">Tužky</h1>
        </div>
        <div className="row">
          {pens.map((pen) => (
            <div className="col-md-4" key={pen._id}>
              <Pen data={pen} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Eshop;
