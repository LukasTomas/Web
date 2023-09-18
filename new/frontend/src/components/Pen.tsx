import { Link } from "react-router-dom";

interface Pen {
  _id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
}

interface Props {
  data: Pen;
}

function Pen({ data }: Props) {
  return (
    <div className="card mb-4">
      <Link to={`/pen/${data._id}`}>
        <img src={data.imageUrl} className="card-img-top" alt={data.title} />
        <div className="card-body">
          <h5 className="card-title">{data.title}</h5>
          <p className="card-text">{data.description}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="font-weight-bold text-success h4">
              ${data.price}
            </div>
            <div>
              <span className="badge badge-primary">
                {data.quantity} in stock
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Pen;
