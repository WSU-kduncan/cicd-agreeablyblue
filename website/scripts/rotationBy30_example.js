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
var dir2 = new THREE.Vector3(0, 0, -1);
var dir3 = new THREE.Vector3(1, 0, 0);
var dir4 = new THREE.Vector3(1, 0, 0);

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
var length = 500;
var hex = 0x000000;
var headLength = 20;
var headWidth = 15;
var headWidth2 = 0;

//Creates the arrow helpers based on the variables specified above
var arrowHelper1 = new THREE.ArrowHelper(dir1, origin, length, hex, headLength, headWidth);
var arrowHelper2 = new THREE.ArrowHelper(dir2, origin, length, hex, headLength, headWidth);

var arrowHelper3 = new THREE.ArrowHelper(dir3, origin, length, hex, headLength, headWidth);
var arrowHelper4 = new THREE.ArrowHelper(dir4, origin, length, hex, headLength, headWidth);

arrowHelper3.rotation.y = THREE.Math.degToRad(120);
arrowHelper4.rotation.y = THREE.Math.degToRad(30);
//Adds the first 2 arrow helpers to group 1
group1.add(arrowHelper1);
group1.add(arrowHelper2);

//Adds the rest of the arrow helpers and lines to group 2
group2.add(arrowHelper3);
group2.add(arrowHelper4);


//Align group 1 and 2
group1.position.z = 200;
group1.position.x = -200;
group2.position.z = 200;
group2.position.x = -200;

//Adds the arrow helpers to the scene
scene.add(group1);
scene.add(group2);

//Circles
var geometry = new THREE.CircleGeometry( 12, 50 );
var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
var circle1 = new THREE.Mesh( geometry, material );
var circle2 = new THREE.Mesh( geometry, material );
var circle3 = new THREE.Mesh( geometry, material );
var circle4 = new THREE.Mesh( geometry, material );
scene.add(circle1);
scene.add(circle2);
scene.add(circle3);
scene.add(circle4);

circle1.rotation.y = THREE.Math.degToRad(0);
circle1.rotation.x = THREE.Math.degToRad(-90);
circle2.rotation.y = THREE.Math.degToRad(0);
circle2.rotation.x = THREE.Math.degToRad(-90);
circle3.rotation.y = THREE.Math.degToRad(0);
circle3.rotation.x = THREE.Math.degToRad(-90);
circle4.rotation.y = THREE.Math.degToRad(0);
circle4.rotation.x = THREE.Math.degToRad(-90);

circle1.position.z = 200;
circle1.position.x = -200;
circle2.position.z = -450;
circle2.position.x = -200;
circle3.position.z = -255;
circle3.position.x = -700;
circle4.position.z = 200;
circle4.position.x = 450;

//Creats curve to mark 30 degrees
//Defines points for the arc
var curve = new THREE.SplineCurve([
  new THREE.Vector2(0, 0),
  new THREE.Vector2(20,57.5),
  new THREE.Vector2(0, 115),

]);

//Creates the arc arc geometry based on defined points
var curvePoints = curve.getPoints(50);
var curveGeometry = new THREE.BufferGeometry().setFromPoints(curvePoints);

var curveMaterial = new THREE.LineBasicMaterial({
  color: 0x000000
});

// Create the arc object to add to the scene
var splineObject = new THREE.Line(curveGeometry, curveMaterial);
splineObject.rotation.x = THREE.Math.degToRad(-90);
scene.add(splineObject);

splineObject.position.z = 202;

//Focuses the camera on the rendered object
camera.position.y = 650;
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
