'use strict';

require('./server')({
  prerender: true,
  separateStylesheet: true,
  defaultPort: 8081
});
