// 1. Selecionar elementos do formulário
const form = document.getElementById('meuForm');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const erroNome = document.getElementById('erroNome');
const erroEmail = document.getElementById('erroEmail');
const limparBtn = document.getElementById('limparBtn');

// 2. Recuperar dados salvos ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    const nomeSalvo = localStorage.getItem('formNome');
    const emailSalvo = localStorage.getItem('formEmail');
    const dadoInexistente = localStorage.getItem('dadoQueNaoExiste');

    console.log('Dado inexistente recuperado:', dadoInexistente); // Retorna null

    if (dadoInexistente === null) {
        console.log("Aviso: o dado 'dadoQueNaoExiste' não foi encontrado no Storage.");
    }

    if (nomeSalvo !== null) {
        nomeInput.value = nomeSalvo;
        console.log('Nome recuperado:', nomeSalvo);
    } else {
        console.log('Nenhum nome salvo anteriormente.');
    }

    if (emailSalvo !== null) {
        emailInput.value = emailSalvo;
        console.log('Email recuperado:', emailSalvo);
    } else {
        console.log('Nenhum email salvo anteriormente.');
    }
});

// 3. Salvar dados automaticamente enquanto o usuário digita
nomeInput.addEventListener('input', () => {
    localStorage.setItem('formNome', nomeInput.value);
    console.log('Nome salvo no Storage:', nomeInput.value);
});

emailInput.addEventListener('input', () => {
    localStorage.setItem('formEmail', emailInput.value);
    console.log('Email salvo no Storage:', emailInput.value);
});

// 4. Validar o formulário sem apagar os dados salvos
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o envio padrão e o recarregamento da página

    let valido = true;
    erroNome.innerText = '';
    erroEmail.innerText = '';

    if (nomeInput.value.trim() === '') {
        erroNome.innerText = 'O nome é obrigatório.';
        valido = false;
    }

    if (emailInput.value.trim() === '') {
        erroEmail.innerText = 'O email é obrigatório.';
        valido = false;
    } else if (!emailInput.value.includes('@') || !emailInput.value.includes('.')) {
        erroEmail.innerText = 'Email inválido.';
        valido = false;
    }

    if (valido) {
        alert('Formulário enviado com sucesso! Os dados foram mantidos no Storage.');
        console.log('Formulário enviado. Dados mantidos no Storage.');
    }
});

// 5. Limpar os dados manualmente
limparBtn.addEventListener('click', (event) => {
    event.preventDefault(); // Evita que o botão dispare o envio do formulário
    localStorage.removeItem('formNome');
    localStorage.removeItem('formEmail');
    form.reset();
    erroNome.innerText = '';
    erroEmail.innerText = '';
    alert('Dados limpos do Storage e do formulário!');
    console.log('Dados limpos manualmente pelo usuário.');
});
