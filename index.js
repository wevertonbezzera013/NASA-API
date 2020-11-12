class IniciandoAModel {

    constructor(data) {
        console.log("criando a classe")
        this._data = "";
        if (data !== undefined) {
            this._data = data;
        }
        this._imagem = "";
        this._descricao = "";
        this._copyright = "";
    }

    BuscarAPOD() {

        console.log("buscando o site...");

        var request = new XMLHttpRequest();

        request.addEventListener('load', () => {

            if (request.status == 200) {
                let dados = this._Reorganiza(request.responseText)
                this._TrazerDados(dados)
            }
        })
        request.open("GET", "https://api.nasa.gov/planetary/apod?api_key=ryCzyejpaeSejor9JOvIkXmdDxOIemYa39Qqh5Bp&date=" + this._data, false);

        request.send();
    }
    _Reorganiza(responseText) {
        console.log("está me vendo??")
        let conversao = JSON.parse(responseText);
        return conversao;

    }

    _TrazerDados(dados) {

        this._titulo = dados.title;
        this._data = dados.date;
        this._imagem = dados.url;
        this._descricao = dados.explanation;
        this._copyright = dados.copyright;
    }
    getTitulo() {
        return this._titulo
    }

    getData() {
        return this._data;
    }

    getImagem() {
        return this._imagem;
    }

    getDescricao() {
        return this._descricao;
    }

    getCopyright() {
        return this._copyright;
    }
}

class visualizar {
    constructor() {
        console.log("Não tem atributos.")
    }

    recebe(model) {
        let criar = document.createElement('div');
        criar.innerHTML = `
            <h1>${model.getTitulo()}</h1>
            <p>${model.getData()}</p>
            <img src= ${model.getImagem()}>
            <p>${model.getDescricao()}</p>
            <p>${model.getCopyright()}</p>
            `

        document.body.appendChild(criar);
    }

}

class Controlador {
    constructor() {
        console.log("controller.")
    }

    AtualizaDia() {
        let data = document.querySelector("#data");
        let modelo = new IniciandoAModel(data.value);
        modelo.BuscarAPOD();

        let view = new visualizar();
        view.recebe(modelo);
    }
}
let controll = new Controlador();
document.getElementById("enviar").addEventListener("click", controll.AtualizaDia);