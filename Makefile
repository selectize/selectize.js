.PHONY: compile release test
GULP=node_modules/.bin/gulp
CURRENT_VERSION := $(shell sed -n '/"version":/{s/.*"version": "\([^"]*\)".*/\1/p;q}' package.json)
version ?= $(CURRENT_VERSION) ## Version to release

all: compile test ## (default) Run Compile and test targets
test: ## runs all tests (equivalent to `npm test`)
	npm test
compile: ## compile the project, update package versions if specified, installs dependencies, and builds the project
	npm i
	cd docs && npm i
	rm -rf dist
	$(GULP) loadDependencies
	npm run build
	$(GULP) docs
release: ## make release version=x.x.x -- commit, tag, and npm publish the specified version
ifeq ($(strip $(version)),)
	@echo "\033[31mERROR:\033[0;39m No version provided."
	@echo "\033[1;30mmake release version=1.0.0\033[0;39m"
else
	sed -i 's/"version": "[^"]*"/"version": "$(version)"/' package.json
	sed -i "s/\"version\": \"$(CURRENT_VERSION)\"/\"version\": \"$(version)\"/" package-lock.json
	make compile
	npm test || exit 1
	git add .
	git commit -a -m "Released $(version)."
	git tag v$(version)
	git push origin master
	git push origin --tags
	npm publish --access public
	@echo "\033[32mv${version} released\033[0;39m"
endif

help: ## show this help
	@sed -ne "s/^##\(.*\)/\1/p" $(MAKEFILE_LIST)
	@printf "────────────────────────`tput bold``tput setaf 2` Make Commands `tput sgr0`────────────────────────────────\n"
	@sed -ne "/@sed/!s/\(^[^#?=]*:\).*##\(.*\)/`tput setaf 2``tput bold`\1`tput sgr0`\2/p" $(MAKEFILE_LIST)
	@printf "────────────────────────`tput bold``tput setaf 4` Make Variables `tput sgr0`───────────────────────────────\n"
	@sed -ne "/@sed/!s/\(.*\)?=\(.*\)##\(.*\)/`tput setaf 4``tput bold`\1:`tput setaf 5`\2`tput sgr0`\3/p" $(MAKEFILE_LIST)
	@printf "───────────────────────────────────────────────────────────────────────\n"
