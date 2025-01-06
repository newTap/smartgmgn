// This injects a box into the page that moves with the mouse;

import { Page } from "puppeteer";

// Useful for debugging
export default async function installMouseHelper(page:Page) {
  await page.evaluateOnNewDocument(() => {

    window.addEventListener('DOMContentLoaded', () => {
      const box = document.createElement('div');
      box.className = 'puppeteer-mouse-pointer';
      box.style = `
          pointer-events: none;
          position: absolute;
          top: 0;
          z-index: 10000;
          left: 0;
          width: 20px;
          height: 20px;
          background: rgba(0,0,0,.4);
          border: 1px solid white;
          border-radius: 10px;
          margin: -10px 0 0 -10px;
          padding: 0;
          transition: background .2s, border-radius .2s, border-color .2s;
      `;
      // document.head.appendChild(styleElement);
      document.body.appendChild(box);
      document.addEventListener('mousemove', event => {
        box.style.left = event.pageX + 'px';
        box.style.top = event.pageY + 'px';
        updateButtons(event.buttons);
      }, true);
      document.addEventListener('mousedown', event => {
        updateButtons(event.buttons);
        box.classList.add('button-' + event.which);
      }, true);
      document.addEventListener('mouseup', event => {
        updateButtons(event.buttons);
        box.classList.remove('button-' + event.which);
      }, true);
      function updateButtons(buttons:number) {
        for (let i = 0; i < 5; i++)
          box.classList.toggle('button-' + i, !!(buttons & (1 << i)));
      }
    }, false);
  });
};
