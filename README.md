## Lab 6 - Shawn Ruby
In this project I utilized Docker containers to host a webserver on my local machine, and remotely through the use of AWS instances. I also utilized GitHub Actions and DockerHub to create a workflow that would build and push a Docker image to DockerHub for deployment. 

## Installing Docker Desktop for Windows
To install Docker Desktop for Windows navigate to this site https://docs.docker.com/desktop/windows/install/ and click the download button as seen below: 

![](https://i.gyazo.com/92a271a3932d65e09158d58258383c8d.png)

Once that is installed, simply complete the first time setup prompts and you're good to go. 

## Hosting with Local Containers
To host locally you're going to need to use a web hosting Docker Image. Nginx and Apache are the most popular options, I went with Nginx because many users say that it's better than Apache for hosting static websites. All that you need for this to work is a new directory (it can be named anything, but I named mine 'website'), an index.html file, and a Dockerfile (this should be a file of the *All Files* type, if it isn't then Docker may not recognize it). Here is a sample image of my directory: 

![](https://i.gyazo.com/4d0e832ed83800c0764315f95aa3194b.png)

Dockerfile has the code: 
```
FROM nginx:latest
COPY ./index.html /usr/share/nginx/html/index.html
```
index.html can have any html code that you'd like, here is a bit of sample code that will function as a page so you can test this project: 

```
<html>
   <head>
       <title>Nginx Test Site</title>
   </head>
   <body>
       <h1>Success! The Nginx server is working!</h1>
   </body>
</html>
```
Once your files are in the appropriate place you need only open a console and navigate to your project folder. To build the image for your project you will run this command in your console: 
`docker build -t webserver`
Next, to deploy the image that you created you will run this command: 
`docker run -it --rm -d -p 8080:80 --name web webserver`

This is roughly what your console should look like now: 
![](https://i.gyazo.com/0836382bb7e1d2a1a3af00fd85ed53ec.png)

To test your website simply go to http://localhost:8080/ in any web browser of your choice.
## GitHub Actions & DockerHub
To create a Docker Hub repository navigate to https://hub.docker.com/ and register a new account. Next you're going to click the repositories button at the top of the screen and then create new repository in that menu. Name the repository anything that you'd like and make a note of your push command that is shown on the right of the screen within the repository view. 

![](https://i.gyazo.com/fc5c9ecd26b70c64c061f78c1ab3cfd4.png)
From here you can click your username in the top right corner (mine is shown in the screenshot as agreeablyblue) and select **Account Settings > Security > Create a New Personal Access Token.** You can name this token anything you like, and copy it to your clipboard for the next step.

Next navigate to your GitHub repository and select **Settings > Secrets > New Secret.** Create a new secret with the name `DOCKER_HUB_USERNAME` and your Docker username as the value. 

Create another secret with the name `DOCKER_HUB_ACCESS_TOKEN` and paste the PAT you copied from Docker Hub to the value section. You can now save this and exit to your main repository page. 

From your main repository page select **Actions > New Workflow > Set up a workflow yourself**
   ![](https://i.gyazo.com/01081773208f586dc4738bdddc0570f9.png)

From there you can add code that will execute based on other settings in your repository. Here is the file that I used with my docker credentials secrets to have my repository pushed to docker:

```# This is a basic workflow to help you get started with Actions

name: CI To Docker Hub

# Controls when the workflow will run

on:

# Triggers the workflow on push or pull request events but only for the main branch

push:

branches: [ main ]

pull_request:

branches: [ main ]

# Allows you to run this workflow manually from the Actions tab

workflow_dispatch:

# A workflow run is made up of one or more jobs that can run sequentially or in parallel

jobs:

# This workflow contains a single job called "build"

build:

# The type of runner that the job will run on

runs-on: ubuntu-latest

# Steps represent a sequence of tasks that will be executed as part of the job

steps:

- name: Check Out Repo

uses: actions/checkout@v2

- name: Login to Docker Hub

uses: docker/login-action@v1

with:

username: ${{ secrets.DOCKER_HUB_USERNAME }}

password: ${{ secrets.DOCKER_HUB_ACCESS_TOKEN }}

- name: Set up Docker Buildx

id: buildx

uses: docker/setup-buildx-action@v1

- name: Build and push

id: docker_build

uses: docker/build-push-action@v2

with:

context: ./

file: ./Dockerfile

push: true

tags: ${{ secrets.DOCKER_HUB_USERNAME }}/simplewhale:latest

- name: Image digest

run: echo ${{ steps.docker_build.outputs.digest }}
```

## Deployment to Servers
SSH into your Ubuntu server and install Docker with the following commands: 


```
$ sudo apt-get update

$ sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

```
```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```
```
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```
```
$ sudo apt-get update
$ sudo apt-get install docker-ce docker-ce-cli containerd.io
```

Verify that the installation worked by running the `hello-world` Docker Image
`sudo docker run hello-world`

Now at your Docker Repository check for your repositories pull command and run this on your new server. Mine is `docker pull agreeablyblue/website`

![](https://i.gyazo.com/bb2d944193ae6167618661113500805b.png)
## References

- https://www.docker.com/blog/how-to-use-the-official-nginx-docker-image/
 - https://www.youtube.com/watch?v=qxPdd-geqqA&ab_channel=ThatDevOpsGuy
 - https://docs.docker.com/ci-cd/github-actions/
 - https://github.com/pattonsgirl/Fall2021-CEG3120/tree/main/Projects/Project6#Part-1---Dockerize-it
 
 
