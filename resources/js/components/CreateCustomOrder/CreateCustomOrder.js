import React, { useState } from 'react';
import axios from 'axios';
import CustomFormBackend from '../CustomFormBackend';
import { format } from 'date-fns';

const CreateCustomOrder = () => {
    const handleSubmit = async function ({ user, installers, images_location, status, services, total, date, notes, installer_notes, address, installer, images, sendNotification }) {
        try {
            const formData = new FormData();
            formData.delete('images[]');
            formData.delete('installers');
            formData.delete('images_location[]');
            formData.append('status', status.value);
            formData.append('user_id', user.value);
            formData.append('details', JSON.stringify({ services: services }));
            formData.append('total', total);
            formData.append('date', (new Date(date)).toUTCString());
            formData.append('installer_notes', installer_notes);
            formData.append('notes', notes);
            formData.append('address', address);
            formData.append('notify', sendNotification);

            if (installers.length > 0) {
                const formatedInstallers = installers.map(installer => {
                    return installer.value;
                });
                formData.append('installers', JSON.stringify(formatedInstallers));
            }

            if (images) {
                Array.from(images).forEach(img => {
                    formData.append('images[]', img);
                })
            }

            if (images_location) {
                Array.from(images_location).forEach(img => {
                    formData.append('images_location[]', img);
                })
            }


            const { data } = await axios.post('/admin/dashboard/orders/custom/create', formData);

            return { success: data.ok }
        } catch (error) {
            console.log(error);
            return { success: false }
        }
    };

    return (
        <CustomFormBackend
            initialData={null}
            submit={handleSubmit}
        />
    )
}

export default CreateCustomOrder;
