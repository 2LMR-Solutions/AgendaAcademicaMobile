class Atividade{


    #id; 
    nome;
    desc;
    data_Inicio;
    data_Final;

    constructor(nome, desc, data_Inicio, data_Final) {
        this.nome = nome;
        this.desc = desc;
        this.data_Inicio = data_Inicio;
        this.data_Final = data_Final;
      }

      async cadastrar(userId) {
        const ATVData = {
          nome: this.nome,
          desc: this.desc,
          data_Inicio: this.data_Inicio,
          data_Final: this.data_Final,
        };
      
        try {
          // Primeiro, cadastra a atividade
          const responseAtividade = await fetch('http://127.0.0.1:8000/api/atividades', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(ATVData) // Enviando os dados da atividade como JSON
          });
      
          const resultAtividade = await responseAtividade.json();
          console.log("ID da tarefa: ", resultAtividade.id);
          console.log("Atividade cadastrada com sucesso:", resultAtividade);
          this.#id = resultAtividade.id
          // Agora cria a relação User_Atividade
          const userAtividadeData = {
            userId: userId,                // ID do usuário passado como argumento
            atividadeId: resultAtividade.id // ID da atividade cadastrada
          };
          const responseUserAtividade = await fetch('URL_do_servidor/user_atividades', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(userAtividadeData) // Criando a relação entre o usuário e a atividade
          });
          const resultUserAtividade = await responseUserAtividade.json();
          console.log("User_Atividade criada com sucesso:", resultUserAtividade);
      
          return {
            atividade: resultAtividade,
            userAtividade: resultUserAtividade
          };
        } catch (error) {
          console.error("Erro ao cadastrar a atividade ou a relação User_Atividade:", error);
        }
      }

      async carregar(id) {
        try {
          const response = await fetch(`URL_do_servidor/atividades/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          });
      
          const result = await response.json();
          console.log("Atividade carregada:", result);
          return result; // Retorna a atividade carregada
        } catch (error) {
          console.error(`Erro ao carregar a atividade com id ${id}:`, error);
        }
      }
      
}

export {Atividade}