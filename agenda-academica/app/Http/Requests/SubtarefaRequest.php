<?php

namespace App\Http\Requests;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

use Illuminate\Foundation\Http\FormRequest;

class SubtarefaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }
    protected function failedValidation(Validator $validator){
        throw new HttpResponseException(response()->json([
            'status' => false,
            'erros' => $validator->errors(),
        ], 422));
    } 


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' => 'required',
            'idAtividade' => 'required',
            'nome' => 'required',
        ];
    }
    public function messages(): array{
        return[
            'id.required' => 'Campo ID é obrigatório',
            'nome.required' => 'Campo nome é obrigatório!',
            'idAtividade.required' => 'Campo idAtividade é obrigatório'

        ];
    }
}
