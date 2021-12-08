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
var dir2 = new THREE.Vector3(0, 1, 0);
var dir3 = new THREE.Vector3(0, 0, 1);

//Groups to hold arrow Helpers
var group1 = new THREE.Group();
var group2 = new THREE.Group();

//normalize the direction vector (convert to vector of length 1)
dir1.normalize();
dir2.normalize();
dir3.normalize();

//Defining variables for all three arrow helpers
var origin = new THREE.Vector3(0, 0, 0);
var length = 400;
var hex = 0x000000;
var headLength = 20;
var headWidth = 15;

//Creates the first set of arrow helpers based on the variables specified above
var arrowHelper1 = new THREE.ArrowHelper(dir1, origin, length, hex, headLength, headWidth);
var arrowHelper2 = new THREE.ArrowHelper(dir2, origin, length, hex, headLength, headWidth);
var arrowHelper3 = new THREE.ArrowHelper(dir3, origin, length, hex, headLength, headWidth);

var arrowHelper4 = new THREE.ArrowHelper(dir1, origin, length, hex, headLength, headWidth);
var arrowHelper5 = new THREE.ArrowHelper(dir2, origin, length, hex, headLength, headWidth);
var arrowHelper6 = new THREE.ArrowHelper(dir3, origin, length, hex, headLength, headWidth);


//Adds the arrow helpers to the scene
group1.add(arrowHelper1);
group1.add(arrowHelper2);
group1.add(arrowHelper3);

group1.rotation.order = "YXZ";
group2.rotation.order = "ZXY";

group2.add(arrowHelper4);
group2.add(arrowHelper5);
group2.add(arrowHelper6);

group1.position.z = 375;
group2.position.z = -375;
scene.add(group1);
scene.add(group2);


arrowHelper1.setColor("#0000FF");
arrowHelper2.setColor("#008000");
arrowHelper3.setColor("#FF0000");

arrowHelper4.setColor("#0000FF");
arrowHelper5.setColor("#008000");
arrowHelper6.setColor("#FF0000");

//Focuses the camera on the rendered object
camera.position.y = 550;
camera.position.x = 650;
camera.lookAt(0, 0, 0);
camera.rotation.order = "YXZ";

//Function to implement orbit OrbitControls - used for testing, not part of the functionality of the program
var orbit = new THREE.OrbitControls(camera, renderer.domElement);
orbit.enabled = false;

//Pointer to the camera movement button
var aniButton = document.getElementById('btnStart');

//Switch case statement variable which keeps track of how many times the animation button has been clicked
var moveCase = 1;

//Div from moving_From_2D.html that holds information on the demonstration provided by the animation
var exampleText = document.getElementById('contentHolder');
var exampleText2 = document.getElementById('contentHolder2');

//Checks if the animation button has been located, if it has then an event listener checks for clicks by the user
if (aniButton) {
  aniButton.addEventListener("click", function() {
    //Switch statement controlling the affects of clicking the Play Animation button
    switch (moveCase) {
      case 1:
        //Update the text description of the demo and the animation button
        aniButton.innerHTML = 'Next';
        exampleText.innerHTML = 'After rotation about <span style="color:#008000;">Y-axis</span> by 30&#176;';
        exampleText2.innerHTML = 'After rotation about <span style="color:#FF0000;">Z-axis</span> by 30&#176;';

        //Call the function that animates the first rotation
        animateFirstRotation();

        //Update the move case which is used to keep track of how many times the button has been clicked
        moveCase = 2;

        break;

      case 2:
      //Update the text description of the demo and the animation button
      aniButton.innerHTML = 'Next';
      exampleText.innerHTML = 'After rotation about <span style="color:#0000FF;">X-axis</span> by 40&#176;';
      exampleText2.innerHTML = 'After rotation about <span style="color:#0000FF;">X-axis</span> by 40&#176;';

      //Call the function that animates the second rotation
      animateSecondRotation();

      //Update the move case which is used to keep track of how many times the button has been clicked
      moveCase = 3;
      break;

      case 3:
      //Update the text description of the demo and the animation button
      aniButton.innerHTML = 'Reset';
      aniButton.style.background = '#ff0000';
      exampleText.innerHTML = 'After rotation about <span style="color:#FF0000;">Z-axis</span> by 30&#176;';
      exampleText2.innerHTML = 'After rotation about <span style="color:#990000;">Y-axis</span> by 30&#176;';

      //Call the function that animates the third rotation
      animateThirdRotation();

      //Update the move case which is used to keep track of how many times the button has been clicked
      moveCase = 4;
      //Reloads the page

      break;

      case 4:
      location.reload();
    }

  });
}

// EXPLANATION OF ANIMATION FUNCTIONS:
// To create any animation we use two functions, the first one (firstRotation) does the operation on the object (in this case incrementally rotating), and then
// the second function (animateFirstRotation) calls that first function but also requests an animation frame (requestAnimationFrame(animateFirstRotation)) of it's own function so the compiler knows what's going on.
// It then rerenders the scene as the functions are doing their work so that the user can see a fluid animation.

//Main function that renders the scene. Called at the bottom of the document to do the initial render of the scene
var animate = function() {
  requestAnimationFrame(animate);
  camera.rotation.x = THREE.Math.degToRad(-45);

  renderer.render(scene, camera);
};

//Function that animates the first rotation of lines 1 and 2
var animateFirstRotation = function() {
  requestAnimationFrame(animateFirstRotation);
  firstRotation();
  renderer.render(scene, camera);
};

//Function that animates the second rotation of lines 1 and 2
var animateSecondRotation = function() {
  requestAnimationFrame(animateSecondRotation);
  secondRotation();
  renderer.render(scene, camera);
};

var animateThirdRotation = function() {
  requestAnimationFrame(animateThirdRotation);
  thirdRotation();
  renderer.render(scene, camera);
};

//Function that resets the rotation of lines 1 and 2
var animateRedraw = function() {
  requestAnimationFrame(animateRedraw);
  redrawScene();
  renderer.render(scene, camera);
};



//Rotates lines 1 and 2 30 degrees incrementally from their original location
var firstRotation = function() {
  group1.add(arrowHelper3);
  if (group1.rotation.y < THREE.Math.degToRad(30)) {
    group1.rotation.y += THREE.Math.degToRad(0.3);
  }

  if (group2.rotation.z < THREE.Math.degToRad(30)) {
    group2.rotation.z += THREE.Math.degToRad(0.3);
  }

};

var secondRotation = function(){
  if (group1.rotation.x < THREE.Math.degToRad(40)) {
    group1.rotation.x += THREE.Math.degToRad(0.4);
  }

  if (group2.rotation.x < THREE.Math.degToRad(40)) {
    group2.rotation.x += THREE.Math.degToRad(0.4);
  }
}

var thirdRotation = function(){

  if (group1.rotation.z < THREE.Math.degToRad(30)) {
    group1.rotation.z += THREE.Math.degToRad(0.3);
  }

  if (group2.rotation.y < THREE.Math.degToRad(30)) {
    group2.rotation.y += THREE.Math.degToRad(0.3);
  }

}

//Function call to render the scene
animate();
