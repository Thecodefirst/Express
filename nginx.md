docker run --rm -d -p 8081:80 --name hm-nginx \
  -v /home/webuser/hm_nginx/www:/usr/share/nginx/html \
  -v /home/webuser/hm_nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
  -v /home/webuser/hm_nginx/logs:/var/log/nginx \
  nginx

docker build -t hm-node-image .
docker run -d --name hm-node -p 3000:3000