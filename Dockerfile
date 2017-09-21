FROM nginx:latest

# Create app directory

COPY . /usr/share/nginx/html/

# 执行服务
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80
