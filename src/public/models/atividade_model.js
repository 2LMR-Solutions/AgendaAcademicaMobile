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
    
    async cadastrar() {
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
        this.#id = resultAtividade.tarefa.id 
      } catch (error) {
        console.error("Erro ao cadastrar a atividade", error);
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

    getID(){
      return this.#id;
    }
    
}

export {Atividade}