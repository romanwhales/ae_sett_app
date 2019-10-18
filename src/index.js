import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Root from './Root';


import locale_en from 'react-intl/locale-data/en';
import locale_de from 'react-intl/locale-data/de';
import locale_fr from 'react-intl/locale-data/fr';

import {addLocaleData} from 'react-intl';

import messages_de from './translations/de.json';
import messages_en from './translations/en.json';
import messages_fr from './translations/fr.json';


// disable ServiceWorker
// import registerServiceWorker from './registerServiceWorker';

// const messages = {
//     'de':messages_de,
//     'en':messages_en,
//     'fr':messages_fr
// }



// const language = navigator.language.split(/[-_]/)[0];

addLocaleData([...locale_en,...locale_de,...locale_fr]);

ReactDOM.render(
    <Root>
        <App/>
    </Root>
, document.getElementById('root'));
// disable ServiceWorker
// registerServiceWorker();
