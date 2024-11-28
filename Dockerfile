# 基础镜像
FROM node:14-alpine

# 工作目录 下面的所有命令都基于这个目录
WORKDIR /code


ADD package-lock.json /code/

RUN npm install

# 把所有文件添加进code目录里面
ADD . /code/

# 执行脚步
RUN npm run build

# 启动服务命令放在 CMD 指令中 - 启动serve服务
CMD npm run start

# 暴露端口
EXPOSE 3000

