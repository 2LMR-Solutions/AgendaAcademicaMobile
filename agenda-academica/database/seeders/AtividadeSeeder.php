<?php

namespace Database\Seeders;

use App\Models\Atividade;
use Illuminate\Database\Seeder;

class AtividadeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Atividade::create([
            'id' => 1,
            'nome'=>'atividade1',
            'desc'=>'desc1',
            'data_Inicio'=>'2024-12-31',
            'data_Final'=>'2025-12-01'
        ]);
    }
}
