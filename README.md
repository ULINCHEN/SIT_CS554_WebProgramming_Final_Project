This is CS554 Final Project Repo

Team Member:
Youlin Chen,
Yetong Chen,
Ziheng Zhu,
Gai Li Ho,
Hanyu Wang


### How to start the project:

1 - Install docker -> https://www.docker.com/

2 - Make sure the following ports are not occupied -> 3000 (backend service), 3001, 4000 (frontend service), 6379, 5672, 15672

3 - Execute the following terminal command in the project root directory -> docker-compose up

    This command will build each service's image in docker, including data seeding process.
   
    You might have to wait a while for everything to be set up in docker. 
    
    Then, you can open http://localhost:4000 on browser to start your testing.

4 - Make sure the services are started correctly in docker, enjoy！

### IMPORTANT
1 - Inorder to test the email service, please change this two account email address to your email address. 
<br/>2 - Please use two different browser to login 
<br/>3 - If possible do not run under school wifi, the fire wall may block mail service

### Test flow

1 - crate new account
<br />2 - log in
<br />3 - change personal profile
<br />4 - matching
<br />5 - real time chatting between two client after successful matched
<br />6 - check email notify matched up

### Test Account:

username: cat3
<br />password: Cat3..

username: dog3
<br /> password: Dog3..



