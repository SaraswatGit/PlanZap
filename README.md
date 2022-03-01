<br/>
<p align=center>
    <h1 align="center"> 📓 PlanZap 📓 </h1>
    <img align="center" src="https://i.postimg.cc/XJSmSqZV/planzap-2.png" alt="PlanZap logo" width="100%"/>
    <br/>
    <h3 align="center">
    <br/>
    <a href="https://github.com/SaraswatGit/PlanZap/stargazers">
      <img alt="Issues" src="https://img.shields.io/github/stars/SaraswatGit/PlanZap?color=0088ff" />
    </a>
    <a href="https://github.com/SaraswatGit/PlanZap/network/members">
      <img alt="Issues" src="https://img.shields.io/github/forks/SaraswatGit/PlanZap?color=0088ff" />
    </a>
    <a href="https://github.com/SaraswatGit/PlanZap/issues">
      <img alt="Issues" src="https://img.shields.io/github/issues/SaraswatGit/PlanZap?color=0088ff" />
    </a>
    <a href="https://github.com/SaraswatGit/PlanZap/pulls">
      <img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/SaraswatGit/PlanZap?color=0088ff" />
    </a>
    <br /><br/>
    <a href="https://drive.google.com/file/d/1t33jODX3xZmITv0QUnhFlc7pja-yHX24/view">View Demo</a>
    ·
    <a href="https://github.com/SaraswatGit/PlanZap/issues">Report Bug</a>
    ·
    <a href="https://github.com/SaraswatGit/PlanZap/issues">Request Feature</a>
  </h3>
</p><br/>

## 🌟 About The Project

A productivity cum utility based open source application, where users can keep an eye on their tasks update their progress , maintain a watchlist for movies , personal diary as well as notes.

## 🌟 Built With

- HTML
- CSS
- React
- Material UI
- REST APIs

## 🌟 Structure

- A side navbar with the fixed position, that render everytime a new section is clicked, in the area beside it- refered to as "routearea" in the app
- All CSS of all files is present in the CSS components file
- `useContext` has been used to get access to userid , login status etc.

### Live site

**_Have a look <a href="https://planzap.netlify.app/">here</a> on the live site._**

## 🌟 Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- You need to install [Node js](https://nodejs.org/en/) to successfully run this project on your local machine.

## 🌟 Contributing

1. Fork the project first

2. Clone the forked repo

   ```sh
   git clone https://github.com/<your_user_name>/PlanZap.git
   ```

3. Navigate to the project directory

   ```sh
   cd PlanZap
   ```

4. In the project directory, install the packages using

   ```sh
   npm install
   ```

5. Run the app on your local server using

   ```sh
   npm run start
   ```

