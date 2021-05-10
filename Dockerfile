# FROM node:latest
# # 将根目录下的文件都copy到container（运行此镜像的容器）文件系统的app文件夹下
# ADD . /app/
# # cd到app文件夹下
# WORKDIR /app

# # 安装项目依赖包
# RUN npm install
# RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime 
# # 容器对外暴露的端口号
# EXPOSE 3000
 
# # 容器启动时执行的命令，类似npm run start
# CMD ["npm", "start"]

 FROM node:latest
 ADD . /app/
 WORKDIR /app
 ENV TZ Asia/Shanghai
 ARG registry=https://registry.npm.taobao.org
 ARG disturl=https://npm.taobao.org/dist
 RUN yarn config set disturl $disturl
 RUN yarn config set registry $registry
 RUN yarn --frozen-lockfile --production
 EXPOSE 3000
 CMD [ "npm", "start" ]

#FROM node:latest
#ADD . /app/
#WORKDIR /app
#ENV TZ Asia/Shanghai
#RUN npm install
#EXPOSE 3000
#CMD [ "npm", "start" ]