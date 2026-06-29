<template>
  <div class="modal-overlay" v-if="showModal" @click.self="closeModal">
    <div class="modal-content">
      <h3 class="modal-title">{{ t.readyForLaunch }}</h3>
      <p style="margin-bottom: 12px; color: var(--vp-c-text-2);">{{ t.generateCommandTip }}</p>
      
      <div class="pm-selector" style="display: flex; gap: 12px; margin-bottom: 8px;">
        <label style="display: flex; align-items: center; gap: 4px; font-size: 0.9rem; cursor: pointer; color: var(--vp-c-text-2);">
          <input type="radio" value="npm" v-model="packageManager" style="accent-color: var(--vp-c-brand-1);" /> npm (npx)
        </label>
        <label style="display: flex; align-items: center; gap: 4px; font-size: 0.9rem; cursor: pointer; color: var(--vp-c-text-2);">
          <input type="radio" value="pnpm" v-model="packageManager" style="accent-color: var(--vp-c-brand-1);" /> pnpm
        </label>
        <label style="display: flex; align-items: center; gap: 4px; font-size: 0.9rem; cursor: pointer; color: var(--vp-c-text-2);">
          <input type="radio" value="yarn" v-model="packageManager" style="accent-color: var(--vp-c-brand-1);" /> yarn
        </label>
      </div>

      <div class="command-box">
        {{ cliCommand }}
      </div>

      <div v-if="form.auth === 'OAuth2 - Google/GitHub - JWT'" class="social-auth-tip" style="background: rgba(var(--vp-c-warning-1-rgb), 0.15); padding: 14px; border-radius: 10px; border: 1px solid var(--vp-c-warning-1); margin-top: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        <div style="display: flex; align-items: start; gap: 10px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--vp-c-warning-1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          <div style="font-size: 0.85rem; line-height: 1.4; color: var(--vp-c-warning-2);">
            <strong>{{ t.oauthRequired }}</strong><br/>
            <span v-if="lang === 'vi-VN' || lang === 'vi'">Sau khi tạo xong, hãy nhớ thiết lập <code>GOOGLE_CLIENT_ID</code> và <code>GITHUB_CLIENT_ID</code> trong file <code>.env</code>.</span>
            <span v-else-if="lang === 'zh-CN' || lang === 'zh'">生成后，请记得在 <code>.env</code> 文件中设置 <code>GOOGLE_CLIENT_ID</code> 和 <code>GITHUB_CLIENT_ID</code>。</span>
            <span v-else>After generating, remember to set your <code>GOOGLE_CLIENT_ID</code> and <code>GITHUB_CLIENT_ID</code> in the <code>.env</code> file.</span>
          </div>
        </div>
      </div>
      
      <div class="star-prompt" style="background: rgba(var(--vp-c-brand-1-rgb), 0.1); padding: 12px; border-radius: 8px; border: 1px solid var(--vp-c-brand-1); margin-top: 16px;">
        <div style="display: flex; align-items: start; gap: 10px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="color: var(--vp-c-brand-1); flex-shrink: 0;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          <div style="font-size: 0.9rem; line-height: 1.4;">
            <strong style="color: var(--vp-c-brand-1);">{{ t.supportMission }}</strong><br/>
            {{ t.starIfSaved }} 
            <a href="https://github.com/paudang/nodejs-quickstart-structure" target="_blank" style="text-decoration: underline; font-weight: bold;">{{ t.giveUsAStar }}</a> 
            {{ t.helpUsGrow }}
          </div>
        </div>
      </div>
      
      <div class="modal-actions" style="margin-top: 16px;">
        <button class="btn-secondary" @click="closeModal">{{ t.close }}</button>
        <button class="btn-primary" style="width: auto; margin-top: 0;" @click="copyCommand">
          {{ copied ? t.copied : t.copyCommand }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGenerator } from '../composables/useGenerator';
import { useData } from 'vitepress';
import { computed } from 'vue';

const { showModal, cliCommand, copyCommand, copied, form, packageManager } = useGenerator();
const { lang } = useData();

const i18n = {
  'en-US': {
    readyForLaunch: 'Ready for Launch',
    generateCommandTip: 'Generate your new microservice by running this command in your terminal:',
    oauthRequired: 'OAuth2 Configuration Required:',
    supportMission: 'Support the Mission!',
    starIfSaved: 'If this tool saved you 4+ hours of work, please',
    giveUsAStar: 'Give us a Star',
    helpUsGrow: 'to help us grow!',
    close: 'Close',
    copied: 'Copied!',
    copyCommand: 'Copy Command'
  },
  'vi-VN': {
    readyForLaunch: 'Sẵn sàng khởi chạy',
    generateCommandTip: 'Tạo microservice mới của bạn bằng cách chạy lệnh này trong terminal:',
    oauthRequired: 'Yêu cầu cấu hình OAuth2:',
    supportMission: 'Ủng hộ dự án!',
    starIfSaved: 'Nếu công cụ này giúp bạn tiết kiệm hơn 4 giờ làm việc, vui lòng',
    giveUsAStar: 'Tặng chúng tôi 1 Sao',
    helpUsGrow: 'để giúp dự án phát triển hơn!',
    close: 'Đóng',
    copied: 'Đã sao chép!',
    copyCommand: 'Sao chép lệnh'
  },
  'vi': {
    readyForLaunch: 'Sẵn sàng khởi chạy',
    generateCommandTip: 'Tạo microservice mới của bạn bằng cách chạy lệnh này trong terminal:',
    oauthRequired: 'Yêu cầu cấu hình OAuth2:',
    supportMission: 'Ủng hộ dự án!',
    starIfSaved: 'Nếu công cụ này giúp bạn tiết kiệm hơn 4 giờ làm việc, vui lòng',
    giveUsAStar: 'Tặng chúng tôi 1 Sao',
    helpUsGrow: 'để giúp dự án phát triển hơn!',
    close: 'Đóng',
    copied: 'Đã sao chép!',
    copyCommand: 'Sao chép lệnh'
  },
  'zh-CN': {
    readyForLaunch: '准备启航',
    generateCommandTip: '在终端中运行以下命令以生成您的新微服务：',
    oauthRequired: '需要配置 OAuth2：',
    supportMission: '支持我们的使命！',
    starIfSaved: '如果此工具为您节省了 4 小时以上的工作时间，请',
    giveUsAStar: '给我们点亮 Star',
    helpUsGrow: '帮助我们成长！',
    close: '关闭',
    copied: '已复制！',
    copyCommand: '复制命令'
  },
  'zh': {
    readyForLaunch: '准备启航',
    generateCommandTip: '在终端中运行以下命令以生成您的新微服务：',
    oauthRequired: '需要配置 OAuth2：',
    supportMission: '支持我们的使命！',
    starIfSaved: '如果此工具为您节省了 4 小时以上的工作时间，请',
    giveUsAStar: '给我们点亮 Star',
    helpUsGrow: '帮助我们成长！',
    close: '关闭',
    copied: '已复制！',
    copyCommand: '复制命令'
  }
};

const t = computed(() => i18n[lang.value] || i18n['en-US']);

const closeModal = () => {
    showModal.value = false;
};
</script>
