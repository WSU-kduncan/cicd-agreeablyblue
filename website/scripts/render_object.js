//Scene every object is placed into
var scene = new THREE.Scene();

//Camera which defines how the object is viewed
var camera = new THREE.PerspectiveCamera(75, (window.innerWidth / window.innerHeight), 0.1, 10000);

//Establishes the renderer defined by three js, sets the width to 80% of the screen, and the height to 95% of the screen. It also changes the background color of the renderer window to light grey
var container = document.getElementById('container');

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
camera.position.y = 650;
camera.rotation.order = "YXZ";



//TransformControls
var transform = new THREE.TransformControls(camera, renderer.domElement);
transform.setRotationSnap(THREE.Math.degToRad(15));
transform.axis = 'Y';
transform.showX = false;
transform.showZ = false;
//Mesh to hold the rendered airplane
var mesh = null;

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

    //Attaches transform controls to the rendererd shape, adds control handles to the scene, and sets the control mode to rotation
    transform.attach(mesh);
    scene.add(transform);
    transform.setMode("rotate");
  });

});

//Skybox that was initially used as the background until the background color was changed to match that of the webpage.
/*//Skybox
var materialArray = [];
var tex_ft = new THREE.TextureLoader().load('../../assets/skybox/clouds1_front.png');
var tex_bk = new THREE.TextureLoader().load('../../assets/skybox/clouds1_back.png');
var tex_up = new THREE.TextureLoader().load('../../assets/skybox/clouds1_up.png');
var tex_dn = new THREE.TextureLoader().load('../../assets/skybox/clouds1_down.png');
var tex_rt = new THREE.TextureLoader().load('../../assets/skybox/clouds1_right.png');
var tex_lf = new THREE.TextureLoader().load('../../assets/skybox/clouds1_left.png');



materialArray.push(new THREE.MeshBasicMaterial({
  map: tex_ft
}));
materialArray.push(new THREE.MeshBasicMaterial({
  map: tex_bk
}));
materialArray.push(new THREE.MeshBasicMaterial({
  map: tex_up
}));
materialArray.push(new THREE.MeshBasicMaterial({
  map: tex_dn
}));
materialArray.push(new THREE.MeshBasicMaterial({
  map: tex_rt
}));
materialArray.push(new THREE.MeshBasicMaterial({
  map: tex_lf
}));

for (var i = 0; i < 6; i++)
  materialArray[i].side = THREE.BackSide;


var skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
var skybox = new THREE.Mesh(skyboxGeo, materialArray);
scene.add(skybox);
*/

//Group to hold both grid helpers and circles
var group = new THREE.Group();

//Grid Helper creator
var size = 850;
var divisions = 25;
var gridHelper = new THREE.GridHelper(size, divisions);

//Circle geometry and material
var geometry = new THREE.CircleGeometry( 20, 60 );
var material = new THREE.MeshBasicMaterial( { color: 0x008000 } );
var material2 = new THREE.MeshBasicMaterial( { color: 0xF92C00 } );
var material3 = new THREE.MeshBasicMaterial( { color: 0xFF9300 } );
var material4 = new THREE.MeshBasicMaterial( { color: 0x0000FF } );

//Circle creation, used as markers for X, Y, -X, and -Y on the grid
var circle1 = new THREE.Mesh( geometry, material);
var circle2 = new THREE.Mesh( geometry, material2 );
var circle3 = new THREE.Mesh( geometry, material3 );
var circle4 = new THREE.Mesh( geometry, material4 );

//Add circles to the scene
group.add(circle1);
group.add(circle2);
group.add(circle3);
group.add(circle4);

circle1.rotation.y = THREE.Math.degToRad(0);
circle1.rotation.x = THREE.Math.degToRad(-90);
circle2.rotation.y = THREE.Math.degToRad(0);
circle2.rotation.x = THREE.Math.degToRad(-90);
circle3.rotation.y = THREE.Math.degToRad(0);
circle3.rotation.x = THREE.Math.degToRad(-90);
circle4.rotation.y = THREE.Math.degToRad(0);
circle4.rotation.x = THREE.Math.degToRad(-90);

circle1.position.z = 0;
circle1.position.x = -450;
circle2.position.z = 0;
circle2.position.x = 450;
circle3.position.z = 450;
circle3.position.x = 0;
circle4.position.z = -450;
circle4.position.x = 0;

group.add(gridHelper);
scene.add(group);


//Ambient light generator
var pointLight = new THREE.PointLight(0xFFFFFF, 20, 1000);
pointLight.position.set(0, 900, 0);
scene.add(pointLight);


//Function to implement orbit OrbitControls
var orbit = new THREE.OrbitControls(camera, renderer.domElement);
orbit.enabled = false;



//Pointer to the camera movement button
var moveButton = document.getElementById('switchInput');
//Switch case statement variable
var moveCase = 1;


//Toggles orbit controls on and off
if (moveButton) {
  moveButton.addEventListener("click", function() {
    switch (moveCase) {
      case 1:
        transform.attach(group);
        moveButton.innerHTML = "Rotate Plane";
        moveCase = 2;
        break;
      case 2:
        transform.attach(mesh);
        moveButton.innerHTML = "Rotate Grid";
        moveCase = 1;

        angleOfGrid = gridHelper.rotation.y;
        x = THREE.Math.radToDeg(angleOfGrid).toFixed(2);
        rotationFinal = 90 - x;

        break;
    }
  });
}

//Pointer to the scene reset button
var resetButton = document.getElementById('btnReset');

  resetButton.addEventListener('click', function() {
    location.reload();
    });


//Function animate which calls the renderer to render the scene
var defaultRotation = new THREE.Quaternion();
var defaultGridRotation = new THREE.Quaternion();

var defaultCameraRotation = new THREE.Quaternion();

var animate = function() {
  requestAnimationFrame(animate);

  //Get Object Y Rotation Angle
  var angleOfGrid = defaultRotation.angleTo(group.quaternion);
  var g = THREE.Math.radToDeg(angleOfGrid).toFixed(2);

  gValue = group.rotation.y;

  if(gValue < 0)
  {
    g = g * -1;
  }


  var angleOfY = defaultRotation.angleTo(mesh.quaternion);
  var y = THREE.Math.radToDeg(angleOfY).toFixed(2);

  //Check if rotation is positive or negative
  var yValue = mesh.rotation.y;
  //If negative then multiply by -1 to reflect that in the output
  if (yValue < 0) {
    y = y * -1;
  }

  var relative = y - g;

  if (relative > 180)
  {
    relative += -360;
  }
  else if (relative < -180)
  {
    relative += 360;
  }


// "Relative Y-Axis Rotation = " + relative + "°"

  camera.rotation.y = 90 * Math.PI / 180;
  document.getElementById("yAngle").innerHTML = "Relative Y-Axis rotation: "  + relative.toFixed(2) + "&#176;";
  renderer.render(scene, camera);
};

// var cube0Rotation = function(){
//   var angleOfGrid = gridHelper.rotation.y;
//   var x = THREE.Math.radToDeg(angleOfGrid).toFixed(2);
//   var rotationFinal = 90 - x;
//   cube0.rotation.y = THREE.Math.degToRad(rotationFinal);
//
// };
//
// var animateCube0 = function() {
//   requestAnimationFrame(animateCube0);
//   cube0Rotation();
//   renderer.render(scene, camera);
// };

animate();
