import DefaultTheme from 'vitepress/theme';
import './custom.css';
import GeneratorApp from './components/GeneratorApp.vue';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('GeneratorApp', GeneratorApp);
  }
};