Open [http://localhost:3000](http://localhost:3000) or [http://localhost:3001](http://localhost:3001) to view it in the browser.
The page will reload if you make edits.\
 You will also see any lint errors in the console.

## 🌟 Roadmap

See the [open issues](https://github.com/SaraswatGit/PlanZap/issues) for a list of proposed features . Feel free to raise new issues.

### Thnigs that can be improved

- On login page confirm password and password don't yet have matching ability
- Improing the UI of the login page
- Implementing responsiveness
- Improving the Modals (that pops up to create new movie entry or new diary entry)
- Improving the User experience of the Personal Diary

## 🌟 Code of Conduct

- Only npm should be used for managing packages.
- Only the libraries with 1000+ downloads per week should be used.
- Spamming issues may lead to banning user from contributing to the project.
- No disrespectful comments towards any gender, sex, caste or nationality will be tolerated.

## 🌟 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

**1.** To contribute to this project you first need to fork this repository
Fork [this](https://github.com/SaraswatGit/PlanZap) repository.
To fork it click on the fork
![image](https://user-images.githubusercontent.com/75252077/154020163-b87b8d2d-86f2-48ba-8a4a-963cb01a703e.png)

**2.** Clone your forked copy of the project.
To clone open git bash in your device and type the following command

```
git clone https://github.com/<your github username>/PlanZap.git
```

**3.** Now open git bash in cloned repository folder

**4.** Add a reference(remote) to the original repository.

```
git remote add upstream https://github.com/SaraswatGit/PlanZap.git
```

**5.** Check the remotes for this repository.

```
git remote -v
```

**6.** Always take a pull from the upstream repository to your master branch to keep it at par with the main project(updated repository).

```
git pull upstream main
```

**7.** Create a new branch.

```
git checkout -b <your_branch_name>
```

**8.** Perform your desired changes to the code base.

**9.** Track your changes:heavy_check_mark: .

```
git add .
```

**10.** Commit your changes .

```
git commit -m "Relevant message"
```

**11.** Push the committed changes in your feature branch to your remote repo.

```
git push -u origin <your_branch_name>
```

**12.** To create a pull request, click on `compare and pull requests`. Please ensure you compare your feature branch to the desired branch of the repository you are supposed to make a PR to.

**13.** Add appropriate title and description to your pull request explaining your changes and efforts done.

**14.** Add a screenshot or screen-recording when submitting a PR.

**15.** Click on `Create Pull Request`.

## 🌟 How to resolve merge conflicts

- Conflicts generally arise when two people have changed the same lines in a file, or if one developer deleted a file while another developer was modifying it. In these cases, Git cannot automatically determine what is correct. Conflicts only affect the developer conducting the merge, the rest of the team is unaware of the conflict. Git will mark the file as being conflicted and halt the merging process. It is then the developers' responsibility to resolve the conflict.

- The most direct way to resolve a merge conflict is to edit the conflicted file
- Git commands that can help resolve merge conflicts :-

  1 .The status command is in frequent use when a working with Git and during a merge it will help identify conflicted files.

  ![image](https://user-images.githubusercontent.com/75252077/154049611-a350ccd5-125e-4730-9620-a83a5619f51e.png)
  2 . Passing the --merge argument to the git log command will produce a log with a list of commits that conflict between the merging branches.

  ![image](https://user-images.githubusercontent.com/75252077/154049747-e7e96be6-2df7-41c8-8118-c659d13b393b.png)

  3 . diff helps find differences between states of a repository/files. This is useful in predicting and preventing merge conflicts.

  ![image](https://user-images.githubusercontent.com/75252077/154049841-b802abec-0203-4cea-b93c-b9212738c61b.png)

  - If above are not resolving your issue you can checkout this [url](https://www.atlassian.com/git/tutorials/using-branches/merge-conflicts)

## 🌟 Contributing using Github Desktop

Use this method if you have github desktop downloaded.

**1.** Fork [this](https://github.com/SaraswatGit/PlanZap) repository by clicking on the fork. Forking would create a copy of this repository so you can make changes freely without affecting the original repository.

![image](https://user-images.githubusercontent.com/76390773/156126009-a1991e8d-9fa3-4721-8c3a-442c2bf42d6b.png)

**2.** Open you github desktop, go to file and click on clone repository.

![image](https://user-images.githubusercontent.com/76390773/156126417-a871f7d3-3cab-4f79-b3f1-4ae40ac71d2f.png)

**3.** Choose the forked repository from the options and click on clone.

![image](https://user-images.githubusercontent.com/76390773/156126776-f7d065bf-29e4-4aee-ab56-d8d5eeeec027.png)

**4.** Then click "to contribute on the parent project" option and then continue

**5.** Make a new branch by Clicking on Current Branch, then click on new branch.

![image](https://user-images.githubusercontent.com/76390773/156127373-aafe1680-b650-4ea0-bb82-f36ca4bc59f8.png)

**6.** Give your branch a new name.

**7.** Click on "open in visual studio code" option. This would create a new workspace in your vsc.

![image](https://user-images.githubusercontent.com/76390773/156127803-ef31c105-6adf-4536-8214-5a1567c1d921.png)

**8.** Make the changes you want to make and save. For example the one below:

![image](https://user-images.githubusercontent.com/76390773/156128151-62f96818-b4d4-4799-8a40-8f314dd05e72.png)

**9.** Now go back to the github desktop and you will automatically see the changes.

![image](https://user-images.githubusercontent.com/76390773/156128305-ad76f340-e17c-41f8-914b-83fcc92c9a2e.png)

**10.** Add the title of your change and description and commit.

![image](https://user-images.githubusercontent.com/76390773/156128520-ca17860e-497b-4951-8a19-881a27fdd9e6.png)

**11.** Now click on publish branch.

**12.** Now click on create pull request.This will redirect you to the github website where you can see your changes. Click on "create pull request" .

![image](https://user-images.githubusercontent.com/76390773/156129104-3e3764f9-93de-46c4-a33c-8cbb0f8eea83.png)

**13.** Your work is now done, wait for the creater to merge your changes. Happy contributing! :))

![image](https://user-images.githubusercontent.com/76390773/156129451-2f62604a-593c-4a24-a317-46082c17c197.png)



## 🌟 Open Source Participation

This project is a part of these Open Source Programs

<br/>
<table>
<tr>
 <td>
<a href="https://jwoc.tech"><img src="https://jwoc.tech/assets/img/opengraph.png" width=100px height=100px /></a>
 </td>
 <td>
<a href="https://gssoc.girlscript.tech/"><img src="https://github.com/girlscript/GirlScript-Summer-of-Code/blob/master/images/favicon/favicon.png" width=100px height=100px /></a>
 </td>
</tr>
</table>

## 🌟 Contributors

Thanks to these wonderful people ✨✨:

<table>
	<tr>
		 <td>
  <a href="https://github.com/SaraswatGit/PlanZap/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=SaraswatGit/PlanZap" />
  </a>
		</td>
	</tr>
</table>

## 🌟 Project Admin

<br/>
<p align = "center">
<a href="https://github.com/SaraswatGit"><img src="https://avatars.githubusercontent.com/u/58114914?v=4" width=100px height=100px /></a>
</p>
<p align = "center">
<a href="https://github.com/SaraswatGit"><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="25"></img></a>&nbsp;&nbsp; <a href="https://www.linkedin.com/in/saraswat-majumder-b9136115b/"><img src="https://www.felberpr.com/wp-content/uploads/linkedin-logo.png" width="25"></img></a>
</p>
