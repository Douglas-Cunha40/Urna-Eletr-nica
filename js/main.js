let votosCandidato22 = 0;
let votosCandidato13 = 0;
let votosBranco = 0;
let totalVotos = 0;

let btnConfirma = document.getElementById('val_confirma');
btnConfirma.addEventListener('click', confirmarVoto);

function updateDisplay(button) {
    let display = document.querySelector('.display_btns');
    display.style.display = 'block';

    if (button.textContent.toLowerCase() !== 'branco') {
        display.textContent += button.textContent;
    } else {
        display.textContent = 'Branco';
    }
    showCandidateData();
}

function tocarAudio(idDoAudio) {
    let audio = document.getElementById(idDoAudio);
    audio.currentTime = 0; 
    audio.play();
}

function clearDisplay() {
    let display = document.querySelector('.display_btns');
    display.textContent = '';
    hideCandidateData();
}

function showCandidateData() {
    let display = document.querySelector('.display_btns');
    let candidateData_22 = document.getElementById('candidate_22');
    let candidateData_13 = document.getElementById('candidate_13');

    let selectedOption = display.textContent.trim().toLowerCase();

    if (selectedOption === '22') {
        candidateData_22.style.display = 'flex';
        candidateData_13.style.display = 'none';
    } else if (selectedOption === '13') {
        candidateData_13.style.display = 'flex';
        candidateData_22.style.display = 'none';
    } else if (selectedOption === 'branco') {
        candidateData_22.style.display = 'none';
        candidateData_13.style.display = 'none';
    } else if (parseInt(selectedOption) >= 10) {
        candidateData_22.style.display = 'none';
        candidateData_13.style.display = 'none';
        display.textContent = 'Candidato inexistente';
    } else {
        candidateData_22.style.display = 'none';
        candidateData_13.style.display = 'none';
    }
}

function hideCandidateData() {
    let candidateData_22 = document.getElementById('candidate_22');
    let candidateData_13 = document.getElementById('candidate_13');
    candidateData_22.style.display = 'none';
    candidateData_13.style.display = 'none';
}

function confirmarVoto() {
    let display = document.querySelector('.display_btns');
    let resultado = document.querySelector('.resultado span');
    let selectedOption = display.textContent.trim().toLowerCase();
    if (selectedOption !== '') {
        if (selectedOption === 'branco' || selectedOption === '22' || selectedOption === '13') {
            totalVotos++;
            if (selectedOption === 'branco') {
                votosBranco++;
            } else if (selectedOption === '22') {
                votosCandidato22++;
            } else if (selectedOption === '13') {
                votosCandidato13++;
            }
            resultado.innerText = totalVotos;
            tocarAudio('somClick');
            if (totalVotos >= 10) {
                display.innerHTML = '<span style="color: #28dd00; font-size: 1.5rem; font-weight: bold;">Voto registrado com sucesso</span>';
                setTimeout(() => {
                    displayResultado();
                    clearDisplay();
                }, 2000);
            } else {
                display.innerHTML = '<span style="color: #28dd00; font-size: 1.5rem; font-weight: bold;">Voto registrado com sucesso</span>';
                setTimeout(() => {
                    clearDisplay();
                }, 2000);
            }
        } else {
            display.innerHTML = '<span style="color: red; font-size: 1.5rem; font-weight: bold;">Escolha opção válida</span>';
            setTimeout(() => {
                clearDisplay();
            }, 2000);
        }
    }
    if (totalVotos >= 10) {
        displayResultado();
    }
}

function displayResultado() {
    let resultadoDiv = document.querySelector('.resultado');
    resultadoDiv.style.display = 'block';

    let mensagemVotos = document.createElement('p');
    mensagemVotos.style.marginBottom = '15px';  
    mensagemVotos.innerHTML = `<span style="color: blue;">Jair Messias Bolsonaro</span> recebeu: <span style="color: blue;">${votosCandidato22}</span> votos 
    <br><span style="color: red;">Luiz Inácio Lula da Silva</span> recebeu: <span style="color: red;">${votosCandidato13}</span> votos 
    <br>Votos em branco: <span style="color: green;">${votosBranco}</span> votos`;

    let mensagemResultado = document.createElement('p');
    if (votosCandidato22 > votosCandidato13) {
        mensagemResultado.innerHTML = `O vencedor é <span style="color: #28dd00;">Jair Messias Bolsonaro</span>`;
    } else if (votosCandidato13 > votosCandidato22) {
        mensagemResultado.innerHTML = `O vencedor é <span style="color: #28dd00;">Luiz Inácio Lula da Silva</span>`;
    } else {
        mensagemResultado.innerHTML = `Empate! Ambos os candidatos têm <span style="color: blue;">${votosCandidato22}</span> votos.`;
    }
    resultadoDiv.innerHTML = '';
    resultadoDiv.appendChild(mensagemVotos);
    resultadoDiv.appendChild(mensagemResultado);
}
