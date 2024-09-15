<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TarefaRequest;
use App\Models\Tarefa;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TarefasController extends Controller
{
    public function index() : JsonResponse{
        $tarefas = Tarefa::orderBy('id', 'DESC')->get();
        return response()->json([
            'status' => true,
            'message' => $tarefas,
        ],200);
    }

    public function show(Tarefa $tarefa) : JsonResponse{
        return response()->json([
            'status' => true,
            'tarefa' => $tarefa,
        ],200);
    }

    public function store(TarefaRequest $request): JsonResponse{
        DB::beginTransaction();
        try{
            $tarefa = Tarefa::create([
                'Nome' => $request->Nome,
                'Descricao' => $request->Descricao,
                'DataInicio' => $request->DataInicio,
                'DataFim' => $request->DataFim
            ]);

            DB::commit();

            return response()->json([
                'status' => true,
                'tarefa' => $tarefa,
                'message' => "Tarefa cadastrada com sucesso",
            ],200);
        }catch(Exception $e){
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => "Tarefa não cadastrada",
            ],400);
        }
    }

    public function update(TarefaRequest $request, Tarefa $tarefa) : JsonResponse{
        
        DB::beginTransaction();
        try{
            $tarefa->update([
                'Nome' => $request->Nome,
                'Descricao' => $request->Descricao,
                'DataInicio' => $request->DataInicio,
                'DataFim' => $request->DataFim
            ]);
            DB::commit();
            return response()->json([
                'status' => true,
                'tarefa' => $tarefa,
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
            'tarefa' => $tarefa,
            'message' => "Tarefa editada com sucesso",
        ],200);
    }

    public function destroy(Tarefa $tarefa) : JsonResponse{
        try{
            $tarefa->delete();
            return response()->json([
                'status' => true,
                'tarefa' => $tarefa,
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
