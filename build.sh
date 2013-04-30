#!/bin/bash
IFS='%'
out=jquery.selectize.js
out_min=jquery.selectize.min.js
banner="/*! jquery.selectize.js | https://github.com/brianreavis/jquery-selectize | Apache License (v2) */"

append_file () {
	src=$(cat $2 | sed 's/^ *//g' | sed 's/ *$//g' | sed 's.\\.\\\\\\\\\\.g')
	echo -eE "$1\n\n// --- $2 ---\n\n$src"
}

# bundle files...

src=""
for file in src/contrib/*.js; do src=`append_file "$src" $file`; done
for file in src/*.js; do
	if [ "$file" != "src/selectize.js" ]; then src=`append_file "$src" $file`; fi
done
src=`append_file "$src" src/selectize.js`

# format and wrap...

src=`echo -e "$src" | while read -r line; do echo -e "\t$line"; done`
src="$banner\n\n(function ($,window,document) {\n\t\"use strict\";$src\n})(jQuery,window,document);"

echo -e "$src" > $out

# generate minified version...

curl -s -d compilation_level=SIMPLE_OPTIMIZATIONS \
        -d output_format=text \
        -d output_info=compiled_code \
		--data-urlencode "js_code@$out" \
        http://closure-compiler.appspot.com/compile \
        > $out_min

echo "$banner" | cat - $out_min > temp && mv temp $out_min

unset IFS