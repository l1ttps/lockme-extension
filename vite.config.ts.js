// vite.config.ts
import { crx } from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// src/manifest.ts
var manifest = {
  manifest_version: 3,
  name: "LockMe Extension",
  description: "Browser lock screen extension",
  version: "0.1",
  background: {
    service_worker: "src/background/index.ts"
  },
  host_permissions: ["<all_urls>"],
  options_ui: {
    page: "src/options/options.html",
    open_in_tab: true
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*", "file:///*"],
      js: ["src/content/index.tsx"]
    }
  ],
  web_accessible_resources: [
    {
      resources: [],
      matches: ["<all_urls>"]
    }
  ],
  action: {
    default_popup: "src/popup/popup.html",
    default_icon: {
      "16": "images/extension_16.png",
      "32": "images/extension_32.png",
      "48": "images/extension_48.png",
      "128": "images/extension_128.png"
    }
  },
  icons: {
    "16": "images/extension_16.png",
    "32": "images/extension_32.png",
    "48": "images/extension_48.png",
    "128": "images/extension_128.png"
  },
  permissions: ["storage", "tabs"]
};
var manifest_default = manifest;

// utils/plugins/removeSrcFromHtmlPaths.ts
import { exec, execSync } from "child_process";
import * as fs from "fs";
import * as glob from "glob";
import { get as getKeyValue, set as setKeyValue } from "lodash";
import { basename, dirname, parse, resolve } from "path";
function removeSrcFromHtmlPaths() {
  let config;
  return {
    name: "remove-src-from-html-paths",
    enforce: "post",
    apply: "build",
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    closeBundle() {
      const outDir = resolve(config.build.outDir);
      const manifestPath = resolve(outDir, "manifest.json");
      const manifest2 = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
      const processManifestKey = (key) => {
        const filePath = getKeyValue(manifest2, key);
        if (!filePath)
          return;
        const parsedPath = parse(filePath);
        if (parsedPath.ext !== ".html")
          return;
        let destDir = parsedPath.base;
        if (destDir === "index.html") {
          destDir = `${basename(dirname(filePath))}.html`;
        }
        fs.renameSync(resolve(outDir, filePath), resolve(outDir, destDir));
        setKeyValue(manifest2, key, destDir);
      };
      for (const key of [
        "action.default_popup",
        "options_ui.page",
        "options_page",
        "devtools_page",
        "chrome_url_overrides",
        "web_accessible_resources"
      ]) {
        if (key === "web_accessible_resources") {
          for (const [index, obj] of Object.entries(manifest2[key])) {
            for (const [resourceIndex] of Object.entries(obj.resources)) {
              processManifestKey(`web_accessible_resources[${index}].resources[${resourceIndex}]`);
            }
          }
        } else {
          processManifestKey(key);
        }
      }
      if (glob.sync(`${config.build.outDir}/src/**/*.html`).length > 0) {
        exec(`rimraf ${config.build.outDir}`);
        throw new Error(
          "Something went wrong. Files found in src folder, please open an issue in GitHub."
        );
      } else {
        fs.writeFileSync(manifestPath, JSON.stringify(manifest2, null, 2));
        execSync(`rimraf ${config.build.outDir}/src`);
      }
    }
  };
}
var removeSrcFromHtmlPaths_default = removeSrcFromHtmlPaths;

