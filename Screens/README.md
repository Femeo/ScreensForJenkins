# Smart-screens

This is the repository for the screen application that allows a user to choose the content to be displayed on their projects screens from a remote location and then use a Raspberry Pi connected to that screen to display the sites and one-pagers.

# Development Set up

Make sure that when you pull the code from this repository that you run **npm install**. This allows the Node to install all of the packages that the application uses locally on your device.

# Project Content

The project is essentially split into two parts. The first part is the user interface to allow a member of staff to add a new Raspberry Pi device to the system which will be used to display content. Urls are added to a screen using the screens-hub application.

The second part to project is a shell script which reads the relevant url's from the database depending on the ID number and then loads up a browser with these urls and then rotates through them at a cosntant rate.