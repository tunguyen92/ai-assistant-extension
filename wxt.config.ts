import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifestVersion: 3,
  modules: ['@wxt-dev/module-react'],
  manifest: () => {
    return {
      name: 'EMU Prompt Assistant',
      description:
        'An AI-powered tool that helps users create better prompts for language models. It streamlines prompt writing by offering smart suggestions, edits, and organization features—making AI interactions more accurate, efficient, and accessible for tasks like content creation, coding, and education.',
      version: '0.0.1',
      permissions: [
        'activeTab',
        'contextMenus',
        // 'declarativeNetRequest',
        'scripting',
        'storage',
        'tabs',
      ],
    };
  },
});
