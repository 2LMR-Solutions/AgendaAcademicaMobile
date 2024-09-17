class User_Atividade {
    static STORAGE_KEY = 'ProximoID_user_atividade';
    static STORAGE_PREFIX = 'user_atividade_';
  
    #id;
    #usuarioId;
    #atividadeId;
    data_associacao;
  
    constructor(usuarioId, atividadeId) {
      this.#usuarioId = usuarioId;
      this.#atividadeId = atividadeId;
      this.data_associacao = new Date().toISOString(); // Data atual no formato ISO
    
    }
  
    async save() {
      const userAtividadeData = {
        usuarioId: this.#usuarioId,
        atividadeId: this.#atividadeId,
        data_associacao: this.data_associacao
      };
    
      try {
        const response = await fetch('URL_do_servidor/user_atividades', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userAtividadeData)
        });
    
        const result = await response.json();
        console.log("Associação User_Atividade salva com sucesso:", result);
        return result;
      } catch (error) {
        console.error("Erro ao salvar User_Atividade:", error);
      }
    }
    
  
    static async loadByUsuarioId(usuarioId) {
      try {
        const response = await fetch(`URL_do_servidor/user_atividades/usuario/${usuarioId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
    
        const atividades = await response.json();
        console.log(`Atividades carregadas para o usuário ${usuarioId}:`, atividades);
        return atividades;
      } catch (error) {
        console.error(`Erro ao carregar atividades do usuário ${usuarioId}:`, error);
      }
    }
    
    static async loadByAtividadeId(atividadeId) {
      try {
        const response = await fetch(`URL_do_servidor/user_atividades/atividade/${atividadeId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
    
        const usuarios = await response.json();
        console.log(`Usuários carregados para a atividade ${atividadeId}:`, usuarios);
        return usuarios;
      } catch (error) {
        console.error(`Erro ao carregar usuários da atividade ${atividadeId}:`, error);
      }
    }
    
  }
  
  export { User_Atividade as UserAtividade };
  