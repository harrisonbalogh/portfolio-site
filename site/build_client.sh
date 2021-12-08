 #!/bin/bash

if [ $# -ne 2 ] || ! [ -d "$1" ] || ! [ -d "$2" ] 
then
  exit 1
fi

# Rebuild client to include release changes
(cd $1; npm install; npm run build; cp -a ./build/. $2)
