const html = document.querySelector('html');
const botaoFoco = document.querySelector('.app__card-button--foco');
const botaoDescansoCurto = document.querySelector('.app__card-button--curto');
const botaoDescansoLongo = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const botaoCheck = document.querySelector('#alternar-musica')
const começarOuPausar = document.querySelector('#start-pause span')
const imgBotao = document.querySelector('.app__card-primary-butto-icon')
const cronometro = document.querySelector('#timer')

const musica = new Audio('/sons/luna-rise-part-one.mp3')
const audioPlay = new Audio('/sons/play.wav')
const audioPause = new Audio('/sons/pause.mp3')
const audioBeep = new Audio('/sons/beep.mp3')

let temporizadorPausado = true;
let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;
const botaoPlayPause = document.querySelector('#start-pause')
musica.loop = true;

botaoCheck.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

function alteraContextoEImagem(contexto) {
    mostrarTempo()
    botoes.forEach((contexto) => {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;

        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong">Faça um pausa.</strong>`
            break;

        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar a superfície. <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;

        default:
            break;
    }

}

botaoFoco.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alteraContextoEImagem('foco')
    botaoFoco.classList.add('active')

})

botaoDescansoCurto.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alteraContextoEImagem('descanso-curto')
    botaoDescansoCurto.classList.add('active')


})

botaoDescansoLongo.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alteraContextoEImagem('descanso-longo')
    botaoDescansoLongo.classList.add('active')

})

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        audioBeep.play()
        zerar()
        alert('Tempo esgotado')
        return
    }
    
    tempoDecorridoEmSegundos -= 1;
    
    mostrarTempo()
}

botaoPlayPause.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if (temporizadorPausado) {
        audioPlay.play()
        começarOuPausar.innerHTML = 'Pausar'
        imgBotao.setAttribute('src', '/imagens/pause.png')
        temporizadorPausado = !temporizadorPausado;
    } else {
        audioPause.play()
        começarOuPausar.innerHTML = 'Começar'
        imgBotao.setAttribute('src', '/imagens/play_arrow.png')
        temporizadorPausado = !temporizadorPausado

    }
    if (intervaloId) {
        zerar()
        return
    }

    intervaloId = setInterval(contagemRegressiva, 1000)
}

function zerar() {
    clearInterval(intervaloId)
    intervaloId = null
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    cronometro.innerHTML = `${tempoFormatado}`
}

mostrarTempo()