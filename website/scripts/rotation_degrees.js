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
var dir3 = new THREE.Vector3(-200, 0, 200);

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

//Creates the arrow helpers based on the variables specified above
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

group2.add(arrowHelper4);
group2.add(arrowHelper5);
group2.add(arrowHelper6);

scene.add(group1);
scene.add(group2);

group1.position.x = -550;
group2.position.x = 350;
//Line 1 creation (line 1 and 2 are rotated during the animation)
var line1Material = new THREE.LineBasicMaterial({
  color: 0x000000,
  linewidth: 10
});
var line1Points = [];
line1Points.push(new THREE.Vector3(0, 0, -400));
line1Points.push(new THREE.Vector3(0, 0, 0));
line1Points.push(new THREE.Vector3(0, 0, 0));

var line1Geometry = new THREE.BufferGeometry().setFromPoints(line1Points);

var line1 = new THREE.Line(line1Geometry, line1Material);

//Line 2 creation (line 1 and 2 are rotated during the animation)
var line2Material = new THREE.LineBasicMaterial({
  color: 0x000000,
  linewidth: 10
});
var line2Points = [];
line2Points.push(new THREE.Vector3(400, 0, 0));
line2Points.push(new THREE.Vector3(0, 0, 0));
line2Points.push(new THREE.Vector3(0, 0, 0));

var line2Geometry = new THREE.BufferGeometry().setFromPoints(line2Points);

var line2 = new THREE.Line(line2Geometry, line2Material);


var line3 = new THREE.Line(line1Geometry, line1Material);
var line4 = new THREE.Line(line2Geometry, line2Material);

//Defines points for the arc
var curve = new THREE.SplineCurve([
  new THREE.Vector2(150, 0),
  new THREE.Vector2(160, 42.5),
  new THREE.Vector2(150, 87),

]);

//Creates the arc arc geometry based on defined points
var curvePoints = curve.getPoints(50);
var curveGeometry = new THREE.BufferGeometry().setFromPoints(curvePoints);

var curveMaterial = new THREE.LineBasicMaterial({
  color: 0xff0000
});

// Create the arc object to add to the scene
var splineObject = new THREE.Line(curveGeometry, curveMaterial);
splineObject.rotation.x = THREE.Math.degToRad(-90);
var splineObject2 = new THREE.Line(curveGeometry, curveMaterial);

//Add lines to the scene
scene.add(line1);
scene.add(line2);
scene.add(line3);
scene.add(line4);

line1.position.x = -550;
line2.position.x = -550;
line3.position.x = 350;
line4.position.x = 350;
//Holders to keep track of line 1 and line 2's original orientation before changes are made later in the execution of the program
var line1Rotation = line1.rotation.y;
var line2Rotation = line2.rotation.y;


//Focuses the camera on the rendered object
camera.position.y = 650;
camera.lookAt(0, 0, 0);
camera.rotation.y = 90 * Math.PI / 180;
camera.rotation.order = "YXZ";

//Function to implement orbit OrbitControls - used for testing, not part of the functionality of the program
var orbit = new THREE.OrbitControls(camera, renderer.domElement);
orbit.enabled = false;

//Pointer to the camera movement button
var aniButton = document.getElementById('btnStart');

//Switch case statement variable which keeps track of how many times the animation button has been clicked
var moveCase = 1;

//Div from moving_From_2D.html that holds information on the demonstration provided by the animation
var exampleText = document.getElementById('exampleText');

//Checks if the animation button has been located, if it has then an event listener checks for clicks by the user
if (aniButton) {
  aniButton.addEventListener("click", function() {
    //Switch statement controlling the affects of clicking the Play Animation button
    switch (moveCase) {
      case 1:
        //Update the text description of the demo and the animation button
        exampleText.innerHTML = 'Left-handed and Right-handed rotation about <b>e</b><sub>3</sub> are displayed side by side';
        aniButton.innerHTML = 'Reset';
        aniButton.style.background = '#ff0000';

        //Update line colors to highlight the change in position
        line1.material.color = new THREE.Color(0xff0000);
        line1.material.needsUpdate = true;
        line2.material.color = new THREE.Color(0xff0000);
        line2.material.needsUpdate = true;

        //Call the function that animates the first rotation
        animateFirstRotation();

        //Adds the arc to show the 30 degree rotation that occured, the arc is on a timer so that it shows up after the rotation is complete
        setTimeout(function() {
          scene.add(splineObject);
          splineObject.position.x = -550;
          scene.add(splineObject2);
          splineObject2.rotation.x = THREE.Math.degToRad(90);
          splineObject2.position.x = 350;
        }, 1500);

        //Update the move case which is used to keep track of how many times the button has been clicked
        moveCase = 2;

        break;

      case 2:
        //Reloads the page
        location.reload();
        break;

    }

  });
}

//Main function that renders the scene. Called at the bottom of the document to do the initial render of the scene
var animate = function() {
  requestAnimationFrame(animate);
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

//Function that resets the rotation of lines 1 and 2
var animateRedraw = function() {
  requestAnimationFrame(animateRedraw);
  redrawScene();
  renderer.render(scene, camera);
};

//Resets lines 1 and 2 to their original orientations
var redrawScene = function() {
  line1.rotation.y = line1Rotation;
  line2.rotation.y = line2Rotation;
};

//Rotates lines 1 and 2 30 degrees incrementally from their original location
var firstRotation = function() {
  if (line1.rotation.y < THREE.Math.degToRad(30)) {
    line1.rotation.y += THREE.Math.degToRad(0.3);
  }
  if (line2.rotation.y < THREE.Math.degToRad(30)) {
    line2.rotation.y += THREE.Math.degToRad(0.3);
  }

  if (line3.rotation.y > THREE.Math.degToRad(-30)) {
    line3.rotation.y += THREE.Math.degToRad(-0.3);
  }
  if (line4.rotation.y > THREE.Math.degToRad(-30)) {
    line4.rotation.y += THREE.Math.degToRad(-0.3);
  }

};

//Function call to render the scene
animate();
