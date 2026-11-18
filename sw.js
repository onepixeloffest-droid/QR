/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-afac4cd2'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "registerSW.js",
    "revision": "402b66900e731ca748771b6fc5e7a068"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "231eb6a0bf63bcac50baf9c4584de17b"
  }, {
    "url": "pwa-512x512.png",
    "revision": "6f6f97f490d8b159d9cd856251ed1828"
  }, {
    "url": "pwa-192x192.png",
    "revision": "a547bd1391755bd2a9271095abe9fe84"
  }, {
    "url": "index.html",
    "revision": "d2938e59899170d30994c7deb6c113fa"
  }, {
    "url": "icon.svg",
    "revision": "e00dbc364449ddfedbced44d7cecb29c"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "f48c6e663450e006848337d5bdf1be68"
  }, {
    "url": "assets/index-DGcrxgkx.css",
    "revision": null
  }, {
    "url": "assets/index-B2wf9EJ0.js",
    "revision": null
  }, {
    "url": "assets/aistudio/image_9bf058d9.png",
    "revision": null
  }, {
    "url": ".nojekyll",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "f48c6e663450e006848337d5bdf1be68"
  }, {
    "url": "icon.svg",
    "revision": "e00dbc364449ddfedbced44d7cecb29c"
  }, {
    "url": "pwa-192x192.png",
    "revision": "a547bd1391755bd2a9271095abe9fe84"
  }, {
    "url": "pwa-512x512.png",
    "revision": "6f6f97f490d8b159d9cd856251ed1828"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "231eb6a0bf63bcac50baf9c4584de17b"
  }, {
    "url": "manifest.webmanifest",
    "revision": "6dbdc9fe013ac450225f260942b0d3e7"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));
  workbox.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "google-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "gstatic-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');

}));
