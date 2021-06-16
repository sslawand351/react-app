deploy:
	npm run build
	cp -R build ../react
	cd ../react && rm -rf public/ && mv build public && git add . && git commit -m "deployment"