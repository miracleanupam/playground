// Personal Data in JSON
data = {
  firstname : 'Anupam',
  lastname : 'Dahal',
  age : 21,
  gender : 'Male',
  education : 'BE in Computer Engineering',
  projects : [
    {projectname : 'Matching Pair',description : 'Console Game'},
    {projectname : 'Save The Queen',description : 'Console Game'},
    {projectname : 'Dhoon', description : 'Music Recommender'},
    {projectname : 'iJoRMS', description : 'Resume Ranking System'}
  ],
  interests : [
    'learning foreign language',
    'sketching',
    'visiting places'
  ]
};

// Get body div
var body = document.getElementsByTagName('body')[0];

// Create divs for name, age, and gender
// Define styles
// Store data in respective divs
var namediv = document.createElement('div');
namediv.style.textAlign = 'left';
namediv.innerHTML = data.firstname + ' ' + data.lastname;
body.appendChild(namediv);
var agediv = document.createElement('div');
agediv.style.textAlign = 'left';
agediv.innerHTML = data.age + ' Years';
body.appendChild(agediv);
var genderdiv = document.createElement('div');
genderdiv.style.textAlign = 'left';
genderdiv.innerHTML = data.gender;
body.appendChild(genderdiv);
var edudiv = document.createElement('div');
edudiv.style.textAlign = 'left';
edudiv.innerHTML = data.education;
body.appendChild(edudiv);
var projectsdiv = document.createElement('div');
projectsdiv.innerHTML = 'PROJECTS';
body.appendChild(projectsdiv);
var projectsul = document.createElement('ul');
projectsdiv.appendChild(projectsul);
for (var i=0; i<data.projects.length; i++){
  var listitem = document.createElement('li');
  listitem.style.marginLeft = '10px';
  listitem.innerHTML = data.projects[i].projectname + ' : ' + data.projects[i].description;
  projectsul.appendChild(listitem);
}
var interestdiv = document.createElement('div');
interestdiv.style.textAlign = 'left';
interestdiv.innerHTML = 'INTERESTS';
body.appendChild(interestdiv);
var interestul = document.createElement('ul');
interestdiv.appendChild(interestul);
for (var i=0; i<data.interests.length; i++){
  var listitem = document.createElement('li');
  listitem.style.marginLeft = '10px';
  listitem.innerHTML = data.interests[i];
  interestul.appendChild(listitem);
}
