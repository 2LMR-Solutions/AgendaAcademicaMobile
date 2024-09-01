class Atividade{

    static STORAGE_KEY = 'ProximoID_atividade'; 
    static STORAGE_PREFIX = 'atividade_'; 

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
        this.#id = Atividade.getNextID_atividade();
      }
  
      static initializeStorage() {
          if (!localStorage.getItem(Atividade.STORAGE_KEY)) {
            localStorage.setItem(Atividade.STORAGE_KEY, '1'); 
          }
        }
      
        static getNextID_atividade() {
          Atividade.initializeStorage();
          const id = parseInt(localStorage.getItem(Atividade.STORAGE_KEY), 10);
          localStorage.setItem(Atividade.STORAGE_KEY, (id + 1).toString());
          return id;
        }

        save() {
            const ATVData = {
              id: this.#id,
              nome: this.nome,
              desc: this.desc,
              data_Inicio: this.data_Inicio,
              data_Final: this.data_Final,

            };
            const key = `${Atividade.STORAGE_PREFIX}${this.#id}`;
            console.log(`Salvando dados da atividade para a chave: ${key}`);
            localStorage.setItem(key, JSON.stringify(ATVData));
          }
}

export {Atividade}