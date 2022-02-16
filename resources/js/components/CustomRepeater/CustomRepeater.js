import React from 'react';

const CustomRepeater = ({ services, addMoreHandler, deleteHandler, updateHandler }) => {
    return (
        <div className="col-md-10" style={{ marginBottom: 15 }}>
            <h3 >Custom services</h3>
            <div className="row">
                {services.map((service, index) => (
                    <>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Service name</label>
                                <input
                                    type="text"
                                    value={service.name}
                                    onChange={(e) => updateHandler('name', e.target.value, index)}
                                    className="form-control"
                                />
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <label>Service price</label>
                                <input
                                    type="number"
                                    min={1}
                                    onChange={(e) => updateHandler('price', e.target.value, index)}
                                    value={service.price}
                                    className="form-control"
                                    step="any"
                                />
                            </div>
                        </div>

                        <div className="col-md-2">
                            <label>Actions</label>
                            <div className="form-group">
                                <a
                                    class="btn btn-block btn-danger btn-lg"
                                    style={{ height: 84, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                    onClick={() => deleteHandler(index)}
                                >
                                    Delete
                                </a>
                            </div>
                        </div>
                    </>
                ))}
            </div>
            <a
                class="btn btn-block btn-success btn-lg"
                onClick={addMoreHandler}
            >
                Add more
            </a>
        </div>
    )
}

export default CustomRepeater;
