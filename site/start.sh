 #!/bin/bash

npm install
npm run build
cp -a ./build/. /var/www/staging
