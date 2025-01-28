<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateUsernameRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        if (auth()->user()) {
            return true;  // Changed to true to allow the request
        }
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'username' => [
                'required',
                'string',
                'min:3',
                'max:30',
                'unique:users,username',  // Ensures username isn't already taken
                'regex:/^[a-zA-Z0-9\-._~!$&\'()*+,;=@]+$/i'  // Allows letters, numbers, and common symbols
            ]
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'username.regex' => 'Username may only contain letters, numbers, and symbols (-, _, ., ~, !, $, &, \', (, ), *, +, ,, ;, =, @)'
        ];
    }
}
