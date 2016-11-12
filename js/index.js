//created by XORXOR, 2016

var contianer, renderer, camera, scene;
var char;
var chars = [];
var objects = [];
var cube;
var size, step;
var light;
var press=0;
var pivot;
var axis;
var target=0;
var i =0;
var k;
var width =  window.innerWidth;
var height =  window.innerHeight;

var seed = 0;
var clone;
var group;
var wire1,wire2;
var ob1,ob2
var tempGeometry;
var v,v2;
var colour;
var gridMaterial;

loader = new THREE.ColladaLoader();
loader2 = new THREE.ColladaLoader();
scene = new THREE.Scene();
group = new THREE.Object3D(); 
loader.load('https://dl.dropboxusercontent.com/u/7343209/grid2.dae', function(collada) {
    var c = collada.scene.getObjectByName( "Grid", true );
    var colladaObject=c.children[0];
    ob1 = new THREE.Mesh(colladaObject.geometry,colladaObject.material)

    return init();
});


function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera( 40, 16/10, .1, 10000 );
    camera.position.set(0.94,  0.22, .94);

    scene.fog = new THREE.FogExp2(0xdce2d6, 1);
    colour = new THREE.Color("hsl(195, 45%, 51%)");
    gridMaterial = new THREE.MeshLambertMaterial( { color: colour, fog:true} );
    var wireMaterial = new THREE.MeshLambertMaterial( { color: 0xdce2d6, wireframe: true} );
   
    v = ob1.geometry.vertices;
    ob1.material = gridMaterial
    ob1.receiveShadow = true;
    ob1.castShadow = true;

    wire1 = ob1.clone();
    wire1.material = wireMaterial;

    wire2 = wire1.clone();

    wire1.receiveShadow = false;

    ob1.rotation.x = radians(-90);
    ob2 = ob1.clone();    
    ob2.position.z = -2;

    ob2.rotation.x = radians(-90);
    wire1.rotation.x = radians(-90);
        
    wire2.rotation.x = radians(-90);
    wire2.position.z = -2;

    group.add(wire1);
    group.add(wire2);
    group.add(ob1);
    group.add(ob2);

    scene.add(group)

// LIGHTS
    var ambient = new THREE.AmbientLight( 0x444444 );
    scene.add(ambient);

    light = new THREE.SpotLight( 0xcc7c74 );
    light.position.set( 1.5, 1.5, -1);
    light.target.position.set( 0, 0, 0 );

    light.castShadow = true;

    light.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera( 70, window.innerWidth/window.innerHeight, 1,10 ));
    light.shadow.bias = .001;
 
    light.shadow.mapSize.width = 4096;
    light.shadow.mapSize.height = 4096;
    scene.add( light );

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0xdce2d6);
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enabled = false;

    container.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);

    animate();
}
      

function animate() {
    var time = performance.now() * 0.001;
    
    if (group.position.z > 2) {
        group.position.z = 0;
    }
    group.position.z += .005;
    
    var size = 32;
    //ugly hack seting last and first row by the same amount
    for (var i = v.length - 1; i >= v.length - size; i--) {
        v[i].z =Math.abs(Math.sin(random(i)*time)/10)
    }
    for (var i = 0; i <= size; i++) {
        var a = v.length  - i 
        v[size-i].z=Math.abs(Math.sin(random(a)*time)/10)
    }
    for (var i = v.length-size-1; i >= size; i--) {
        v[i].z =Math.abs(Math.sin(random(i)*time)/10);
    }
    ob1.geometry.verticesNeedUpdate = true;

    gridMaterial.color.setHSL(time/75,.45,.51)
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

}


function random(seed) {
    var x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

radians = function(degrees) {
  return degrees * Math.PI / 180;
};

function onWindowResize() {
    camera.left = window.innerWidth / - 2;
    camera.right = window.innerWidth / 2;
    camera.top = window.innerHeight / 2;
    camera.bottom = window.innerHeight / - 2;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}