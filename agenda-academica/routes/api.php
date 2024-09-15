<?php

use App\Http\Controllers\Api\TarefasController;
use Illuminate\Support\Facades\Route;


Route::get('/tarefas', [TarefasController::class, 'index']);
Route::get('/tarefas/{tarefa}', [TarefasController::class, 'show']);
Route::post('/tarefas', [TarefasController::class, 'store']);
Route::put('/tarefas/{tarefa}', [TarefasController::class, 'update']);
Route::delete('/tarefas/{tarefa}', [TarefasController::class, 'destroy']);