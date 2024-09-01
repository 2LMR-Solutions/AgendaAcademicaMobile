class Usuario {
    static STORAGE_KEY = 'ProximoID'; 
    static STORAGE_PREFIX = 'usuario_'; 
  
    #id;
    #nome;
    nome_de_usuario;
    #senha;

    constructor(nome, nome_de_usuario, senha) {
      this.#nome = nome;
      this.nome_de_usuario = nome_de_usuario;
      this.#senha = senha;
  
      if (Usuario.exists(nome_de_usuario)) {
        console.log("restaurado")
      } else {
        this.#id = Usuario.getNextID();
      }
    }

    static initializeStorage() {
        if (!localStorage.getItem(Usuario.STORAGE_KEY)) {
          localStorage.setItem(Usuario.STORAGE_KEY, '1'); 
        }
      }
    
      static getNextID() {
        Usuario.initializeStorage();
        const id = parseInt(localStorage.getItem(Usuario.STORAGE_KEY), 10);
        localStorage.setItem(Usuario.STORAGE_KEY, (id + 1).toString());
        return id;
      }

    save() {
      const userData = {
        id: this.#id,
        nome: this.#nome,
        nome_de_usuario: this.nome_de_usuario,
        senha: this.#senha 
      };
      const key = `${Usuario.STORAGE_PREFIX}${this.nome_de_usuario}`;
      console.log(`Saving user data to key: ${key}`);
      localStorage.setItem(key, JSON.stringify(userData));
    }
  
    static load(nome_de_usuario) {
      const key = `${Usuario.STORAGE_PREFIX}${nome_de_usuario}`;
      console.log(`Loading user data from key: ${key}`);
      const userData = localStorage.getItem(key);
      if (userData) {
        const parsedData = JSON.parse(userData);
        const usuario = new Usuario(parsedData.nome, parsedData.nome_de_usuario, parsedData.senha);
        usuario.#id = parsedData.id; 
        return usuario;
      }
      return null;
    }
  
    static exists(nome_de_usuario) {
      return localStorage.getItem(`${Usuario.STORAGE_PREFIX}${nome_de_usuario}`) !== null;
    }

    getId() {
        return this.#id;
      }
    
      getNome() {
        return this.#nome;
      }
    
      setNome(nome) {
        this.#nome = nome;
      }
    
      getNome_de_usuario() {
        return this.nome_de_usuario;
      }
    
      setNome_de_usuario(nome_de_usuario) {
        this.nome_de_usuario = nome_de_usuario;
      }

      static login(nomeDeUsuario, senha){
        
        // const nomeDeUsuario = document.getElementById('nomeDeUsuario').value;
        // const senha = document.getElementById('senha').value;
    
        // Verifica se os dados estão preenchidos
        if (nomeDeUsuario && senha) {
            const usuario = Usuario.load(nomeDeUsuario);
    
            if (usuario && usuario.#senha === senha) {
                alert('Login bem-sucedido!');
                // Redirecionar
            } else {
                alert('Nome de usuário ou senha incorretos.');
            }
        } else {
            alert('Por favor, preencha todos os campos.');
        }
}
  }
  
  export { Usuario };
  