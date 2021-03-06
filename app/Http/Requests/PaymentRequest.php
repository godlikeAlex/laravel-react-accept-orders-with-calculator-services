<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PaymentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required',
            'phone' => 'required',
            'email' => 'required|email',
            'address' => 'required',
            'notes' => 'nullable',
            'cart' => 'required',
            'date' => 'required',
            'payment_method_id' => 'required',
            'images' => 'nullable|array',
            'images.*' => 'mimes:jpeg,png,jpg,gif,svg'
        ];
    }
}
