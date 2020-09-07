
# To "deploy" this app:
# bazel build //react:build
# docker build -t my-app -f react/Dockerfile bazel-bin/react/build
# docker run -d -p 8080:80 --name my-app my-app
# Open http://localhost:8080 in your browser.
# docker rm -f my-app

FROM nginx:stable-alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
