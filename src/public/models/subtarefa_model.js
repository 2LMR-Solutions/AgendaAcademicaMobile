class Subtarefa{


    #id; 
    idAtividade;
    nome;
    concluida;

    constructor(idAtividade, nome, concluida) {
        this.nome = nome;
        this.idAtividade = idAtividade;
        this.concluida = concluida
      }

      async cadastrar() {
        const SATVData = {
          nome: this.nome,
          idAtividade: this.idAtividade,
          concluida: this.concluida
        };
      
        try {
          // Primeiro, cadastra a atividade
          const responseAtividade = await fetch('http://127.0.0.1:8000/api/subtarefas', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(SATVData) // Enviando os dados da atividade como JSON
          });
      
          const resultSubtarefa = await responseAtividade.json();
          this.#id = resultSubtarefa.tarefa.id
        } catch (error) {
          console.error("Erro ao cadastrar a subtarefa: ", error);
        }
      }

      async excluir() {
        try {
            const response = await fetch(`${API_URL}/atividades/${this.atividadeId}/subtarefas/${this.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error('Erro ao excluir a subtarefa');
            }
        } catch (error) {
            console.error('Erro ao excluir subtarefa:', error);
            throw error; // Propaga o erro para tratamento posterior
        }
    }
    


      setId(id) {
        this.#id = id;
    }
      
}

export {Subtarefa}