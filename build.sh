#!/bin/bash

config=$(cat bower.json)
version_regex="\"version\": \"([^\"]*)\""
[[ "$config" =~ $version_regex ]]
version="${BASH_REMATCH[1]}"

IFS='%'
out=selectize.js
out_min=selectize.min.js
out_css=selectize.css
banner="/*! selectize.js - v${version} | https://github.com/brianreavis/selectize.js | Apache License (v2) */"
banner_css="/*! selectize.css - v${version} | https://github.com/brianreavis/selectize.js | Apache License (v2) */"

append_file () {
	src=$(cat $2 | sed 's/^ *//g' | sed 's/ *$//g' | sed 's.\\.\\\\\\\\\\.g')
	echo -eE "$1\n\n/* --- file: \"$2\" --- */\n\n$src"
}

# enmerate selected plugins
for i in "$@"; do
case $i in
	-p=*|--plugins=*)
	plugins=`echo $i | sed 's/[-a-zA-Z0-9]*=//'`
	;;
esac
done


if [ "$plugins" == "*" ]; then
	plugins=""
	for file in src/plugins/*; do
		if [ -d "$file" ]; then
			file=`basename $file`
			plugins="$plugins,$file"
		fi
	done
	plugins=`echo "$plugins" | sed 's/^,//g'`
fi

#
# BUILD JAVASCRIPT
#

printf "Generating \033[1;39mselectize.js\033[0;39m..."
src=""
for file in src/contrib/*.js; do src=`append_file "$src" $file`; done
for file in src/*.js; do
	if [ "$file" != "src/selectize.js" ] && [ "$file" != "src/selectize.jquery.js" ]; then src=`append_file "$src" $file`; fi
done
src=`append_file "$src" src/selectize.js`
src=`append_file "$src" src/selectize.jquery.js`

# bundle requested plugins...
while IFS=',' read -ra ADDR; do
	for i in "${ADDR[@]}"; do
		file="src/plugins/$i/plugin.js"
		if [ ! -f "$file" ]; then
			printf "\n\033[31mERROR:\033[0;39m Unable to find \"$i\" plugin at \"$file\"\n"
			exit 1
		else
			src=`append_file "$src" $file`
		fi
	done
done <<< "$plugins"

# format and wrap...
src=`echo -e "$src" | while read -r line; do echo -e "\t$line"; done`

src="$banner\n\n(function(factory) {\n\tif (typeof exports === 'object') {\n\t\tfactory(require('jquery'));\n\t} else if (typeof define === 'function' && define.amd) {\n\t\tdefine(['jquery'], factory);\n\t} else {\n\t\tfactory(jQuery);\n\t}\n}(function ($) {\n\t\"use strict\";$src\n\n\treturn Selectize;\n\n}));"
echo -e "$src" > $out
printf " done.\n"

# generate minified version...
printf "Generating \033[1;39mselectize.min.js\033[0;39m..."
curl -s -d compilation_level=SIMPLE_OPTIMIZATIONS \
        -d output_format=text \
        -d output_info=compiled_code \
		--data-urlencode "js_code@$out" \
        http://closure-compiler.appspot.com/compile \
        > $out_min

echo "$banner" | cat - $out_min > temp && mv temp $out_min
printf " done.\n"

#
# BUILD CSS
#

printf "Generating \033[1;39mselectize.css\033[0;39m..."
src="$banner_css"
src=`append_file "$src" src/selectize.css`

# bundle requested plugins...
while IFS=',' read -ra ADDR; do
	for i in "${ADDR[@]}"; do
		file="src/plugins/$i/plugin.css"
		if [ -f $file ]; then
			src=`append_file "$src" $file`
		fi
	done
done <<< "$plugins"
echo -e "$src" > $out_css
printf " done.\n"

#
# COMPLETE
#

printf "\033[32mv${version} compiled\033[0;39m\n"
unset IFS