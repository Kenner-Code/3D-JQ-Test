function main(){
    var scene = new THREE.Scene(); 
    var box = generateBox(3,3,3);
    box.name = "box-1";
    box.position.y = box.geometry.parameters.height/2;


    // var floor = generateFloor(10, 20);
    // floor.name = "floor";
    // floor.rotation.x = Math.PI/2;

    // floor.add(box);

    var PointLight = generatePointLight(0xffffff, 1);
    PointLight.position.y = 50;

    var PointLight2 = generatePointLight(0xff0000, 1);
    PointLight2.position.y = -50;

    var PointLight3 = generatePointLight(0x00ff00, 1);
    PointLight3.position.x = -50;

    var PointLight4 = generatePointLight(0x0000ff, 1);
    PointLight4.position.x = 50;

    scene.add(box);
    scene.add(PointLight);
    scene.add(PointLight2);
    scene.add(PointLight3);
    scene.add(PointLight4);

    var camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth/window.innerHeight,
        1,
        1000
    );
        camera.position.x = 1; //x achse = rechts links
        camera.position.y = 5; //y oben unten
        camera.position.z = 10; // vorne hinten
        camera.lookAt(new THREE.Vector3(0,0,-5))

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight/2);
    renderer.setClearColor("rgb(255,255,255)");
    document.getElementById("webgl").appendChild(renderer.domElement);
    update(renderer, scene, camera);
    return scene;
}

// function generateFloor(w, d){
//     var geo = new THREE.PlaneGeometry(w, d);
//     var mat = new THREE.MeshPhongMaterial({
//         color: "rgb(100,100,100)",
//         side: THREE.DoubleSide
//     });
//     var mesh = new THREE.Mesh(geo, mat);
//     return mesh;
// }

function generateBox(w, h, d){
    var geo = new THREE.BoxGeometry(w, h, d);
    var mat = new THREE.MeshPhongMaterial({
        color: "rgb(100,100,100)"
    });
    var mesh = new THREE.Mesh(geo, mat);
    return mesh;
}

function generatePointLight(color, intensity){
    return new THREE.PointLight(color, intensity);
}

function update(renderer, scene, camera){
    renderer.render(scene, camera);

    var box = scene.getObjectByName("box-1");
    scene.children[0].rotation.y += 0.002;
    box.rotation.z += 0.005;
    box.rotation.x += 0.001;
    box.rotation.z += 0.001;

    scene.traverse(function(child){
        //child.position.x += 0.01;
    });

    requestAnimationFrame(function() {
        update(renderer, scene, camera);
    });
}

var scene = main();
console.log(scene);