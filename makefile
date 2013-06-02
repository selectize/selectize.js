all:
	./build.sh
release: all
	sed -i.bak 's/"version": "[^"]*"/"version": "$(VERSION)"/' selectize.jquery.json
	sed -i.bak 's/"version": "[^"]*"/"version": "$(VERSION)"/' bower.json
	rm *.bak
	cp selectize.js ../.selectize.js
	git add .
	git commit -a -m "Released $(VERSION)."
	git tag v$(VERSION)
	git push origin master
	git push origin --tags
	git checkout gh-pages
	mv -f ../.selectize.js js/selectize.js
	git commit -a -m "Updated to $(VERSION)."
	git push origin gh-pages
	git checkout master