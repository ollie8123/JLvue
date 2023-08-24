# 使用 Node.js 官方映像作為基礎映像
FROM node:lts-alpine as build-stage

# 在容器中設置工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製專案文件
COPY . .

# 建置專案
RUN npm run build

# 用 Nginx 來部署
FROM nginx:stable-alpine as production-stage

# 將 build-stage 階段建構出來的靜態文件拷貝到 Nginx 的服務目錄下
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 開放 5173 端口
EXPOSE 7777

# 啟動 Nginx
CMD ["nginx", "-g", "daemon off;"]