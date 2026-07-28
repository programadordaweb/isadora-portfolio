// ==========================================
// ISADORA BEVILAQUA PORTFOLIO (@coigre.studio)
// Bidirectional Cover, Folder Routing & XP Glitch Effects
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

  // 1. BIDIRECTIONAL COVER FLAP (ABRE & FECHA NO SCROLL/SWIPE)
  const notebookCover = document.getElementById('notebookCover');
  const openCoverBtn = document.getElementById('openCoverBtn');
  const arrowIcon = document.getElementById('arrowIcon');
  const pillTooltip = document.getElementById('pillTooltip');

  let isOpened = false;

  function toggleCover(forceState) {
    if (typeof forceState === 'boolean') {
      isOpened = forceState;
    } else {
      isOpened = !isOpened;
    }

    if (isOpened) {
      notebookCover.classList.add('opened');
      if (openCoverBtn) openCoverBtn.classList.add('btn-opened');
      if (pillTooltip) pillTooltip.textContent = 'Role para fechar';
    } else {
      notebookCover.classList.remove('opened');
      if (openCoverBtn) openCoverBtn.classList.remove('btn-opened');
      if (pillTooltip) pillTooltip.textContent = 'Role para abrir';
    }
  }

  if (openCoverBtn) {
    openCoverBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleCover();
    });
  }

  // Desktop Wheel bidirectional scroll detection (only on desktop/mouse wheel)
  window.addEventListener('wheel', (e) => {
    if (window.innerWidth > 768) {
      if (e.deltaY > 0 && !isOpened) {
        toggleCover(true);
      } else if (e.deltaY < 0 && isOpened && window.scrollY <= 10) {
        toggleCover(false);
      }
    }
  }, { passive: true });


  // 2. GENERATE FLOATING BUBBLES IN DESKTOP
  const bubblesContainer = document.getElementById('bubblesContainer');
  if (bubblesContainer) {
    const bubbleCount = 20;
    for (let i = 0; i < bubbleCount; i++) {
      const bubble = document.createElement('div');
      bubble.classList.add('soap-bubble');
      
      const size = Math.random() * 45 + 15;
      const left = Math.random() * 95;
      const delay = Math.random() * 10;
      const duration = Math.random() * 8 + 8;

      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${left}%`;
      bubble.style.animationDelay = `${delay}s`;
      bubble.style.animationDuration = `${duration}s`;

      bubblesContainer.appendChild(bubble);
    }
  }


  // 3. FOLDER ROUTING & DEDICATED FULL VIEWS
  const folderLinks = document.querySelectorAll('.desktop-icon-folder');
  const backBtns = document.querySelectorAll('.back-desktop-btn');
  const pageViews = document.querySelectorAll('.folder-page-view');

  function openFolderView(viewId) {
    pageViews.forEach(v => v.classList.remove('active-view'));
    const targetView = document.getElementById(viewId);
    if (targetView) {
      targetView.classList.add('active-view');
      targetView.scrollTop = 0;
    }
  }

  function closeFolderViews() {
    pageViews.forEach(v => v.classList.remove('active-view'));
    window.location.hash = '';
  }

  folderLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const viewId = link.getAttribute('data-view');
      if (viewId) {
        openFolderView(viewId);
        const hash = link.getAttribute('href');
        if (hash) history.pushState(null, '', hash);
      }
    });
  });

  backBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      closeFolderViews();
    });
  });

  // Handle URL Hash on load / change
  function checkHashRoute() {
    const hash = window.location.hash;
    if (hash === '#sobre-mim') {
      toggleCover(true);
      openFolderView('viewSobreMim');
    } else if (hash === '#nossos-valores') {
      toggleCover(true);
      openFolderView('viewValores');
    } else if (hash === '#servicos') {
      toggleCover(true);
      openFolderView('viewServicos');
    }
  }

  window.addEventListener('hashchange', checkHashRoute);
  checkHashRoute();


  // 4. TV CRT GLITCH TRASH BIN INTERACTIVITY
  const recycleBin = document.getElementById('recycleBin');
  const tvStaticScreen = document.querySelector('.tv-static-screen');
  
  if (recycleBin && tvStaticScreen) {
    recycleBin.addEventListener('click', () => {
      tvStaticScreen.style.opacity = '0.9';
      tvStaticScreen.style.filter = 'contrast(200%) brightness(150%)';
      setTimeout(() => {
        tvStaticScreen.style.opacity = '0.4';
        tvStaticScreen.style.filter = 'none';
      }, 400);
    });
  }


  // 5. MS PAINT TOOLBAR ACTIVE STATE
  const paintTools = document.querySelectorAll('.paint-tool-btn');
  paintTools.forEach(tool => {
    tool.addEventListener('click', () => {
      paintTools.forEach(t => t.classList.remove('active'));
      tool.classList.add('active');
    });
  });


  // 6. 3D CIRCULAR WHEEL STAGE & SUB-VIEW ROUTING
  const wheelItems = document.querySelectorAll('.wheel-item');
  const prevBtn = document.getElementById('prevCharBtn');
  const nextBtn = document.getElementById('nextCharBtn');
  const openServiceDetailBtn = document.getElementById('openServiceDetailBtn');
  const backToServicosBtns = document.querySelectorAll('.back-to-servicos-btn');

  let currentIndex = 0;
  const roles = ['analista', 'ilustradora', 'branding', 'maga', 'conteudo', 'audiovisual'];
  const subViewIds = {
    analista: 'subViewAnalista',
    ilustradora: 'subViewIlustradora',
    branding: 'subViewBranding',
    maga: 'subViewMaga',
    conteudo: 'subViewConteudo',
    audiovisual: 'subViewAudiovisual'
  };

  function updateWheel(newIndex) {
    currentIndex = (newIndex + roles.length) % roles.length;

    wheelItems.forEach((item, i) => {
      item.className = 'wheel-item';
      const offset = (i - currentIndex + roles.length) % roles.length;

      if (offset === 0) {
        item.classList.add('wheel-active');
      } else if (offset === 1) {
        item.classList.add('wheel-right-1');
      } else if (offset === 2) {
        item.classList.add('wheel-right-2');
      } else if (offset === roles.length - 1) {
        item.classList.add('wheel-left-1');
      } else if (offset === roles.length - 2) {
        item.classList.add('wheel-left-2');
      } else {
        item.classList.add('wheel-far');
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => updateWheel(currentIndex - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => updateWheel(currentIndex + 1));
  }

  wheelItems.forEach((item, idx) => {
    item.addEventListener('click', () => updateWheel(idx));
  });

  // Open Sub-View when clicking "Ver este serviço com a Isadora ✨"
  if (openServiceDetailBtn) {
    openServiceDetailBtn.addEventListener('click', () => {
      const activeRole = roles[currentIndex];
      const targetSubViewId = subViewIds[activeRole];
      if (targetSubViewId) {
        openFolderView(targetSubViewId);
      }
    });
  }

  // Back buttons inside dedicated sub-views return to Servicos wheel
  backToServicosBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      openFolderView('viewServicos');
    });
  });

  // Initialize 3D Wheel Stage
  updateWheel(0);


  // 7. VALUES SPINNING VINYL INTERACTION LOGIC (MATCHING REFERENCE VIDEO)
  const valTabPills = document.querySelectorAll('.val-tab-pill');
  const cutoutItems = document.querySelectorAll('.cutout-item');
  const vinylDiscImg = document.getElementById('vinylDiscImg');
  const vinylCenterSticker = document.getElementById('vinylCenterSticker');
  const sideValTitle = document.getElementById('sideValTitle');
  const sideValBody = document.getElementById('sideValBody');

  const valuesData = {
    0: {
      title: 'No que acreditamos',
      body: 'Clique no disco de vinil, nas abas ou em qualquer um dos 7 objetos numerados para explorar a essência e os valores fundamentais do @coigre.studio!'
    },
    1: {
      title: '1. Pessoas antes de clientes.',
      body: 'Não acreditamos em relações transacionais. Acreditamos em parceria. Por isso, tratamos cada cliente como alguém que possui uma história, uma rotina, desafios e objetivos próprios — nunca como apenas mais um projeto na fila.'
    },
    2: {
      title: '2. A autenticidade é o maior diferencial.',
      body: 'Toda estratégia, identidade, texto, ilustração, vídeo ou conteúdo nasce para refletir quem você realmente é. Não criamos personagens para agradar algoritmos. Construímos marcas que fazem sentido para as pessoas que existem por trás delas.'
    },
    3: {
      title: '3. Conhecimento gera criatividade.',
      body: 'Não vemos a criatividade como algo espontâneo ou aleatório. Ela nasce da curiosidade, da observação e do estudo constante. <strong>Quanto mais entendemos pessoas, cultura e comportamento, melhores se tornam as ideias.</strong> Criar é imaginar, mas também é aprender.'
    },
    4: {
      title: '4. Toda criação precisa de um propósito.',
      body: 'Não acreditamos em fazer por fazer. Cada palavra, imagem, ilustração, vídeo ou estratégia deve resolver um problema, comunicar uma ideia ou aproximar pessoas. Se não existe intenção, existe apenas excesso.'
    },
    5: {
      title: '5. Respeito é inegociável.',
      body: 'Respeitamos o tempo, a realidade e os desafios de quem trabalha conosco e esperamos o mesmo em troca. Planejamento, organização e comunicação fazem parte do nosso processo. Urgências geradas por falta de organização não fazem parte da nossa cultura.'
    },
    6: {
      title: '6. Ética vem antes de qualquer oportunidade.',
      body: 'Nem todo projeto combina com os nossos valores. Não trabalhamos com negócios baseados em manipulação, promessas enganosas, golpes, jogos de azar ou qualquer prática que coloque o lucro acima das pessoas. Crescer faz sentido. Crescer a qualquer custo, não.'
    },
    7: {
      title: '7. Preferimos construir algo que permaneça.',
      body: 'Tendências passam. Algoritmos mudam. Ferramentas evoluem. Marcas com identidade, estratégia e propósito continuam relevantes. É isso que buscamos construir em cada projeto.'
    }
  };

  function selectValueItem(index) {
    valTabPills.forEach(pill => {
      const idx = parseInt(pill.getAttribute('data-val'));
      pill.classList.toggle('active', idx === index);
    });

    cutoutItems.forEach(item => {
      const idx = parseInt(item.getAttribute('data-val'));
      item.classList.toggle('active-item', idx === index);
    });

    const data = valuesData[index] || valuesData[0];
    if (sideValTitle && sideValBody) {
      sideValTitle.textContent = data.title;
      sideValBody.innerHTML = data.body;
    }
  }

  valTabPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const valIdx = parseInt(pill.getAttribute('data-val'));
      selectValueItem(valIdx);
    });
  });

  cutoutItems.forEach(item => {
    item.addEventListener('click', () => {
      const valIdx = parseInt(item.getAttribute('data-val'));
      selectValueItem(valIdx);
    });
  });

  if (vinylCenterSticker && vinylDiscImg) {
    vinylCenterSticker.addEventListener('click', () => {
      if (vinylDiscImg.classList.contains('spinning')) {
        vinylDiscImg.style.animationDuration = '3s';
        setTimeout(() => {
          vinylDiscImg.style.animationDuration = '16s';
        }, 3000);
      }
    });
  }

});
