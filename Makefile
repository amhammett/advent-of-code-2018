.PHONEY = help install deploy invoke terminate test eslint

# pathing
ifeq ($(OS),Windows_NT)
    yarn_eslint_path := ./node_modules/.bin/eslint
    yarn_mocha_path := ./node_modules/.bin/mocha
    yarn_nodemon_path := ./node_modules/.bin/nodemon
    yarn_serverless_path := ./node_modules/.bin/serverless
else
    yarn_eslint_path := ./node_modules/.bin/eslint
    yarn_mocha_path := ./node_modules/.bin/mocha
    yarn_nodemon_path := ./node_modules/.bin/nodemon
    yarn_serverless_path := ./node_modules/.bin/serverless
endif

help: ## this help text
	@echo 'Available targets'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

# env
install: | yarn_packages ## install all the things

yarn_packages: ## install yarn packages
	yarn install

# dev
git_sha = $(shell git describe --always --dirty="+" || echo 'here-be-dragons')
watch_command := make -k test || true
watch_ext := js,json

watch: ## watch <watch_command='make test'> <watch_ext=js,json>
	${yarn_nodemon_path} --exec "${watch_command}" --ext "${watch_ext}"

# run
day := 01

run: ## generate a day's solution <day=day>
	node src/index.js day=${day}

# test
test: | json-lint eslint mocha ## test all the things

eslint: ## eslint files
	${yarn_eslint_path} src data test

json-lint: ## json-lint files
	${yarn_eslint_path} --ext .json src data test

mocha: ## run mocha tests
	${yarn_mocha_path} test
