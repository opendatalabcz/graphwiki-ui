FROM nginx:1.17.1-alpine

COPY /nginx.conf /etc/nginx/conf.d/default.conf
COPY /dist/graphwiki-ui /usr/share/nginx/html
