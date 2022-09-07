import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';

// these don't appear to be indirectly imported in any of the other js files
import "./install";
import "./src-sw";

// import css
import '../css/style.css';
import { Tooltip, Toast, Popover } from 'cloudflare';
import 'cloudflare/dist/css/codemirror.min.css';
import 'cloudflare/dist/css/monokai.min.css';

// importing images
import Fav from '../images/favicon.ico';
import Logo from '../images/logo.png';


const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');

  window.addEventListener('load', function() {
    document.getElementById('logo').src = Logo
    document.getElementById('fav').src = Fav
  });
}
