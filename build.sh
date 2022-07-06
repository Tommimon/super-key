#!/bin/bash

# compile schemas
glib-compile-schemas schemas/

# find version
while read line
do
    if echo "$line" | grep -q '"version":'
    then
        version=${line:11:${#line}-11};
    fi
done < metadata.json

# create .zip
mkdir output
zip output/super-key@tommimon.github.com.v"${version}".shell-extension.zip ./*.js README.md LICENSE metadata.json -r schemas