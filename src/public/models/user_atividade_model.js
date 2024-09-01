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
      this.#id = User_Atividade.getNextID();
    }
  
    static initializeStorage() {
      if (!localStorage.getItem(User_Atividade.STORAGE_KEY)) {
        localStorage.setItem(User_Atividade.STORAGE_KEY, '1');
      }
    }
  
    static getNextID() {
      User_Atividade.initializeStorage();
      const id = parseInt(localStorage.getItem(User_Atividade.STORAGE_KEY), 10);
      localStorage.setItem(User_Atividade.STORAGE_KEY, (id + 1).toString());
      return id;
    }
  
    save() {
      const userAtividadeData = {
        id: this.#id,
        usuarioId: this.#usuarioId,
        atividadeId: this.#atividadeId,
        data_associacao: this.data_associacao
      };
      const key = `${User_Atividade.STORAGE_PREFIX}${this.#id}`;
      console.log(`Saving user-atividade data to key: ${key}`);
      localStorage.setItem(key, JSON.stringify(userAtividadeData));
    }
  
    static loadByUsuarioId(usuarioId) {
      const atividades = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(User_Atividade.STORAGE_PREFIX)) {
          const userAtividadeData = JSON.parse(localStorage.getItem(key));
          if (userAtividadeData.usuarioId === usuarioId) {
            atividades.push(userAtividadeData);
          }
        }
      }
      return atividades;
    }
  
    static loadByAtividadeId(atividadeId) {
      const usuarios = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(User_Atividade.STORAGE_PREFIX)) {
          const userAtividadeData = JSON.parse(localStorage.getItem(key));
          if (userAtividadeData.atividadeId === atividadeId) {
            usuarios.push(userAtividadeData);
          }
        }
      }
      return usuarios;
    }
  }
  
  export { User_Atividade as UserAtividade };
  