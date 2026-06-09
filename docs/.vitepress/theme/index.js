import DefaultTheme from 'vitepress/theme';
import './custom.css';
import GeneratorApp from './components/GeneratorApp.vue';
import { inBrowser } from 'vitepress';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
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
    }
  }
};
