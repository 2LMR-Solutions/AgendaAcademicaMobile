<?php

namespace Database\Seeders;

use App\Models\Subtarefa;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubtarefaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Subtarefa::create([
            'id' => 1,
            'idAtividade'=>1,
            'nome'=>'nome1',
            'concluida'=>0,
        ]);
    }
}
