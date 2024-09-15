<?php

namespace Database\Seeders;

use App\Models\Tarefa;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TarefaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Tarefa::create([
            'Nome' => 'TarefaTeste',
            'Descricao' => 'DescricaoTeste',
            'DataInicio' => '2024-09-13',
            'DataFim' => '2024-09-30',
        ]);
    }
}
