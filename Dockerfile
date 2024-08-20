

# Sử dụng node image làm base image
FROM node:18-alpine

# Tạo thư mục làm việc và copy code vào container
WORKDIR /app
COPY . .

# Cài đặt dependencies
RUN npm install

# Expose port mà ứng dụng Node.js của bạn sẽ chạy
EXPOSE 5000

# Khởi động ứng dụng
CMD [ "npm", "start"]
