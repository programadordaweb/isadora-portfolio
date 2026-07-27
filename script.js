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

  // Wheel & Touch bidirectional scroll detection
  window.addEventListener('wheel', (e) => {
    if (e.deltaY > 0 && !isOpened) {
      toggleCover(true);
    } else if (e.deltaY < 0 && isOpened && window.scrollY <= 10) {
      toggleCover(false);
    }
  }, { passive: true });

  let touchStartY = 0;
  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diffY = touchStartY - touchEndY;

    if (diffY > 40 && !isOpened) {
      toggleCover(true);
    } else if (diffY < -40 && isOpened && window.scrollY <= 10) {
      toggleCover(false);
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

});
