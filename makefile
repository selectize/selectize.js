.PHONY: update watch

all:
	@echo "Building..."
	@make update
	@make watch
update:
	@echo "Updating Dependencies..."
	git pull
	bundle install
	npm install
watch:
	npm run serve
publish:
	@echo "Preparing for release..."
	@make update
	npm run build:jekyll
	npm run build:tailwind
	scripts/proof.sh