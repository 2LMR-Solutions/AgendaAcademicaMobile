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

      async cadastrar(userId) {
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
          console.log("ID da Subtarefa: ", resultSubtarefa.id);
          console.log("Subtarefa cadastrada com sucesso:", resultSubtarefa);
          this.#id = resultSubtarefa.id
          // Agora cria a relação User_Atividade
          
        } catch (error) {
          console.error("Erro ao cadastrar a subtarefa: ", error);
        }
      }

      async carregar(id) {
        try {
          const response = await fetch(`URL_do_servidor/subtarefas/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          });
      
          const result = await response.json();
          console.log("Subtarefa carregada:", result);
          return result; // Retorna a atividade carregada
        } catch (error) {
          console.error(`Erro ao carregar a subtarefa com id ${id}:`, error);
        }
      }
      
}

export {Subtarefa}