//Scene to hold all 3D objects
var scene = new THREE.Scene();

//Camera to view the scene, field of view, size, and render distance are set in its constructor
var camera = new THREE.PerspectiveCamera(75, (window.innerWidth / window.innerHeight), 0.1, 10000);

//Container that holds all the objects which is an element of moving_From2D.html
var container = document.getElementById('container');

//Creats renderer which is what allows the scene of 3D objects to be displayed
renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth * 0.55, window.innerHeight * 0.55);
container.appendChild(renderer.domElement);
renderer.setClearColor("#F5F5F5");


//Scalable window resizing
window.addEventListener('resize', function() {
  var width = window.innerWidth * 0.55;
  var height = window.innerHeight * 0.55;
  renderer.setSize(width, height);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  camera.position.y = 1235/camera.aspect;
});


//Arrow Helpers which act as guide lines for the coordinate system
var dir1 = new THREE.Vector3(1, 0, 0);
var dir2 = new THREE.Vector3(0, 0, -400);
var dir3 = new THREE.Vector3(1, 0, 0);
var dir4 = new THREE.Vector3(1, 0, -1);
var dir5 = new THREE.Vector3(1, 0, 0);
var dir6 = new THREE.Vector3(0, 0, -1);

//Groups to hold the arrow Helpers
var group1 = new THREE.Group();
var group2 = new THREE.Group();
var group3 = new THREE.Group();

//normalize the direction vector (convert to vector of length 1)
dir1.normalize();
dir2.normalize();
dir3.normalize();

//Defining variables for all six arrow helpers
var origin = new THREE.Vector3(0, 0, 0);
var length = 400;
var length2 = 200;
var hex = 0x000000;
var headLength = 20;
var headWidth = 15;

//Creates the first set of arrow helpers based on the variables specified above
var arrowHelper1 = new THREE.ArrowHelper(dir1, origin, length, hex, headLength, headWidth);
var arrowHelper2 = new THREE.ArrowHelper(dir2, origin, length, hex, headLength, headWidth);

//Adds the first 2 arrow helpers to group 1
group1.add(arrowHelper1);
group1.add(arrowHelper2);

//Align group 1 left
group1.position.x = -850;


//Creates the second set of arrow helpers based on the variables specified above
var arrowHelper3 = new THREE.ArrowHelper(dir3, origin, length, hex, headLength, headWidth);
var arrowHelper4 = new THREE.ArrowHelper(dir4, origin, length, hex, headLength, headWidth);

//Adds the first 2 arrow helpers to group 1
group2.add(arrowHelper3);
group2.add(arrowHelper4);

//Align group 2 center
group2.position.x = -250;


//Creates the third set of arrow helpers based on the variables specified above
var arrowHelper5 = new THREE.ArrowHelper(dir5, origin, length, hex, headLength, headWidth);
var arrowHelper6 = new THREE.ArrowHelper(dir6, origin, length2, hex, headLength, headWidth);

//Adds the first 2 arrow helpers to group 1
group3.add(arrowHelper5);
group3.add(arrowHelper6);

//Align group 3 right
group3.position.x = 350;


//Adds the arrow helpers to the scene
scene.add(group1);
scene.add(group2);
scene.add(group3);


//Focuses the camera on the rendered object

camera.position.y = 1235/camera.aspect;
camera.lookAt(0, 0, 0);
camera.rotation.y = 90 * Math.PI / 180;
camera.rotation.order = "YXZ";

//Function to implement orbit OrbitControls - used for testing, not part of the functionality of the program
var orbit = new THREE.OrbitControls(camera, renderer.domElement);
orbit.enabled = false;

//Switch case statement variable which keeps track of how many times the animation button has been clicked
var moveCase = 1;

//Main function that renders the scene. Called at the bottom of the document to do the initial render of the scene
var animate = function() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};



//Function call to render the scene
animate();
