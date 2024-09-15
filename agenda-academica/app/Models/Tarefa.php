<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tarefa extends Model
{
    // Desabilitar o rastreamento de timestamps
    public $timestamps = false;

    // Definir os campos que podem ser preenchidos em massa
    protected $fillable = [
        'Nome',
        'Descricao',
        'DataInicio',
        'DataFim',
    ];
}
