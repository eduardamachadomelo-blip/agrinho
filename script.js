// ==================== script.js ====================
// MOCK DATA baseado no conteúdo do arquivo (6+ notícias)
const newsData = [
    {
        id: 1,
        title: "Paraná atinge 84,7% dos domicílios em segurança alimentar",
        excerpt: "Índice supera a média nacional de 75,8%; mais de 107 mil paranaenses superaram a insegurança alimentar em apenas um ano.",
        category: "seguranca",
        image: "https://images.unsplash.com/photo-1577906096429-f73c2c312435?w=600&h=400&fit=crop",
        date: "15 maio 2026"
    },
    {
        id: 2,
        title: "Agricultura familiar representa 75% dos estabelecimentos rurais do PR",
        excerpt: "Mais de 276 mil propriedades familiares geram emprego e abastecem mercados institucionais com mais de R$ 500 milhões via cooperativas.",
        category: "producao",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop",
        date: "10 maio 2026"
    },
    {
        id: 3,
        title: "Paraná é líder nacional em produtores orgânicos certificados",
        excerpt: "Estado conta com 3.916 produtores (16% do Brasil), crescimento de 70% entre 2018 e 2022. Programa Paraná Mais Orgânico fortalece a agroecologia.",
        category: "sustentabilidade",
        image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=400&fit=crop",
        date: "05 maio 2026"
    },
    {
        id: 4,
        title: "Plano ABC+ Paraná impulsiona agricultura de baixo carbono",
        excerpt: "Práticas como ILPF, bioinsumos e recuperação de pastagens visam reduzir emissões e aumentar resiliência climática no campo.",
        category: "sustentabilidade",
        image: "https://images.unsplash.com/photo-1586771107445-d3ca888129e7?w=600&h=400&fit=crop",
        date: "28 abril 2026"
    },
    {
        id: 5,
        title: "Safra recorde: Paraná deve colher 46,8 milhões de toneladas de grãos",
        excerpt: "Soja, milho e trigo puxam produção que representa 13,5% do total nacional, com destaque para o protagonismo da agricultura familiar.",
        category: "producao",
        image: "https://images.unsplash.com/photo-1624386082125-80e09cf57425?w=600&h=400&fit=crop",
        date: "20 abril 2026"
    },
    {
        id: 6,
        title: "Banco de Alimentos 'Comida Boa' beneficia mais de 500 mil pessoas",
        excerpt: "Investimento superior a R$ 250 milhões em 2024 fortalece o acesso a alimentos e combate ao desperdício, aliado à compra direta da agricultura familiar.",
        category: "seguranca",
        image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&h=400&fit=crop",
        date: "12 abril 2026"
    },
    {
        id: 7,
        title: "Agroecologia avança: circuitos curtos e feiras orgânicas crescem no estado",
        excerpt: "Incentivo à produção justa e saudável fortalece o DHAA e a economia local, com destaque para o IV Plano Estadual de SAN 2024-2027.",
        category: "sustentabilidade",
        image: "https://images.unsplash.com/photo-1574943320219-553eb213f972?w=600&h=400&fit=crop",
        date: "03 abril 2026"
    }
];

// Renderização dinâmica + filtros
let currentFilter = "all";

function renderNewsCards(filter = "all") {
    const container = document.getElementById("newsContainer");
    if (!container) return;
    
    let filtered = [...newsData];
    if (filter !== "all") {
        filtered = newsData.filter(item => item.category === filter);
    }
    
    if (filtered.length === 0) {
        container.innerHTML = `<div class="no-results">Nenhuma notícia encontrada para esta categoria.</div>`;
        return;
    }
    
    const cardsHTML = filtered.map(news => `
        <article class="news-card">
            <img class="card-img" src="${news.image}" alt="${news.title}" loading="lazy">
            <div class="card-content">
                <div class="card-category">${getCategoryLabel(news.category)}</div>
                <h3 class="card-title">${news.title}</h3>
                <p class="card-excerpt">${news.excerpt}</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 0.75rem; color: var(--text-secondary);"><i class="far fa-calendar-alt"></i> ${news.date}</span>
                    <a href="#" class="read-more">Ler mais <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
        </article>
    `).join('');
    
    container.innerHTML = cardsHTML;
}

function getCategoryLabel(cat) {
    if (cat === "seguranca") return "🔒 Segurança Alimentar";
    if (cat === "sustentabilidade") return "🌱 Sustentabilidade";
    if (cat === "producao") return "🚜 Produção";
    return "📰 Geral";
}

// Dark Mode com localStorage
const darkModeToggle = document.getElementById("darkModeToggle");
const moonIcon = darkModeToggle?.querySelector(".fa-moon");
const sunIcon = darkModeToggle?.querySelector(".fa-sun");

function initDarkMode() {
    const savedTheme = localStorage.getItem("agrinho-theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        if (moonIcon && sunIcon) {
            moonIcon.style.display = "none";
            sunIcon.style.display = "inline-block";
        }
    } else {
        document.body.classList.remove("dark");
        if (moonIcon && sunIcon) {
            moonIcon.style.display = "inline-block";
            sunIcon.style.display = "none";
        }
    }
}

function toggleDarkMode() {
    if (document.body.classList.contains("dark")) {
        document.body.classList.remove("dark");
        localStorage.setItem("agrinho-theme", "light");
        if (moonIcon && sunIcon) {
            moonIcon.style.display = "inline-block";
            sunIcon.style.display = "none";
        }
    } else {
        document.body.classList.add("dark");
        localStorage.setItem("agrinho-theme", "dark");
        if (moonIcon && sunIcon) {
            moonIcon.style.display = "none";
            sunIcon.style.display = "inline-block";
        }
    }
}

if (darkModeToggle) darkModeToggle.addEventListener("click", toggleDarkMode);

// Menu Hamburguer
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const closeMenuBtn = document.getElementById("closeMenuBtn");

function openMenu() {
    if (mobileNav) mobileNav.classList.add("open");
    document.body.style.overflow = "hidden";
}
function closeMenu() {
    if (mobileNav) mobileNav.classList.remove("open");
    document.body.style.overflow = "";
}

if (menuToggle) menuToggle.addEventListener("click", openMenu);
if (closeMenuBtn) closeMenuBtn.addEventListener("click", closeMenu);
// Fechar menu ao clicar em link
document.querySelectorAll(".mobile-nav-link").forEach(link => {
    link.addEventListener("click", closeMenu);
});

// Filtros interativos
const filterChips = document.querySelectorAll(".filter-chip");
filterChips.forEach(chip => {
    chip.addEventListener("click", (e) => {
        filterChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        const filterValue = chip.getAttribute("data-filter");
        currentFilter = filterValue;
        renderNewsCards(currentFilter);
    });
});

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    initDarkMode();
    renderNewsCards("all");
    
    // ajuste para overlay do menu em resize (fechar se aberto)
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768 && mobileNav?.classList.contains("open")) {
            closeMenu();
        }
    });
});
