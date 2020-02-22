import * as THREE from "./lib/three.module"
import { OBJLoader } from "./lib/OBJLoader"



export const objs = function(){


    var container;

    var camera, scene, renderer;

    var mouseX = 0,
        mouseY = 0;

    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;

    var object;

    init();
    animate();


    function init() {

        container = document.createElement('div');
        document.body.appendChild(container);

        camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 2000);
        camera.position.z = 350;

        // scene

        scene = new THREE.Scene();

        var ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
        scene.background = new THREE.Color(0xffffff);
        scene.add(ambientLight);

        var pointLight = new THREE.PointLight(0xffffff, 0.8);
        camera.add(pointLight);
        scene.add(camera);

        // manager

        function loadModel() {

            //                object.traverse(function(child) {
            //
            //                    if (child.isMesh) child.material.map = texture;
            //
            //                });
            //
            //                object.position.y = -95;

            // sample
            var geometry = new THREE.BoxGeometry(100, 100, 100);
            var material = new THREE.MeshBasicMaterial({
                color: 0x0000ff
            });
            var cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
            //                scene.add(cube);

        }

        var manager = new THREE.LoadingManager(loadModel);

        manager.onProgress = function(item, loaded, total) {

            console.log(item, loaded, total);

        };

        // texture

        var textureLoader = new THREE.TextureLoader(manager);

        var texture = textureLoader.load('textures/uv_grid_opengl.jpg');

        // model

        function onProgress(xhr) {

            if (xhr.lengthComputable) {

                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log('model ' + Math.round(percentComplete, 2) + '% downloaded');

            }

        }

        function onError() {}

        //				var loader = new OBJLoader( manager );
        //
        //				loader.load( 'models/obj/male02/male02.obj', function ( obj ) {
        //
        //					object = obj;
        //
        //				}, onProgress, onError );

        //

        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        document.addEventListener('mousemove', onDocumentMouseMove, false);

        //

        window.addEventListener('resize', onWindowResize, false);

    }

    function onWindowResize() {

        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

    }

    function onDocumentMouseMove(event) {

        mouseX = (event.clientX - windowHalfX) / 2;
        mouseY = (event.clientY - windowHalfY) / 2;

    }

    //

    function animate() {

        requestAnimationFrame(animate);
        render();

    }

    function render() {

        camera.position.x += (mouseX - camera.position.x) * .05;
        camera.position.y += (-mouseY - camera.position.y) * .05;

        camera.lookAt(scene.position);

        renderer.render(scene, camera);

    }

};