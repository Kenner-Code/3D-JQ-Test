function main(){
    var scene = new THREE.Scene(); 
    var box = generateBox(1,1,1);
    box.name = "box-1";
    box.position.y = box.geometry.parameters.height/2;

    var floor = generateFloor(20, 10);
    floor.name = "floor";
    floor.rotation.x = Math.PI/2;

    floor.add(box);

    var PointLight = generatePointLight(0xffffff, 1);
    PointLight.position.y = 5;

    scene.add(floor);
    scene.add(PointLight);
    // scene = loadScene(scene);

    

    var camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth/window.innerHeight,
        1,
        1000
    );
        camera.position.x = 1; //x achse = rechts links
        camera.position.y = 5; //y oben unten
        camera.position.z = 15; // vorne hinten
        camera.lookAt(new THREE.Vector3(0,0,-5))

    var renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true
    renderer.setSize(window.innerWidth, window.innerHeight/2);
    renderer.setClearColor("rgb(255,255,255)");
    document.getElementById("webgl").appendChild(renderer.domElement);
    
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    
    update(renderer, scene, camera, controls);
    return scene;
}

// function loadScene(scene){
//     var loader = new THREE.ObjectLoader();
//     loader.load("scene.json", function(obj){
//         scene.add(obj);
//     },
//     function (x){
//         console.log(x.loaded / x.total*100 + "% loaded. ");
//     },
//     function (err){
//         console.log("Error: dies.");
//     });
//     return scene; 
// }

function generateFloor(w, d){
    var geo = new THREE.PlaneGeometry(w, d);
    var mat = new THREE.MeshPhongMaterial({
        color: "rgb(100,100,100)",
        side: THREE.DoubleSide
    });
    var mesh = new THREE.Mesh(geo, mat);
    mesh.receiveShadow = true;
    return mesh;
}

function generateBox(w, h, d){
    var geo = new THREE.BoxGeometry(w, h, d);
    var mat = new THREE.MeshPhongMaterial({
        color: "rgb(100,100,100)"
    });
    var mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    return mesh;
}

function generatePointLight(color, intensity){
    var light = new THREE.PointLight(color, intensity);
    light.castShadow = true;
    return light
}

function update(renderer, scene, camera, controls){
    renderer.render(scene, camera);

    var floor = scene.getObjectByName("floor");
    scene.children[0].rotation.y += 0.002;
    floor.rotation.z += 0.0001;

    scene.traverse(function(child){
        //child.position.x += 0.01;
    });

    controls.update();

    requestAnimationFrame(function() {
        update(renderer, scene, camera, controls);
    });
}


var scene = main();
console.log(scene);