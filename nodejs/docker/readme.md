建镜像
```shell
docker build -t fe-app-prod -f dockerfile.prod .
```
查镜像
```shell
docker images
```
跑容器
```shell
docker run -p 9092:80 -it a640ee595f7f
```
查容器
```shell
docker ps
```