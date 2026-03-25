FROM nginx:alpine

# 1. Copy the website content into Nginx's default public directory
COPY ./retalp-web /usr/share/nginx/html

# 2. Replace the default Nginx configuration with your custom one
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 3. Expose port 80 to the network
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
