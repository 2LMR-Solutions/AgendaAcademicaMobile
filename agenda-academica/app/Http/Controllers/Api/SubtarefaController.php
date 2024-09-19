<?php

namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use App\Models\Subtarefa;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SubtarefaController extends Controller
{
    public function index() : JsonResponse{
        $atividade = Subtarefa::orderBy('id', 'desc')->get();
        return response()->json([
            'status' => true,
            'message' => $atividade,
        ],200);
    }

    public function show(Subtarefa $subtarefa) : JsonResponse{
        return response()->json([
            'status' => true,
            'tarefa' => $subtarefa,
        ],200);
    }

    public function store(Request $request): JsonResponse{
        DB::beginTransaction();
        try{
            // Recupera o último ID da tabela e adiciona 1 para o próximo
            $lastId = Subtarefa::max('id') ?? 0;
            $nextId = $lastId + 1;
    
            $subtarefa = Subtarefa::create([
                'id' => $nextId,
                'idAtividade' => $request->idAtividade,
                'nome' => $request->nome,
                'concluida' => $request->concluida,
            ]);
    
            DB::commit();
    
            return response()->json([
                'status' => true,
                'tarefa' => $subtarefa,
                'message' => "Tarefa cadastrada com sucesso",
            ],201);
        }catch(Exception $e){
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => "Tarefa não cadastrada",
            ],400);
        }
    }
    

    public function update(Request $request, Subtarefa $subtarefa) : JsonResponse{
        
        DB::beginTransaction();
        try{
            $subtarefa->update([
                'id' => $request->id,
                'nome' => $request->nome,
                'desc' => $request->desc,
                'data_Inicio' => $request->data_Inicio,
                'data_Final' => $request->data_Final
            ]);
            DB::commit();
            return response()->json([
                'status' => true,
                'tarefa' => $subtarefa,
                'message' => "Tarefa editado com sucesso",
            ],200);
        }catch(Exception $e){
            return response()->json([
                'status' => false,
                'message' => "Tarefa não editada",
            ],400);
        }

        return response()->json([
            'status' => true,
            'tarefa' => $subtarefa,
            'message' => "Tarefa editada com sucesso",
        ],200);
    }

    public function destroy(Subtarefa $subtarefa) : JsonResponse{
        try{
            $subtarefa->delete();
            return response()->json([
                'status' => true,
                'tarefa' => $subtarefa,
                'message' => "Tarefa removida com sucesso",
            ],200);
        }catch(Exception $e){
            return response()->json([
                'status' => false,
                'message' => "Tarefa não removida",
            ],400);
        }
    }
}
