import React, { useState } from 'react';
import { orderStatusList } from "../UpdateOrderBackend/UpdateOrderBackend";
import axios from 'axios';
import { format } from 'date-fns';
import CustomFormBackend from '../CustomFormBackend';
const csrfToken = document.head.querySelector("[name~=csrf-token][content]").content;

function CustomOrderBackend({ order }) {
    const currentOrder = JSON.parse(order);

    const handleSubmit = async function ({ user_id, status, images_location, services, total, date, installer_notes, images, notes, uuid, address, installer, sendNotification }) {

        try {
            const formData = new FormData();
            formData.delete('images[]');
            formData.delete('images_location[]');
            formData.append('status', status.value);
            formData.append('uuid', uuid);
            formData.append('installer_notes', installer_notes);
            formData.append('user_id', user_id);
            formData.append('details', JSON.stringify({ services: services }));
            formData.append('notify', sendNotification);
            formData.append('total', total);
            formData.append('notes', notes);
            formData.append('address', address);
            formData.append('date', (new Date(date)).toUTCString());

            if (installer) {
                formData.append('installer_id', installer.value);
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

            const response = await fetch(`/admin/dashboard/orders/custom/edit/${currentOrder.id}`, {
                method: 'POST',
                body: formData,
                headers: {
                    "X-CSRF-Token": csrfToken
                }
            });

            const data = await response.json();

            return { success: data.ok }
        } catch (error) {
            console.log(error)
            return { success: false }
        }
    };

    return (
        <CustomFormBackend
            initialData={{
                orderId: currentOrder.id,
                total: currentOrder.amount,
                user_id: currentOrder.user_id,
                date: new Date(currentOrder.date),
                address: currentOrder.address,
                notes: currentOrder.notes,
                uuid: currentOrder.uuid,
                status: orderStatusList.find(status => status.value === currentOrder.status),
                services: JSON.parse(currentOrder.details).services,
                installer_id: currentOrder.installer_id,
                installer_notes: currentOrder.installer_notes
            }}
            submit={handleSubmit}
        />
    )
}

export default CustomOrderBackend;
