#!/bin/bash
IFS='%'
out=selectize.js
out_min=selectize.min.js
banner="/*! selectize.js | https://github.com/brianreavis/selectize.js | Apache License (v2) */"

append_file () {
	src=$(cat $2 | sed 's/^ *//g' | sed 's/ *$//g' | sed 's.\\.\\\\\\\\\\.g')
	echo -eE "$1\n\n// --- $2 ---\n\n$src"
}

# bundle files...

printf "Generating \033[1;39mselectize.js\033[0;39m..."
src=""
for file in src/contrib/*.js; do src=`append_file "$src" $file`; done
for file in src/*.js; do
	if [ "$file" != "src/selectize.js" ]; then src=`append_file "$src" $file`; fi
done
src=`append_file "$src" src/selectize.js`

# format and wrap...

src=`echo -e "$src" | while read -r line; do echo -e "\t$line"; done`

src="$banner\n\n(function (factory) {\n\tif (typeof exports === 'object') {\n\t\tfactory(require('jquery'));\n\t} else if (typeof define === 'function' && define.amd) {\n\t\tdefine(['jquery'], factory);\n\t} else {\n\t\tfactory(jQuery);\n\t}\n}(function ($) {\n\t\"use strict\";$src\n\n\treturn Selectize;\n\n}));"
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

unset IFS