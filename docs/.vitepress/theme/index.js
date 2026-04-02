import DefaultTheme from 'vitepress/theme';
import { h } from 'vue';
import './custom.css';
import GeneratorApp from './components/GeneratorApp.vue';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('GeneratorApp', GeneratorApp);
  }
};
