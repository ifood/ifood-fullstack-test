FROM node:12.22 as builder

# set working directory
RUN mkdir /opt/ifood
WORKDIR /opt/ifood

# set api gateway address
ARG IP_ADDR
ENV IP_ADDR=${IP_ADDR}

# add `node_modules/.bin` to $PATH
ENV PATH /opt/ifood/node_modules/.bin:$PATH

# copy files to build the project
COPY . .
RUN yarn --silent
RUN IP_ADDR="${IP_ADDR}" && yarn build

FROM nginx:1.15.8-alpine

COPY --from=builder /opt/ifood/build /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]