import React from 'react';

function EmptyDashboard({ title }) {
    return (
        <section style={{ marginTop: 120, marginBottom: 120 }}>
            <h1 style={{ textAlign: 'center' }}>
                <ion-icon name="file-tray-outline" style={{ fontSize: 80 }}></ion-icon> <br />
                {title}
            </h1>
        </section>
    )
}

export default EmptyDashboard;