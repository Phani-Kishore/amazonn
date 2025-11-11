
function data({data}){



    return(
        <div className="card mb-4">
            <div className="row">
                <div className="col-4">
                   <a href={"/product/" +data.id} target="_blank">
                   <img src={data.thumbnail} className="img-fluid rounded-start Mouse-pointer"/>
                   </a>
                </div>
                  <div className="col-8">
                      <div className="card-body">
                        <a href={"/product/" + data.id} target="_blank"><h5 className="card-tittle">{data.title}</h5></a>
                        <div className="card-text">{data.description}</div>
                        <h5 className="card-title"><i class="bi bi-currency-rupee"></i>{data.price}</h5>
                        <div><i className="bi bi-star-fill"></i>{data.rating} </div> 
                        <div className="text-danger">{data.availabilityStatus}</div>
                        </div>
                        <div className="mb-4">
                            <button className="btn btn-warning">Add to Cart</button> 
                        </div>
                      </div>
                  </div>
            </div>

    )
}

export default data