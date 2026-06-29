import DefaultTheme from 'vitepress/theme';
import './custom.css';
import GeneratorApp from './components/GeneratorApp.vue';
import { inBrowser } from 'vitepress';

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }) {
    app.component('GeneratorApp', GeneratorApp);

    // Force synchronize package manager tabs globally on the page
    if (inBrowser) {
      let isSyncing = false;
      window.addEventListener('click', (e) => {
        if (isSyncing) return;

        if (e.target.matches('.vp-code-group .tabs label')) {
          const clickedText = e.target.textContent.trim();
          const allLabels = document.querySelectorAll('.vp-code-group .tabs label');
          
          isSyncing = true;
          // Save current scroll position to prevent browser from jumping
          const scrollX = window.scrollX;
          const scrollY = window.scrollY;

          allLabels.forEach(label => {
            if (label !== e.target && label.textContent.trim() === clickedText) {
              const inputId = label.getAttribute('for');
              const input = document.getElementById(inputId);
              // If the tab is not active, simulate a real click so Vue updates the content
              if (input && !input.checked) {
                label.click();
              }
            }
          });

          // Restore scroll position instantly
          window.scrollTo(scrollX, scrollY);

          // Release lock after all syncs are dispatched
          setTimeout(() => { isSyncing = false; }, 10);
        }
      });

      // Override VitePress router.go to intercept route changes and preserve current path on language switch
      if (router && router.go) {
        const originalGo = router.go;
        router.go = (to) => {
          // Normalize the destination
          const normalizedTo = to ? to.split('?')[0].split('#')[0] : '';
          if (normalizedTo === '/' || normalizedTo === '/vi/' || normalizedTo === '/zh/' || normalizedTo === '/vi' || normalizedTo === '/zh') {
            const currentPath = window.location.pathname;
            let relPath = currentPath;
            
            if (currentPath.startsWith('/vi/')) {
              relPath = currentPath.substring(3);
            } else if (currentPath.startsWith('/zh/')) {
              relPath = currentPath.substring(3);
            } else if (currentPath === '/vi') {
              relPath = '/';
            } else if (currentPath === '/zh') {
              relPath = '/';
            }
            
            let targetPath = '';
            if (normalizedTo.includes('/vi')) {
              targetPath = '/vi' + (relPath === '/' ? '/' : relPath);
            } else if (normalizedTo.includes('/zh')) {
              targetPath = '/zh' + (relPath === '/' ? '/' : relPath);
            } else {
              targetPath = relPath;
            }
            
            targetPath = targetPath.replace(/\/+/g, '/');
            return originalGo(targetPath);
          }
          return originalGo(to);
        };
      }

      // Language switcher path preservation hook (fallback capturing listener)
      window.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        const text = link.textContent || '';
        const href = link.getAttribute('href');
        
        if (
          (text.includes('English') || text.includes('Tiếng Việt') || text.includes('简体中文')) &&
          (href === '/' || href === '/vi/' || href === '/zh/')
        ) {
          e.preventDefault();
          e.stopPropagation();
          
          const currentPath = window.location.pathname;
          let relPath = currentPath;
          
          if (currentPath.startsWith('/vi/')) {
            relPath = currentPath.substring(3);
          } else if (currentPath.startsWith('/zh/')) {
            relPath = currentPath.substring(3);
          } else if (currentPath === '/vi') {
            relPath = '/';
          } else if (currentPath === '/zh') {
            relPath = '/';
          }
          
          let targetPath = '';
          if (href === '/vi/') {
            targetPath = '/vi' + (relPath === '/' ? '/' : relPath);
          } else if (href === '/zh/') {
            targetPath = '/zh' + (relPath === '/' ? '/' : relPath);
          } else {
            targetPath = relPath;
          }
          
          targetPath = targetPath.replace(/\/+/g, '/');
          window.location.pathname = targetPath;
        }
      }, true);
    }
  }
};