// vite.config.ts
var vite_config_default = defineConfig({
  plugins: [react(), crx({ manifest: manifest_default }), removeSrcFromHtmlPaths_default()]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic3JjL21hbmlmZXN0LnRzIiwgInV0aWxzL3BsdWdpbnMvcmVtb3ZlU3JjRnJvbUh0bWxQYXRocy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgY3J4IH0gZnJvbSAnQGNyeGpzL3ZpdGUtcGx1Z2luJztcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcblxyXG5pbXBvcnQgbWFuaWZlc3QgZnJvbSAnLi9zcmMvbWFuaWZlc3QnO1xyXG5pbXBvcnQgcmVtb3ZlU3JjRnJvbUh0bWxQYXRocyBmcm9tICcuL3V0aWxzL3BsdWdpbnMvcmVtb3ZlU3JjRnJvbUh0bWxQYXRocyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtyZWFjdCgpLCBjcngoeyBtYW5pZmVzdCB9KSwgcmVtb3ZlU3JjRnJvbUh0bWxQYXRocygpXSxcclxufSk7XHJcbiIsICJpbXBvcnQgeyBNYW5pZmVzdFYzRXhwb3J0IH0gZnJvbSAnQGNyeGpzL3ZpdGUtcGx1Z2luJztcclxuXHJcbmNvbnN0IG1hbmlmZXN0OiBNYW5pZmVzdFYzRXhwb3J0ID0ge1xyXG4gIG1hbmlmZXN0X3ZlcnNpb246IDMsXHJcbiAgbmFtZTogJ0xvY2tNZSBFeHRlbnNpb24nLFxyXG4gIGRlc2NyaXB0aW9uOiAnQnJvd3NlciBsb2NrIHNjcmVlbiBleHRlbnNpb24nLFxyXG4gIHZlcnNpb246ICcwLjEnLFxyXG4gIGJhY2tncm91bmQ6IHtcclxuICAgIHNlcnZpY2Vfd29ya2VyOiAnc3JjL2JhY2tncm91bmQvaW5kZXgudHMnLFxyXG4gIH0sXHJcbiAgaG9zdF9wZXJtaXNzaW9uczogWyc8YWxsX3VybHM+J10sXHJcbiAgb3B0aW9uc191aToge1xyXG4gICAgcGFnZTogJ3NyYy9vcHRpb25zL29wdGlvbnMuaHRtbCcsXHJcbiAgICBvcGVuX2luX3RhYjogdHJ1ZSxcclxuICB9LFxyXG4gIGNvbnRlbnRfc2NyaXB0czogW1xyXG4gICAge1xyXG4gICAgICBtYXRjaGVzOiBbJ2h0dHA6Ly8qLyonLCAnaHR0cHM6Ly8qLyonLCAnZmlsZTovLy8qJ10sXHJcbiAgICAgIGpzOiBbJ3NyYy9jb250ZW50L2luZGV4LnRzeCddLFxyXG4gICAgfSxcclxuICBdLFxyXG4gIHdlYl9hY2Nlc3NpYmxlX3Jlc291cmNlczogW1xyXG4gICAge1xyXG4gICAgICByZXNvdXJjZXM6IFtcclxuICAgICAgICAvLyAnc3JjL29wdGlvbnMvb3B0aW9ucy5odG1sJyxcclxuICAgICAgXSxcclxuICAgICAgbWF0Y2hlczogWyc8YWxsX3VybHM+J10sXHJcbiAgICB9LFxyXG4gIF0sXHJcbiAgYWN0aW9uOiB7XHJcbiAgICBkZWZhdWx0X3BvcHVwOiAnc3JjL3BvcHVwL3BvcHVwLmh0bWwnLFxyXG4gICAgZGVmYXVsdF9pY29uOiB7XHJcbiAgICAgICcxNic6ICdpbWFnZXMvZXh0ZW5zaW9uXzE2LnBuZycsXHJcbiAgICAgICczMic6ICdpbWFnZXMvZXh0ZW5zaW9uXzMyLnBuZycsXHJcbiAgICAgICc0OCc6ICdpbWFnZXMvZXh0ZW5zaW9uXzQ4LnBuZycsXHJcbiAgICAgICcxMjgnOiAnaW1hZ2VzL2V4dGVuc2lvbl8xMjgucG5nJyxcclxuICAgIH0sXHJcbiAgfSxcclxuICBpY29uczoge1xyXG4gICAgJzE2JzogJ2ltYWdlcy9leHRlbnNpb25fMTYucG5nJyxcclxuICAgICczMic6ICdpbWFnZXMvZXh0ZW5zaW9uXzMyLnBuZycsXHJcbiAgICAnNDgnOiAnaW1hZ2VzL2V4dGVuc2lvbl80OC5wbmcnLFxyXG4gICAgJzEyOCc6ICdpbWFnZXMvZXh0ZW5zaW9uXzEyOC5wbmcnLFxyXG4gIH0sXHJcbiAgcGVybWlzc2lvbnM6IFsnc3RvcmFnZScsICd0YWJzJ10sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtYW5pZmVzdDtcclxuIiwgImltcG9ydCB7IGV4ZWMsIGV4ZWNTeW5jIH0gZnJvbSAnY2hpbGRfcHJvY2Vzcyc7XHJcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcclxuaW1wb3J0ICogYXMgZ2xvYiBmcm9tICdnbG9iJztcclxuaW1wb3J0IHsgZ2V0IGFzIGdldEtleVZhbHVlLCBzZXQgYXMgc2V0S2V5VmFsdWUgfSBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBiYXNlbmFtZSwgZGlybmFtZSwgcGFyc2UsIHJlc29sdmUgfSBmcm9tICdwYXRoJztcclxuaW1wb3J0IHR5cGUgeyBQbHVnaW5PcHRpb24gfSBmcm9tICd2aXRlJztcclxuXHJcbmZ1bmN0aW9uIHJlbW92ZVNyY0Zyb21IdG1sUGF0aHMoKTogUGx1Z2luT3B0aW9uIHtcclxuICBsZXQgY29uZmlnO1xyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lOiAncmVtb3ZlLXNyYy1mcm9tLWh0bWwtcGF0aHMnLFxyXG4gICAgZW5mb3JjZTogJ3Bvc3QnLFxyXG4gICAgYXBwbHk6ICdidWlsZCcsXHJcblxyXG4gICAgY29uZmlnUmVzb2x2ZWQocmVzb2x2ZWRDb25maWcpIHtcclxuICAgICAgY29uZmlnID0gcmVzb2x2ZWRDb25maWc7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsb3NlQnVuZGxlKCkge1xyXG4gICAgICBjb25zdCBvdXREaXIgPSByZXNvbHZlKGNvbmZpZy5idWlsZC5vdXREaXIpO1xyXG4gICAgICBjb25zdCBtYW5pZmVzdFBhdGggPSByZXNvbHZlKG91dERpciwgJ21hbmlmZXN0Lmpzb24nKTtcclxuICAgICAgY29uc3QgbWFuaWZlc3QgPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhtYW5pZmVzdFBhdGgsICd1dGYtOCcpKTsgLy8gVE9ETzogdHlwaW5nXHJcblxyXG4gICAgICBjb25zdCBwcm9jZXNzTWFuaWZlc3RLZXkgPSAoa2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgICBjb25zdCBmaWxlUGF0aCA9IGdldEtleVZhbHVlKG1hbmlmZXN0LCBrZXkpIGFzIHN0cmluZztcclxuICAgICAgICBpZiAoIWZpbGVQYXRoKSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IHBhcnNlZFBhdGggPSBwYXJzZShmaWxlUGF0aCk7XHJcbiAgICAgICAgaWYgKHBhcnNlZFBhdGguZXh0ICE9PSAnLmh0bWwnKSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCBkZXN0RGlyID0gcGFyc2VkUGF0aC5iYXNlO1xyXG4gICAgICAgIGlmIChkZXN0RGlyID09PSAnaW5kZXguaHRtbCcpIHtcclxuICAgICAgICAgIGRlc3REaXIgPSBgJHtiYXNlbmFtZShkaXJuYW1lKGZpbGVQYXRoKSl9Lmh0bWxgOyAvLyBlLmc6IG9wdGlvbnMvaW5kZXguaHRtbCB0byBvcHRpb25zLmh0bWxcclxuICAgICAgICB9XHJcbiAgICAgICAgZnMucmVuYW1lU3luYyhyZXNvbHZlKG91dERpciwgZmlsZVBhdGgpLCByZXNvbHZlKG91dERpciwgZGVzdERpcikpO1xyXG4gICAgICAgIHNldEtleVZhbHVlKG1hbmlmZXN0LCBrZXksIGRlc3REaXIpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgZm9yIChjb25zdCBrZXkgb2YgW1xyXG4gICAgICAgICdhY3Rpb24uZGVmYXVsdF9wb3B1cCcsXHJcbiAgICAgICAgJ29wdGlvbnNfdWkucGFnZScsXHJcbiAgICAgICAgJ29wdGlvbnNfcGFnZScsXHJcbiAgICAgICAgJ2RldnRvb2xzX3BhZ2UnLFxyXG4gICAgICAgICdjaHJvbWVfdXJsX292ZXJyaWRlcycsXHJcbiAgICAgICAgJ3dlYl9hY2Nlc3NpYmxlX3Jlc291cmNlcycsXHJcbiAgICAgIF0pIHtcclxuICAgICAgICBpZiAoa2V5ID09PSAnd2ViX2FjY2Vzc2libGVfcmVzb3VyY2VzJykge1xyXG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lICBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICAgICAgICBmb3IgKGNvbnN0IFtpbmRleCwgb2JqXSBvZiBPYmplY3QuZW50cmllczxhbnk+KG1hbmlmZXN0W2tleV0pKSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgW3Jlc291cmNlSW5kZXhdIG9mIE9iamVjdC5lbnRyaWVzKG9iai5yZXNvdXJjZXMpKSB7XHJcbiAgICAgICAgICAgICAgcHJvY2Vzc01hbmlmZXN0S2V5KGB3ZWJfYWNjZXNzaWJsZV9yZXNvdXJjZXNbJHtpbmRleH1dLnJlc291cmNlc1ske3Jlc291cmNlSW5kZXh9XWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHByb2Nlc3NNYW5pZmVzdEtleShrZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGdsb2Iuc3luYyhgJHtjb25maWcuYnVpbGQub3V0RGlyfS9zcmMvKiovKi5odG1sYCkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGV4ZWMoYHJpbXJhZiAke2NvbmZpZy5idWlsZC5vdXREaXJ9YCk7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nLiBGaWxlcyBmb3VuZCBpbiBzcmMgZm9sZGVyLCBwbGVhc2Ugb3BlbiBhbiBpc3N1ZSBpbiBHaXRIdWIuJ1xyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZnMud3JpdGVGaWxlU3luYyhtYW5pZmVzdFBhdGgsIEpTT04uc3RyaW5naWZ5KG1hbmlmZXN0LCBudWxsLCAyKSk7XHJcbiAgICAgICAgZXhlY1N5bmMoYHJpbXJhZiAke2NvbmZpZy5idWlsZC5vdXREaXJ9L3NyY2ApO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJlbW92ZVNyY0Zyb21IdG1sUGF0aHM7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQSxTQUFTLFdBQVc7QUFDcEIsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsb0JBQW9COzs7QUNBN0IsSUFBTSxXQUE2QjtBQUFBLEVBQ2pDLGtCQUFrQjtBQUFBLEVBQ2xCLE1BQU07QUFBQSxFQUNOLGFBQWE7QUFBQSxFQUNiLFNBQVM7QUFBQSxFQUNULFlBQVk7QUFBQSxJQUNWLGdCQUFnQjtBQUFBLEVBQ2xCO0FBQUEsRUFDQSxrQkFBa0IsQ0FBQyxZQUFZO0FBQUEsRUFDL0IsWUFBWTtBQUFBLElBQ1YsTUFBTTtBQUFBLElBQ04sYUFBYTtBQUFBLEVBQ2Y7QUFBQSxFQUNBLGlCQUFpQjtBQUFBLElBQ2Y7QUFBQSxNQUNFLFNBQVMsQ0FBQyxjQUFjLGVBQWUsV0FBVztBQUFBLE1BQ2xELElBQUksQ0FBQyx1QkFBdUI7QUFBQSxJQUM5QjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLDBCQUEwQjtBQUFBLElBQ3hCO0FBQUEsTUFDRSxXQUFXLENBRVg7QUFBQSxNQUNBLFNBQVMsQ0FBQyxZQUFZO0FBQUEsSUFDeEI7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixlQUFlO0FBQUEsSUFDZixjQUFjO0FBQUEsTUFDWixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsSUFDVDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxFQUNUO0FBQUEsRUFDQSxhQUFhLENBQUMsV0FBVyxNQUFNO0FBQ2pDO0FBRUEsSUFBTyxtQkFBUTs7O0FDL0NmLFNBQVMsTUFBTSxnQkFBZ0I7QUFDL0IsWUFBWSxRQUFRO0FBQ3BCLFlBQVksVUFBVTtBQUN0QixTQUFTLE9BQU8sYUFBYSxPQUFPLG1CQUFtQjtBQUN2RCxTQUFTLFVBQVUsU0FBUyxPQUFPLGVBQWU7QUFHbEQsU0FBUyx5QkFBdUM7QUFDOUMsTUFBSTtBQUNKLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxJQUNULE9BQU87QUFBQSxJQUVQLGVBQWUsZ0JBQWdCO0FBQzdCLGVBQVM7QUFBQSxJQUNYO0FBQUEsSUFFQSxjQUFjO0FBQ1osWUFBTSxTQUFTLFFBQVEsT0FBTyxNQUFNLE1BQU07QUFDMUMsWUFBTSxlQUFlLFFBQVEsUUFBUSxlQUFlO0FBQ3BELFlBQU1BLFlBQVcsS0FBSyxNQUFTLGdCQUFhLGNBQWMsT0FBTyxDQUFDO0FBRWxFLFlBQU0scUJBQXFCLENBQUMsUUFBZ0I7QUFDMUMsY0FBTSxXQUFXLFlBQVlBLFdBQVUsR0FBRztBQUMxQyxZQUFJLENBQUM7QUFBVTtBQUVmLGNBQU0sYUFBYSxNQUFNLFFBQVE7QUFDakMsWUFBSSxXQUFXLFFBQVE7QUFBUztBQUVoQyxZQUFJLFVBQVUsV0FBVztBQUN6QixZQUFJLFlBQVksY0FBYztBQUM1QixvQkFBVSxHQUFHLFNBQVMsUUFBUSxRQUFRLENBQUM7QUFBQSxRQUN6QztBQUNBLFFBQUcsY0FBVyxRQUFRLFFBQVEsUUFBUSxHQUFHLFFBQVEsUUFBUSxPQUFPLENBQUM7QUFDakUsb0JBQVlBLFdBQVUsS0FBSyxPQUFPO0FBQUEsTUFDcEM7QUFFQSxpQkFBVyxPQUFPO0FBQUEsUUFDaEI7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0YsR0FBRztBQUNELFlBQUksUUFBUSw0QkFBNEI7QUFFdEMscUJBQVcsQ0FBQyxPQUFPLEdBQUcsS0FBSyxPQUFPLFFBQWFBLFVBQVMsSUFBSSxHQUFHO0FBQzdELHVCQUFXLENBQUMsYUFBYSxLQUFLLE9BQU8sUUFBUSxJQUFJLFNBQVMsR0FBRztBQUMzRCxpQ0FBbUIsNEJBQTRCLG9CQUFvQixnQkFBZ0I7QUFBQSxZQUNyRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGLE9BQU87QUFDTCw2QkFBbUIsR0FBRztBQUFBLFFBQ3hCO0FBQUEsTUFDRjtBQUVBLFVBQVMsVUFBSyxHQUFHLE9BQU8sTUFBTSxzQkFBc0IsRUFBRSxTQUFTLEdBQUc7QUFDaEUsYUFBSyxVQUFVLE9BQU8sTUFBTSxRQUFRO0FBQ3BDLGNBQU0sSUFBSTtBQUFBLFVBQ1I7QUFBQSxRQUNGO0FBQUEsTUFDRixPQUFPO0FBQ0wsUUFBRyxpQkFBYyxjQUFjLEtBQUssVUFBVUEsV0FBVSxNQUFNLENBQUMsQ0FBQztBQUNoRSxpQkFBUyxVQUFVLE9BQU8sTUFBTSxZQUFZO0FBQUEsTUFDOUM7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGO0FBRUEsSUFBTyxpQ0FBUTs7O0FGaEVmLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxFQUFFLDJCQUFTLENBQUMsR0FBRywrQkFBdUIsQ0FBQztBQUNoRSxDQUFDOyIsCiAgIm5hbWVzIjogWyJtYW5pZmVzdCJdCn0K
