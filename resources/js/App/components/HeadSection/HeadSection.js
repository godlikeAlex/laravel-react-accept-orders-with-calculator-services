import React from 'react';

function HeadSection({ title, image }) {
    return (
        <section className="page_breadcrumbs cover_breadcumbs ds section_padding_25" style={{ backgroundImage: `url('/frontend/img/parallax/breadcrumbs${image}.jpg')`, backgroundSize: 'cover' }}>
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 text-center">
                        <h1>{title}</h1>
                        <ol className="breadcrumb darklinks">
                            <li> <a href="/">
                                Home
                            </a> </li>
                            <li className="active"> <span>{title}</span> </li>
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeadSection