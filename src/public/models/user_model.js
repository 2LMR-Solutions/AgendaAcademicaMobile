class Usuario {
    #id;
    #nome;
    nome_de_usuario;
    #sexo;
    #senha;

    constructor(nome, nome_de_usuario, sexo, senha) {
      this.#nome = nome;
      this.nome_de_usuario = nome_de_usuario;
      this.#sexo = sexo;
      this.#senha = senha;
    }

    async cadastrar() {
      const userData = {
        nome: this.#nome,
        nome_de_usuario: this.nome_de_usuario,
        senha: this.#senha
      };
    
      try {
        const response = await fetch('URL_do_servidor/cadastrarUsuario', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userData)
        });
    
        if (!response.ok) {
          throw new Error(`Erro ao salvar usuário: ${response.statusText}`);
        }
    
        // Deve retornar um JSON com o ID do novo usuário
        const result = await response.json();
    
        if (result && result.id) {
          this.#id = result.id; // Porque aqui atualiza o ID na instância
          console.log(`Usuário ${this.nome_de_usuario} cadastrado com sucesso. ID: ${this.#id}`);
        } else {
          console.error("Erro: ID não retornado pelo servidor.");
        }
    
      } catch (error) {
        console.error(`Erro ao cadastrar usuário: ${error}`);
      }
    }
  
    static async carregar(UserID) {
      try {
        const response = await fetch(`URL_do_servidor/obterUsuario/${UserID}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
        if (!response.ok) {
          throw new Error(`Erro ao carregar usuário: ${response.statusText}`);
        }
        const userData = await response.json();
        if (userData) {
          const usuario = new Usuario(userData.nome, userData.nome_de_usuario, senha="Default");
          usuario.#id = userData.id; // Configura o ID corretamente
          return usuario;
        }
        return null;
      } catch (error) {
        console.error(`Erro ao carregar usuário: ${error}`);
        return null;
      }
    }
    
  
    static async exists(nome_de_usuario) {
      try {
        const response = await fetch(`URL_do_servidor/verificarUsuario/${nome_de_usuario}`, {
          method: "GET",
          redirect: "follow"
        });
        const result = await response.json(); // A resposta de ser { exists: true/false }
    
        console.log(`Usuário ${nome_de_usuario} existe:`, result.exists);
        
        return result.exists; 
    
      } catch (error) {
        console.error(`Erro ao verificar se o usuário ${nome_de_usuario} existe:`, error);
        return false;
      }
    }
    
      static async login(nomeDeUsuario, senha) {
        try {
          const response = await fetch('URL_do_servidor/login', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              nome_de_usuario: nomeDeUsuario,
              senha: senha
            })
          });
      
          if (!response.ok) {
            throw new Error(`Erro ao fazer login: ${response.statusText}`);
          }
          const result = await response.json();
          if (result.success) {
            console.log(`Login bem-sucedido para ${nomeDeUsuario}.`);
            return result.usuario; // Retorna os dados do usuário, se necessário
          } else {
            console.log(`Falha no login: ${result.message}`);
            return null; // Retorna null se o login falhar
          }
      
        } catch (error) {
          console.error(`Erro ao fazer login para ${nomeDeUsuario}:`, error);
          return null; // Retorna null em caso de erro
        }
      }
      
      getId() {
        return this.#id;
      }
    
      getNome() {
        return this.#nome;
      }
      
      getSexo(){
        return this.#sexo;
      }

      getNome_de_usuario() {
        return this.nome_de_usuario;
      }    

      
      async setNome(nome) {
        const response = await fetch(`URL_do_servidor/usuario/${this.nome_de_usuario}/nome`, {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ nome: nome })
        });

        const result = await response.json();
        console.log(`Nome atualizado: ${result.success}`);
      }
      async setNome_de_usuario(novo_nome_de_usuario) {
        const response = await fetch(`URL_do_servidor/usuario/${this.nome_de_usuario}/nome_de_usuario`, {
          method: "PATCH", 
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ nome_de_usuario: novo_nome_de_usuario })
        });

        const result = await response.json();
        console.log(`Nome de usuário atualizado: ${result.success}`);
      }
      async setSenha(nova_senha) {
        const response = await fetch(`URL_do_servidor/usuario/${this.nome_de_usuario}/senha`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ senha: nova_senha })
        });

        const result = await response.json();
        console.log(`Senha atualizada: ${result.success}`);
      }
      async setSexo(novo_sexo) {
        const response = await fetch(`URL_do_servidor/usuario/${this.nome_de_usuario}/sexo`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ sexo: novo_sexo })
        });
        const result = await response.json();
        console.log(`Sexo atualizado: ${result.success}`);
      }
  }
  
  export { Usuario };
  