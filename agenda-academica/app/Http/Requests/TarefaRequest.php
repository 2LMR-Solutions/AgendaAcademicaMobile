<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class TarefaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
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

        $tarefaId = $this->route('tarefa');
        
        return [
            'Nome' => 'required',
            'DataInicio' => 'required',
            'DataFim' => 'required'
        ];
    }

    public function messages(): array{
        return[
            'Nome.required' => 'Campo nome é obrigatório!',
            'DataInicio.required' => 'Campo dataInicio é obrigatório!',
            'DataFim.required' => 'Campo dataFim é obrigatório!',
        ];
    }
}
