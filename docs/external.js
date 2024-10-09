<script>
    let scene, camera, renderer, particles;

    function init() {
        // Set up scene
        scene = new THREE.Scene();
        
        // Set up camera
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        // Set up renderer
        renderer = new THREE.WebGLRenderer({ alpha: true });  // alpha: true allows transparent background
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 5000;

        const posArray = new Float32Array(particlesCount * 3);
        const colorsArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            // Position randomization
            posArray[i] = (Math.random() - 0.5) * 10;

            // Random colors (rainbow-like)
            colorsArray[i] = Math.random();
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

        // Set up particle material with vertex colors
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true
        });

        // Create the particle system
        particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        animate();
    }

    function animate() {
        requestAnimationFrame(animate);

        // Rotate particles for animation
        particles.rotation.x += 0.002;
        particles.rotation.y += 0.002;

        renderer.render(scene, camera);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

    init();
</script>
