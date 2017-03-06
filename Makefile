.PHONY: compile release test
plugins=*
GRUNT=node_modules/.bin/grunt

all: compile
test:
	npm test
compile:
	$(GRUNT) --plugins=$(plugins)
release:
ifeq ($(strip $(version)),)
	@echo "\033[31mERROR:\033[0;39m No version provided."
	@echo "\033[1;30mmake release version=1.0.0\033[0;39m"
else
	sed -i.bak 's/"version": "[^"]*"/"version": "$(version)"/' selectize.jquery.json
	sed -i.bak 's/"version": "[^"]*"/"version": "$(version)"/' package.json
	rm *.bak
	make compile
	npm test || exit 1
	cp dist/js/standalone/selectize.js ../.selectize.js
	git add .
	git commit -a -m "Released $(version)."
	git tag v$(version)
	git push origin master
	git push origin --tags
	npm publish
	git checkout gh-pages
	mv -f ../.selectize.js js/selectize.js
	git commit -a -m "Updated selectize.js to latest version."
	git push origin gh-pages
	git checkout master
	@echo "\033[32mv${version} released\033[0;39m"
endif
