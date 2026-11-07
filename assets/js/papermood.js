// Papermood theme behavior: dark-mode toggle, scroll-to-top, menu scroll
// memory, smooth in-page anchors, and copy buttons on code blocks.
// Interaction model follows hugo-PaperMod.
(function () {
    'use strict';

    var root = document.documentElement;

    // --- theme toggle -----------------------------------------------------
    // The early inline script in base.html.jinja already applied the stored
    // or system preference before first paint; this wires the button.
    var toggle = document.getElementById('theme-toggle');
    if (toggle) {
        toggle.addEventListener('click', function () {
            var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
            root.dataset.theme = next;
            try { localStorage.setItem('pref-theme', next); } catch (e) { /* private mode */ }
        });
    }

    // --- menu scroll position --------------------------------------------
    var menu = document.getElementById('menu');
    if (menu) {
        try {
            var scrollPosition = localStorage.getItem('menu-scroll-position');
            if (scrollPosition) menu.scrollLeft = parseInt(scrollPosition, 10);
        } catch (e) { /* private mode */ }
        var menuScrollTimeout;
        menu.addEventListener('scroll', function () {
            clearTimeout(menuScrollTimeout);
            menuScrollTimeout = setTimeout(function () {
                try { localStorage.setItem('menu-scroll-position', menu.scrollLeft); } catch (e) { /* private mode */ }
            }, 150);
        }, { passive: true });
    }

    // --- footnote back-references -------------------------------------------
    // The renderer links each reference to its definition (sup > a[href="#N"]
    // to div#N) but emits no link back. Give the first reference of each note
    // an id and append a return arrow to the definition. Runs before the
    // anchor wiring below, so the arrows scroll smoothly too.
    var backrefLabel = document.body.dataset.backrefLabel || 'Back to reference';
    document.querySelectorAll('.footnote-reference a[href^="#"]').forEach(function (ref) {
        var noteId = decodeURIComponent(ref.getAttribute('href')).slice(1);
        var note = document.getElementById(noteId);
        if (!note || !note.classList.contains('footnote-definition')) return;
        if (note.querySelector('.footnote-backref')) return; // keep the first reference
        ref.id = 'fnref-' + noteId;
        var back = document.createElement('a');
        back.className = 'footnote-backref';
        back.href = '#fnref-' + noteId;
        back.textContent = '↩';
        back.setAttribute('aria-label', backrefLabel);
        (note.querySelector('p:last-of-type') || note).appendChild(back);
    });

    // --- smooth in-page anchors -------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var id = this.getAttribute('href').slice(1);
            if (!id) return;
            var target = document.querySelector("[id='" + decodeURIComponent(id) + "']");
            if (!target) return;
            e.preventDefault();
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                target.scrollIntoView();
            } else {
                target.scrollIntoView({ behavior: 'smooth' });
            }
            // Move keyboard focus to the target like native anchor
            // navigation, so the next Tab continues from there.
            if (target.tabIndex < 0 && !target.hasAttribute('tabindex')) {
                target.setAttribute('tabindex', '-1');
            }
            target.focus({ preventScroll: true });
            if (id === 'top') {
                history.replaceState(null, '', ' ');
            } else {
                history.pushState(null, '', '#' + id);
            }
        });
    });

    // --- scroll to top ------------------------------------------------------
    var toplink = document.getElementById('top-link');
    if (toplink) {
        var scrollTicking = false;
        window.addEventListener('scroll', function () {
            if (scrollTicking) return;
            scrollTicking = true;
            requestAnimationFrame(function () {
                var threshold = window.innerHeight;
                var shown = document.body.scrollTop > threshold || document.documentElement.scrollTop > threshold;
                toplink.classList.toggle('hidden', !shown);
                scrollTicking = false;
            });
        }, { passive: true });
    }

    // --- copy buttons on code blocks ---------------------------------------
    if (document.body.dataset.copyCode !== 'off') {
        var copyLabel = document.body.dataset.copyLabel || 'copy';
        var copiedLabel = document.body.dataset.copiedLabel || 'copied!';
        document.querySelectorAll('pre > code').forEach(function (codeblock) {
            var container = codeblock.parentNode;
            var copybutton = document.createElement('button');
            copybutton.classList.add('copy-code');
            copybutton.textContent = copyLabel;

            function copyingDone() {
                copybutton.textContent = copiedLabel;
                setTimeout(function () { copybutton.textContent = copyLabel; }, 2000);
            }

            copybutton.addEventListener('click', function () {
                if ('clipboard' in navigator) {
                    navigator.clipboard.writeText(codeblock.textContent);
                    copyingDone();
                    return;
                }
                var range = document.createRange();
                range.selectNodeContents(codeblock);
                var selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
                try {
                    document.execCommand('copy');
                    copyingDone();
                } catch (e) { /* unsupported */ }
                selection.removeRange(range);
            });

            container.appendChild(copybutton);
        });
    }
})();
