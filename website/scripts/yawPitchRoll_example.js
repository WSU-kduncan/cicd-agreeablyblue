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


//Focuses the camera on the rendered object
camera.position.z = -350;

camera.rotation.order = "YXZ";

//Grid Helper creator
var size = 850;
var divisions = 25;
var gridHelper = new THREE.GridHelper(size, divisions);

scene.add(gridHelper);
var mesh;
//MTLLoader
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath("../../assets/");
mtlLoader.load('privateJet.mtl', function(materials) {

  materials.preload();

  //OBJ Loader
  var objLoader = new THREE.OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.setPath("../../assets/");
  objLoader.load('privateJet.obj', function(object) {

    mesh = object;
    mesh.position.y = -30;
    scene.add(mesh);

  });

});

//Ambient light generator
var pointLight = new THREE.PointLight(0xFFFFFF, 20, 1000);
pointLight.position.set(0, 900, 0);
scene.add(pointLight);

var pointLight = new THREE.PointLight(0xFFFFFF, 20, 1000);
pointLight.position.set(0, -850, 0);
scene.add(pointLight);

var pointLight = new THREE.PointLight(0xFFFFFF, 20, 1000);
pointLight.position.set(800, 450, 0);
scene.add(pointLight);

var pointLight = new THREE.PointLight(0xFFFFFF, 20, 1000);
pointLight.position.set(-800, 450, 0);
scene.add(pointLight);

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
        exampleText.innerHTML = '( <i>Pitch</i> ) The aircraft has rotated upward from 0&#176; to 10&#176; meaning that its <b>pitch</b> is 10&#176;';
        aniButton.innerHTML = 'Next';


        //Call the function that animates the first rotation
        animateFirstRotation();

        //Update the move case which is used to keep track of how many times the button has been clicked
        moveCase = 2;

        break;

      case 2:
      aniButton.innerHTML = 'Reset';
      aniButton.style.background = '#ff0000';

      exampleText.innerHTML = '( <i>Roll</i> ) The airplane has rotated to <i>its</i> right by 10&#176 giving it a <b>roll</b> of 10&#176';

      animateSecondRotation();
      moveCase = 3;
      break;

      case 3:
      //Reloads the page
      location.reload();
      break;
    }

  });
}

var animate = function() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

var animateFirstRotation = function() {
  requestAnimationFrame(animateFirstRotation);
  firstRotation();
  renderer.render(scene, camera);
};

var animateSecondRotation = function() {
  requestAnimationFrame(animateSecondRotation);
  secondRotation();
  renderer.render(scene, camera);
};

var animateRedraw = function() {
  requestAnimationFrame(animateRedraw);
  redrawScene();
  renderer.render(scene, camera);
};

var firstRotation = function() {
  if (mesh.rotation.x < THREE.Math.degToRad(10)) {
    mesh.rotation.x += THREE.Math.degToRad(0.1);
  }

};

var secondRotation = function(){

  if (mesh.rotation.z > THREE.Math.degToRad(-10)) {
    mesh.rotation.z += THREE.Math.degToRad(-0.1);
  }


}

//Function call to render the scene
animate();
