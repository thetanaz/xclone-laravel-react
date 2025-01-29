<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreatePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {

        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'content' => ['required', 'string', 'min:1', 'max:300'],
            'gif' => 'nullable|string|url',
            'images' => 'nullable|string|url',
            'parent_id' => ['nullable', 'integer', 'exists:posts,id']
        ];
    }
}
