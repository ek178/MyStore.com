FROM mcr.microsoft.com/windows/nanoserver:1809
USER Administrator

COPY "nodejs/" "c:/nodejs/"
RUN setx /M PATH "%PATH%;c:/nodejs"
WORKDIR "c:/"
RUN npm config set registry=sus
RUN npm config set strict-ssl=false
COPY "dist/" "dist/"
RUN npm install http-server

EXPOSE 4200
EXPOSE 8000
CMD npx http-server dist/vex