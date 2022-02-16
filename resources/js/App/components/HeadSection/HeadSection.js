import React from 'react';

function HeadSection({ title, image }) {
    const bottomImages = [
        'saved', 'dashboard', 'update-profile', 'reset'
    ];

    return (
        <section className="page_breadcrumbs cover_breadcumbs ds section_padding_25" style={{ backgroundColor: '#ED0598' }}>
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

            <img src={`/frontend/img/parallax/${image}.png`} className='hide-on-mobile' style={bottomImages.includes(image) ? {
                position: 'absolute',
                width: '260px',
                right: '55px',
                bottom: 0
            } : {
                position: 'absolute',
                width: '260px',
                right: '55px',
                top: '50%',
                transform: 'translateY(-50%)'
            }} />
        </section>
    )
}

export default HeadSection