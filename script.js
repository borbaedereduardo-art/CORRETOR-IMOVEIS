// FAQ Acordeão
document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', () => {
        const parent = item.parentElement;
        parent.classList.toggle('active');
        
        const span = item.querySelector('span');
        span.textContent = parent.classList.contains('active') ? '-' : '+';
    });
});

// Modal de Ficha Completa e Tour em Vídeo
const modal = document.getElementById('propertyModal');

function openModal(title, price, videoUrl, quartos, suites, terreno, location, desc) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalPrice').textContent = price;
    document.getElementById('modalVideo').src = videoUrl;
    document.getElementById('modalLocation').textContent = location;
    document.getElementById('modalDesc').textContent = desc;
    
    // Link direto para WhatsApp com mensagem personalizada
    const zapMsg = encodeURIComponent(`Olá Felipe, tenho interesse no imóvel "${title}" (${price}). Gostaria de agendar uma visita!`);
    document.getElementById('modalZapBtn').href = `https://wa.me/5521964872806?text=${zapMsg}`;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Trava o scroll da página
}

function closeModal() {
    modal.style.display = 'none';
    document.getElementById('modalVideo').src = ''; // Para o vídeo
    document.body.style.overflow = 'auto';
}

// Fechar modal ao clicar fora
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

// Envio do formulário de agendamento no modal
document.getElementById('scheduleForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('clientName').value;
    const phone = document.getElementById('clientPhone').value;
    const msg = document.getElementById('clientMsg').value;
    const propertyTitle = document.getElementById('modalTitle').textContent;

    const fullMsg = encodeURIComponent(`Olá, meu nome é ${name} (${phone}). Quero agendar uma visita para o imóvel: "${propertyTitle}". Obs: ${msg}`);
    
    window.open(`https://wa.me/5521964872806?text=${fullMsg}`, '_blank');
    closeModal();
});

// Filtro instantâneo de imóveis
document.getElementById('btnFiltrar').addEventListener('click', function() {
    const bairroSel = document.getElementById('filterBairro').value;
    const quartosSel = document.getElementById('filterQuartos').value;
    const cards = document.querySelectorAll('.property-card');

    cards.forEach(card => {
        const bairroCard = card.getAttribute('data-bairro');
        const quartosCard = card.getAttribute('data-quartos');

        let matchBairro = !bairroSel || bairroCard === bairroSel;
        let matchQuartos = !quartosSel || quartosCard === quartosSel;

        if (matchBairro && matchQuartos) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});