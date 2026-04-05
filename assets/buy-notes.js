document.addEventListener('DOMContentLoaded', function() {
    const classSelect = document.getElementById('class-select');
    if (!classSelect) return;

    const classSelector     = document.getElementById('class-selector');
    const boardSelector     = document.getElementById('board-selector');
    const boardSelect       = document.getElementById('board-select');
    const classPlaceholder  = document.getElementById('class-placeholder');
    const boardPlaceholder  = document.getElementById('board-placeholder');
    const allChapterSections = document.querySelectorAll('.chapters-section');
    const selectionBanner   = document.getElementById('selection-banner');
    const bannerClass       = document.getElementById('banner-class');
    const bannerBoard       = document.getElementById('banner-board');
    const hamburger         = document.getElementById('hamburger');
    const sidebar           = document.getElementById('sidebar');
    const overlay           = document.getElementById('overlay');
    const closeBtn          = document.getElementById('closeBtn');

    function showBanner(cls, board) {
        const clsLabel   = cls   ? 'Class ' + cls.replace('class-', '') : '';
        const boardLabel = board ? board.toUpperCase() : '';
        if (bannerClass) bannerClass.textContent = clsLabel;
        if (bannerBoard) bannerBoard.textContent = boardLabel;
        if (selectionBanner) selectionBanner.style.display = (clsLabel && boardLabel) ? 'flex' : 'none';
    }

    function hideBanner() {
        if (selectionBanner) selectionBanner.style.display = 'none';
    }

    // Hide all chapter sections on load
    allChapterSections.forEach(s => s.style.display = 'none');

    if (classPlaceholder) classPlaceholder.classList.add('visible');

    // Class selection
    classSelect.addEventListener('change', function() {
        const selectedClass = this.value;
        allChapterSections.forEach(s => s.style.display = 'none');
        const backToBoardBtn = document.getElementById('back-to-board');
        if (backToBoardBtn) backToBoardBtn.style.display = 'none';

        if (selectedClass) {
            if (classSelector) classSelector.style.display = 'none';
            if (classPlaceholder) { classPlaceholder.style.display = 'none'; classPlaceholder.classList.remove('visible'); }

            const classNumber = selectedClass.replace('class-', '');
            if (['6','7','8','9','10'].includes(classNumber)) {
                const label = document.getElementById('selected-class-label');
                if (label) label.textContent = 'Class ' + classNumber;
                if (boardSelector) { boardSelector.style.display = 'flex'; boardSelector.style.justifyContent = 'center'; }
                if (boardPlaceholder) { boardPlaceholder.style.display = 'flex'; boardPlaceholder.classList.add('visible'); }
            } else {
                if (boardSelector) boardSelector.style.display = 'none';
                if (boardPlaceholder) boardPlaceholder.style.display = 'none';
                showBanner(selectedClass, 'JEE');
                const section = document.getElementById(selectedClass);
                if (section) {
                    section.style.display = 'block';
                    if (backToBoardBtn) backToBoardBtn.style.display = 'block';
                    setTimeout(() => {
                        section.querySelectorAll('.fade-in').forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 50));
                    }, 10);
                }
            }
        } else {
            hideBanner();
            if (classSelector) { classSelector.style.display = 'flex'; classSelector.style.justifyContent = 'center'; }
            if (classPlaceholder) { classPlaceholder.style.display = 'flex'; classPlaceholder.classList.add('visible'); }
            if (boardSelector) boardSelector.style.display = 'none';
            if (boardPlaceholder) boardPlaceholder.style.display = 'none';
        }
    });

    // Board selection
    if (boardSelect) {
        boardSelect.addEventListener('change', function() {
            const selectedBoard = this.value;
            const selectedClass = classSelect.value;
            allChapterSections.forEach(s => s.style.display = 'none');
            const backToBoardBtn = document.getElementById('back-to-board');

            if (selectedBoard && selectedClass) {
                if (boardSelector) boardSelector.style.display = 'none';
                if (boardPlaceholder) { boardPlaceholder.style.display = 'none'; boardPlaceholder.classList.remove('visible'); }
                showBanner(selectedClass, selectedBoard);
                if (backToBoardBtn) backToBoardBtn.style.display = 'block';
                const section = document.getElementById(`${selectedClass}-${selectedBoard}`);
                if (section) {
                    section.style.display = 'block';
                    setTimeout(() => {
                        section.querySelectorAll('.fade-in').forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 50));
                    }, 10);
                }
            } else {
                hideBanner();
                if (boardSelector) { boardSelector.style.display = 'flex'; boardSelector.style.justifyContent = 'center'; }
                if (boardPlaceholder) { boardPlaceholder.style.display = 'flex'; boardPlaceholder.classList.add('visible'); }
                if (backToBoardBtn) backToBoardBtn.style.display = 'none';
            }
        });
    }

    // Back to class
    const backToClassBtn = document.getElementById('back-to-class');
    if (backToClassBtn) {
        backToClassBtn.addEventListener('click', function() {
            hideBanner();
            classSelect.value = '';
            if (boardSelect) boardSelect.value = '';
            allChapterSections.forEach(s => s.style.display = 'none');
            if (boardSelector) boardSelector.style.display = 'none';
            if (boardPlaceholder) boardPlaceholder.style.display = 'none';
            if (classSelector) { classSelector.style.display = 'flex'; classSelector.style.justifyContent = 'center'; }
            if (classPlaceholder) { classPlaceholder.style.display = 'flex'; classPlaceholder.classList.add('visible'); }
        });
    }

    // Back to board
    const backToBoardBtn = document.getElementById('back-to-board');
    if (backToBoardBtn) {
        backToBoardBtn.addEventListener('click', function() {
            hideBanner();
            const classNumber = classSelect.value.replace('class-', '');
            if (boardSelect) boardSelect.value = '';
            allChapterSections.forEach(s => s.style.display = 'none');
            backToBoardBtn.style.display = 'none';
            if (['6','7','8','9','10'].includes(classNumber)) {
                if (boardSelector) { boardSelector.style.display = 'flex'; boardSelector.style.justifyContent = 'center'; }
                if (boardPlaceholder) { boardPlaceholder.style.display = 'flex'; boardPlaceholder.classList.add('visible'); }
            } else {
                classSelect.value = '';
                if (classSelector) { classSelector.style.display = 'flex'; classSelector.style.justifyContent = 'center'; }
                if (classPlaceholder) { classPlaceholder.style.display = 'flex'; classPlaceholder.classList.add('visible'); }
            }
        });
    }

    // Hamburger / sidebar (null-safe)
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            if (sidebar) sidebar.classList.toggle('active');
            if (overlay) overlay.classList.toggle('active');
        });
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (hamburger) hamburger.classList.remove('active');
            if (sidebar) sidebar.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
        });
    }
    if (overlay) {
        overlay.addEventListener('click', () => {
            if (hamburger) hamburger.classList.remove('active');
            if (sidebar) sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }
    document.querySelectorAll('.sidebar-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger) hamburger.classList.remove('active');
            if (sidebar) sidebar.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
        });
    });

    // Fade-in observer
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
